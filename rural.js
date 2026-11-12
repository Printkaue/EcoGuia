/**
 * EcoGuia Rural - Lógica de Negócio, Integrações de APIs e Componentes Interativos
 * Módulos: EcoClima, EcoPlantio, EcoArmazém, EcoVida Rural, EcoCotação, EcoIA Rural e EcoAproveitamento
 */

// Estado global do EcoGuia Rural
const ruralState = {
    activeSubTab: 'painel',
    currentLocation: {
        name: "Juazeiro",
        state: "BA",
        lat: -9.41,
        lon: -40.50,
        region: "Semiárido / Vale do São Francisco"
    },
    weatherData: null,
    weatherLoading: false,
    selectedCrop: "milho",
    storageFilter: "todos",
    storagePurpose: "todos",
    storageSearch: "",
    videoCategory: "todas",
    videoSearch: "",
    cotacaoState: "todos",
    cotacaoCategory: "todos",
    cotacaoSearch: "",
    chatHistory: [
        {
            role: "assistant",
            text: "Olá, produtor(a)! Sou o **EcoIA Rural**, seu assistente especializado em agricultura familiar, manejo do solo, convivência com o clima e práticas sustentáveis do campo. Como posso ajudar nas atividades da sua propriedade hoje?",
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
    ],
    userStateFilter: "Nordeste",
    userCropFilter: "Milho e Feijão",
    openaiKey: localStorage.getItem('ecoguia_openai_key') || "",
    geminiKey: localStorage.getItem('ecoguia_gemini_key') || "",
    aiProvider: localStorage.getItem('ecoguia_ai_provider') || "auto",
    youtubeKey: localStorage.getItem('ecoguia_yt_key') || ""
};

// ==========================================
// 1. INICIALIZAÇÃO E NAVEGAÇÃO DE SUB-ABAS
// ==========================================

function initEcoGuiaRural() {
    renderRuralMunicipalitiesSelect();
    fetchRuralWeather(ruralState.currentLocation.lat, ruralState.currentLocation.lon, ruralState.currentLocation.name);
    initEcoPlantioForm();
    renderRuralStorage();
    renderRuralVideos();
    renderRuralQuotations();
    renderRuralChatMessages();
    renderStorageCategoryPills();
}

function switchRuralSubTab(subTabId) {
    ruralState.activeSubTab = subTabId;

    // Ocultar todos os painéis rurais
    const panels = [
        'rural-sub-painel',
        'rural-sub-clima',
        'rural-sub-plantio',
        'rural-sub-armazem',
        'rural-sub-videos',
        'rural-sub-cotacao',
        'rural-sub-ia',
        'rural-sub-aproveitamento'
    ];

    panels.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.classList.add('hidden');
    });

    // Mostrar sub-aba ativa
    const target = document.getElementById(`rural-sub-${subTabId}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('fade-in');
    }

    // Atualizar pílulas de navegação rápida
    const navButtons = document.querySelectorAll('.rural-nav-btn');
    navButtons.forEach(btn => {
        const tab = btn.getAttribute('data-subtab');
        if (tab === subTabId) {
            btn.className = "rural-nav-btn px-3 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-sm bg-amber-700 text-white border-2 border-amber-800 text-sm whitespace-nowrap";
        } else {
            btn.className = "rural-nav-btn px-3 py-2 rounded-xl font-semibold transition flex items-center gap-2 text-slate-700 hover:bg-amber-100/70 border border-amber-200/60 bg-white/80 text-sm whitespace-nowrap";
        }
    });

    // Se mudou para clima e ainda não tem dados, carregar
    if (subTabId === 'clima' && !ruralState.weatherData && !ruralState.weatherLoading) {
        fetchRuralWeather(ruralState.currentLocation.lat, ruralState.currentLocation.lon, ruralState.currentLocation.name);
    }

    window.scrollTo({ top: document.getElementById('section-rural').offsetTop - 20, behavior: 'smooth' });
}

// ==========================================
// 2. ECOCLIMA - MONITORAMENTO CLIMÁTICO
// ==========================================

function renderRuralMunicipalitiesSelect() {
    const selects = ['clima-city-select', 'plantio-city-select'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = ruralMunicipalitiesData.map((m, idx) => `
            <option value="${idx}" ${m.name === ruralState.currentLocation.name ? 'selected' : ''}>
                ${m.name} (${m.state}) — ${m.region}
            </option>
        `).join('');
    });
}

function handleRuralCityChange(selectedIndex) {
    const selected = ruralMunicipalitiesData[selectedIndex];
    if (!selected) return;
    ruralState.currentLocation = { ...selected };
    
    // Atualizar selects de plantio e clima simultaneamente
    const cSelect = document.getElementById('clima-city-select');
    const pSelect = document.getElementById('plantio-city-select');
    if (cSelect) cSelect.value = selectedIndex;
    if (pSelect) pSelect.value = selectedIndex;

    fetchRuralWeather(selected.lat, selected.lon, selected.name);
}

function useGpsLocation() {
    if (!navigator.geolocation) {
        alert("Geolocalização não é suportada pelo seu navegador.");
        return;
    }

    const btn = document.getElementById('btn-gps-weather');
    if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Localizando...`;
        btn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            let cityName = "Sua Propriedade (GPS)";

            try {
                // Tenta resolver o nome do município via API reversa do Open-Meteo
                const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(2)}&count=1&language=pt&format=json`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.results && data.results.length > 0) {
                        cityName = `${data.results[0].name} (${data.results[0].admin1 || 'BR'})`;
                    }
                }
            } catch (e) {
                console.warn("Geocoding reverso indisponível, usando coordenadas literais");
            }

            ruralState.currentLocation = {
                name: cityName,
                state: "GPS",
                lat: lat,
                lon: lon,
                region: "Coordenadas por GPS"
            };

            const locLabel = document.getElementById('current-location-label');
            if (locLabel) locLabel.innerText = `${cityName} [${lat.toFixed(2)}°, ${lon.toFixed(2)}°]`;

            if (btn) {
                btn.innerHTML = `<i class="fa-solid fa-location-crosshairs mr-1"></i> GPS Ativo`;
                btn.disabled = false;
            }

            fetchRuralWeather(lat, lon, cityName);
        },
        (error) => {
            console.warn("Erro ao obter GPS:", error);
            alert("Não foi possível acessar seu GPS. Verifique se a permissão foi concedida ou selecione seu município na lista.");
            if (btn) {
                btn.innerHTML = `<i class="fa-solid fa-location-crosshairs mr-1"></i> Usar Meu GPS`;
                btn.disabled = false;
            }
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

async function searchCustomMunicipality() {
    const input = document.getElementById('rural-city-search-input');
    const term = input ? input.value.trim() : '';
    if (!term) return;

    const listContainer = document.getElementById('search-city-results');
    if (listContainer) {
        listContainer.classList.remove('hidden');
        listContainer.innerHTML = `<div class="p-3 text-sm text-slate-500 text-center"><i class="fa-solid fa-circle-notch fa-spin mr-1"></i> Buscando cidades...</div>`;
    }

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(term)}&count=5&language=pt&country_code=BR&format=json`);
        if (!response.ok) throw new Error("Erro na busca de cidades");
        const data = await response.json();

        if (listContainer) {
            if (!data.results || data.results.length === 0) {
                listContainer.innerHTML = `<div class="p-3 text-sm text-slate-500 text-center">Nenhum município encontrado. Tente sem acentos.</div>`;
                return;
            }

            listContainer.innerHTML = data.results.map(city => `
                <button type="button" onclick="selectCustomCity('${escapeHtml(city.name)}', '${escapeHtml(city.admin1 || '')}', ${city.latitude}, ${city.longitude})" 
                    class="w-full text-left p-3 hover:bg-amber-50 border-b border-slate-100 flex justify-between items-center text-sm transition">
                    <div>
                        <span class="font-bold text-slate-800">${escapeHtml(city.name)}</span>
                        <span class="text-xs text-slate-500"> - ${escapeHtml(city.admin1 || city.country || 'Brasil')}</span>
                    </div>
                    <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">${city.latitude.toFixed(2)}°, ${city.longitude.toFixed(2)}°</span>
                </button>
            `).join('');
        }
    } catch (e) {
        console.error("Erro na busca de município:", e);
        if (listContainer) {
            listContainer.innerHTML = `<div class="p-3 text-sm text-red-500 text-center">Erro ao consultar serviço de cidades. Selecione na lista acima.</div>`;
        }
    }
}

function selectCustomCity(name, state, lat, lon) {
    ruralState.currentLocation = {
        name: name,
        state: state,
        lat: lat,
        lon: lon,
        region: `${name} - ${state}`
    };

    const listContainer = document.getElementById('search-city-results');
    if (listContainer) listContainer.classList.add('hidden');

    const input = document.getElementById('rural-city-search-input');
    if (input) input.value = `${name} - ${state}`;

    fetchRuralWeather(lat, lon, name);
}

// Mapeamento de códigos climáticos WMO (Padrão Internacional)
function getWeatherDescriptionWmo(code) {
    const codes = {
        0: { desc: "Céu limpo e ensolarado", icon: "fa-sun", color: "text-amber-500", bg: "bg-amber-50" },
        1: { desc: "Predomínio de sol com poucas nuvens", icon: "fa-cloud-sun", color: "text-amber-500", bg: "bg-amber-50" },
        2: { desc: "Parcialmente nublado", icon: "fa-cloud-sun", color: "text-sky-500", bg: "bg-sky-50" },
        3: { desc: "Nublado", icon: "fa-cloud", color: "text-slate-500", bg: "bg-slate-100" },
        45: { desc: "Nevoeiro matinal / Névoa úmida", icon: "fa-smog", color: "text-slate-400", bg: "bg-slate-50" },
        48: { desc: "Nevoeiro com formação de geada", icon: "fa-snowflake", color: "text-cyan-600", bg: "bg-cyan-50" },
        51: { desc: "Garoa leve intermitente", icon: "fa-cloud-rain", color: "text-blue-400", bg: "bg-blue-50" },
        53: { desc: "Garoa moderada", icon: "fa-cloud-rain", color: "text-blue-500", bg: "bg-blue-50" },
        55: { desc: "Garoa densa", icon: "fa-cloud-showers-heavy", color: "text-blue-600", bg: "bg-blue-50" },
        61: { desc: "Chuva fraca localizada", icon: "fa-cloud-rain", color: "text-blue-500", bg: "bg-blue-50" },
        63: { desc: "Chuva moderada contínua", icon: "fa-cloud-showers-heavy", color: "text-blue-600", bg: "bg-blue-100" },
        65: { desc: "Chuva forte torrencial", icon: "fa-cloud-showers-heavy", color: "text-indigo-600", bg: "bg-indigo-100" },
        71: { desc: "Possibilidade de granizo leve / frio intenso", icon: "fa-snowflake", color: "text-cyan-500", bg: "bg-cyan-50" },
        80: { desc: "Pancadas de chuva passageiras", icon: "fa-cloud-sun-rain", color: "text-blue-500", bg: "bg-blue-50" },
        81: { desc: "Pancadas de chuva moderadas", icon: "fa-cloud-rain", color: "text-blue-600", bg: "bg-blue-100" },
        82: { desc: "Pancadas de chuva violentas", icon: "fa-cloud-showers-water", color: "text-indigo-700", bg: "bg-indigo-100" },
        95: { desc: "Trovoada / Tempestade elétrica", icon: "fa-bolt-lightning", color: "text-amber-600", bg: "bg-amber-100" },
        96: { desc: "Trovoada com granizo leve", icon: "fa-cloud-bolt", color: "text-purple-600", bg: "bg-purple-100" },
        99: { desc: "Tempestade severa com queda de granizo", icon: "fa-cloud-bolt", color: "text-red-600", bg: "bg-red-100" }
    };
    return codes[code] || { desc: "Tempo instável", icon: "fa-cloud", color: "text-slate-600", bg: "bg-slate-50" };
}

function getWindDirectionText(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'L', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    const index = Math.round((degrees % 360) / 22.5) % 16;
    return directions[index];
}

function getUvRiskLevel(uv) {
    if (uv < 3) return { text: "Baixo", color: "bg-green-100 text-green-800 border-green-300" };
    if (uv < 6) return { text: "Moderado", color: "bg-yellow-100 text-yellow-800 border-yellow-300" };
    if (uv < 8) return { text: "Alto", color: "bg-orange-100 text-orange-800 border-orange-300" };
    if (uv < 11) return { text: "Muito Alto", color: "bg-red-100 text-red-800 border-red-300" };
    return { text: "Extremo", color: "bg-purple-100 text-purple-800 border-purple-300" };
}

async function fetchRuralWeather(lat, lon, cityName = "Local Selecionado") {
    ruralState.weatherLoading = true;
    updateWeatherLoadingIndicator(true);

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,wind_speed_10m_max&timezone=America%2FSao_Paulo&past_days=3`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();

        ruralState.weatherData = data;
        renderWeatherDisplay(data, cityName, false);
    } catch (error) {
        console.warn("Open-Meteo offline ou não alcançável no momento, gerando modelo de referência agroclimática:", error);
        const fallback = generateAgroWeatherFallback(lat, lon, cityName);
        ruralState.weatherData = fallback;
        renderWeatherDisplay(fallback, cityName, true);
    } finally {
        ruralState.weatherLoading = false;
        updateWeatherLoadingIndicator(false);
    }
}

function updateWeatherLoadingIndicator(isLoading) {
    const el = document.getElementById('clima-loading-state');
    const content = document.getElementById('clima-main-content');
    if (el) el.classList.toggle('hidden', !isLoading);
    if (content) content.classList.toggle('opacity-50', isLoading);
}

function renderWeatherDisplay(data, cityName, isFallback = false) {
    const cur = data.current || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};
    const wInfo = getWeatherDescriptionWmo(cur.weather_code || 0);

    // 1. Atualizar badges e cabeçalho
    const cityLabel = document.getElementById('clima-city-display');
    const sourceBadge = document.getElementById('clima-source-badge');
    const updateTime = document.getElementById('clima-last-update');

    if (cityLabel) cityLabel.innerText = cityName;
    if (sourceBadge) {
        if (isFallback) {
            sourceBadge.className = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300";
            sourceBadge.innerHTML = `<i class="fa-solid fa-tower-broadcast text-amber-600"></i> Modelo de Referência Agroclimática (Simulação/Offline)`;
        } else {
            sourceBadge.className = "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300";
            sourceBadge.innerHTML = `<i class="fa-solid fa-satellite-dish text-green-600"></i> Dados em Tempo Real (Open-Meteo WMO)`;
        }
    }
    if (updateTime) {
        const now = new Date();
        updateTime.innerText = `Atualizado às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • Transparência de dados`;
    }

    // 2. Métricas Atuais (Destaques)
    const tempEl = document.getElementById('clima-temp-now');
    const descEl = document.getElementById('clima-desc-now');
    const iconEl = document.getElementById('clima-icon-now');
    const feelEl = document.getElementById('clima-sensation');
    const minMaxEl = document.getElementById('clima-min-max-today');
    const rainProbEl = document.getElementById('clima-rain-prob-today');
    const rainVolEl = document.getElementById('clima-rain-vol-today');
    const humidityEl = document.getElementById('clima-humidity');
    const windEl = document.getElementById('clima-wind');
    const pressureEl = document.getElementById('clima-pressure');
    const uvEl = document.getElementById('clima-uv');

    if (tempEl) tempEl.innerText = `${Math.round(cur.temperature_2m ?? 28)}°C`;
    if (descEl) descEl.innerText = wInfo.desc;
    if (iconEl) {
        iconEl.className = `fa-solid ${wInfo.icon} text-5xl md:text-6xl ${wInfo.color} drop-shadow-sm`;
    }
    if (feelEl) feelEl.innerText = `${Math.round(cur.apparent_temperature ?? cur.temperature_2m ?? 29)}°C`;
    
    const todayMin = Math.round(daily.temperature_2m_min?.[3] ?? daily.temperature_2m_min?.[0] ?? 21);
    const todayMax = Math.round(daily.temperature_2m_max?.[3] ?? daily.temperature_2m_max?.[0] ?? 33);
    if (minMaxEl) minMaxEl.innerText = `Mín: ${todayMin}°C | Máx: ${todayMax}°C`;

    const rainProb = Math.round(daily.precipitation_probability_max?.[3] ?? daily.precipitation_probability_max?.[0] ?? 10);
    const rainSum = (daily.precipitation_sum?.[3] ?? daily.precipitation_sum?.[0] ?? 0).toFixed(1);
    if (rainProbEl) rainProbEl.innerText = `${rainProb}%`;
    if (rainVolEl) rainVolEl.innerText = `${rainSum} mm`;

    const humidity = Math.round(cur.relative_humidity_2m ?? 55);
    if (humidityEl) {
        let humClass = "text-green-600";
        let humDesc = "Favorável";
        if (humidity < 30) { humClass = "text-red-500"; humDesc = "Muito Seco (Alerta)"; }
        else if (humidity < 45) { humClass = "text-amber-500"; humDesc = "Atenção hídrica"; }
        humidityEl.innerHTML = `<span>${humidity}%</span> <span class="text-xs font-semibold ${humClass}">(${humDesc})</span>`;
    }

    const windSpeed = Math.round(cur.wind_speed_10m ?? 12);
    const windDir = getWindDirectionText(cur.wind_direction_10m ?? 90);
    if (windEl) {
        let sprayNote = windSpeed >= 3 && windSpeed <= 10 ? "Ideal p/ pulverização" : (windSpeed > 15 ? "Vento alto p/ calda" : "Vento calmo");
        windEl.innerHTML = `<span>${windSpeed} km/h (${windDir})</span> <span class="text-xs font-medium text-slate-500 block">${sprayNote}</span>`;
    }

    const pressure = Math.round(cur.surface_pressure ?? 1012);
    if (pressureEl) pressureEl.innerText = `${pressure} hPa`;

    const uvMax = Math.round(daily.uv_index_max?.[3] ?? daily.uv_index_max?.[0] ?? 8);
    const uvRisk = getUvRiskLevel(uvMax);
    if (uvEl) {
        uvEl.innerHTML = `<span>${uvMax}</span> <span class="text-xs px-2 py-0.5 rounded-full font-bold border ${uvRisk.color}">${uvRisk.text}</span>`;
    }

    // 3. Renderizar Previsão Horária (Próximas 24 horas a partir da hora atual)
    renderHourlyWeather(hourly);

    // 4. Renderizar Previsão de 7 Dias
    renderDailyWeather(daily);

    // 5. Gerar Alertas Agroclimáticos Inteligentes
    renderAgroAlerts(cur, daily, humidity, windSpeed, rainProb, rainSum, uvMax);

    // 6. Histórico de Precipitação Recente (Últimos 3 dias)
    renderRainHistory(daily);

    // 7. Atualizar mini-widget da Home do EcoGuia Rural
    updateDashboardWeatherWidget(cityName, cur, todayMin, todayMax, rainProb, wInfo);
}

function renderHourlyWeather(hourly) {
    const container = document.getElementById('clima-hourly-container');
    if (!container || !hourly.time || hourly.time.length === 0) return;

    const currentHourStr = new Date().toISOString().slice(0, 13);
    let startIndex = hourly.time.findIndex(t => t.startsWith(currentHourStr));
    if (startIndex === -1) startIndex = 72; // se past_days=3, dia atual começa em torno do índice 72

    const next24 = hourly.time.slice(startIndex, startIndex + 24);

    container.innerHTML = next24.map((tStr, idx) => {
        const actualIdx = startIndex + idx;
        const timeObj = new Date(tStr);
        const hourLabel = timeObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        const temp = Math.round(hourly.temperature_2m[actualIdx] ?? 25);
        const prob = Math.round(hourly.precipitation_probability[actualIdx] ?? 0);
        const rainMm = (hourly.precipitation[actualIdx] ?? 0).toFixed(1);
        const wCode = hourly.weather_code[actualIdx] ?? 0;
        const wInfo = getWeatherDescriptionWmo(wCode);

        return `
            <div class="flex-shrink-0 w-24 p-3 rounded-2xl bg-white border border-slate-200 text-center flex flex-col items-center shadow-sm hover:border-amber-400 transition">
                <span class="text-xs font-bold text-slate-500 mb-2">${hourLabel}</span>
                <i class="fa-solid ${wInfo.icon} text-2xl ${wInfo.color} mb-2"></i>
                <span class="font-bold text-slate-800 text-base mb-1">${temp}°C</span>
                <div class="mt-auto pt-1 border-t border-slate-100 w-full flex flex-col items-center">
                    <span class="text-[11px] font-semibold text-blue-600 flex items-center gap-0.5">
                        <i class="fa-solid fa-droplet text-[9px]"></i> ${prob}%
                    </span>
                    ${parseFloat(rainMm) > 0 ? `<span class="text-[10px] text-slate-400 font-mono">${rainMm}mm</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderDailyWeather(daily) {
    const container = document.getElementById('clima-daily-container');
    if (!container || !daily.time) return;

    // Se temos past_days=3, o dia de hoje está no índice 3; queremos hoje + 6 dias (7 dias ao total)
    const startIdx = daily.time.length >= 7 ? 3 : 0;
    const daysToShow = daily.time.slice(startIdx, startIdx + 7);

    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    container.innerHTML = daysToShow.map((dStr, idx) => {
        const actualIdx = startIdx + idx;
        const dateObj = new Date(dStr + 'T12:00:00');
        const dayName = idx === 0 ? "Hoje" : weekDays[dateObj.getDay()];
        const dateFormatted = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const min = Math.round(daily.temperature_2m_min[actualIdx] ?? 20);
        const max = Math.round(daily.temperature_2m_max[actualIdx] ?? 32);
        const prob = Math.round(daily.precipitation_probability_max[actualIdx] ?? 0);
        const rainMm = (daily.precipitation_sum[actualIdx] ?? 0).toFixed(1);
        const wCode = daily.weather_code[actualIdx] ?? 0;
        const wInfo = getWeatherDescriptionWmo(wCode);

        // Orientação agrícola de acordo com o clima previsto
        let farmAdvice = "Condição padrão de manejo";
        if (prob > 60 && parseFloat(rainMm) > 10) {
            farmAdvice = "🌧️ Alta probabilidade de chuva: bom para plantio de sequeiro; suspender pulverização.";
        } else if (prob > 40) {
            farmAdvice = "⛅ Pancadas de chuva prováveis: adiar colheita de feijão seco.";
        } else if (max > 35) {
            farmAdvice = "☀️ Calor extremo: irrigar nas horas frescas (madrugada/tarde) e reforçar água do rebanho.";
        } else {
            farmAdvice = "🌱 Tempo estável: excelente para capina seletiva, colheita e secagem de grãos.";
        }

        return `
            <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-amber-500 transition">
                <div class="flex items-center gap-3 w-full md:w-48">
                    <div class="w-12 h-12 rounded-xl ${wInfo.bg} flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid ${wInfo.icon} text-2xl ${wInfo.color}"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 text-sm md:text-base">${dayName}</h4>
                        <span class="text-xs text-slate-500 font-medium">${dateFormatted} • ${wInfo.desc}</span>
                    </div>
                </div>

                <div class="flex items-center gap-6 justify-between w-full md:w-auto">
                    <!-- Temperatura Min/Max -->
                    <div class="text-center">
                        <div class="text-xs text-slate-400 uppercase font-semibold">Variação</div>
                        <div class="text-sm font-bold text-slate-700">
                            <span class="text-blue-600">${min}°C</span> / <span class="text-red-500">${max}°C</span>
                        </div>
                    </div>

                    <!-- Chuva -->
                    <div class="text-center">
                        <div class="text-xs text-slate-400 uppercase font-semibold">Chuva Prevista</div>
                        <div class="text-sm font-bold text-blue-600 flex items-center gap-1 justify-center">
                            <i class="fa-solid fa-umbrella text-xs"></i> ${prob}% <span class="text-xs font-normal text-slate-500">(${rainMm}mm)</span>
                        </div>
                    </div>
                </div>

                <!-- Dica Agro daquele dia -->
                <div class="w-full md:max-w-xs text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                    <span class="font-semibold text-amber-900 block mb-0.5">Recomendação de Campo:</span>
                    ${farmAdvice}
                </div>
            </div>
        `;
    }).join('');
}

function renderAgroAlerts(cur, daily, humidity, windSpeed, rainProb, rainSum, uvMax) {
    const container = document.getElementById('clima-alerts-container');
    if (!container) return;

    const alerts = [];

    // Alerta de umidade
    if (humidity < 30) {
        alerts.push({
            type: "danger",
            icon: "fa-triangle-exclamation",
            title: "Alerta de Baixa Umidade do Ar (" + humidity + "%)",
            text: "Condição crítica de estresse hídrico vegetal e alto risco de focos de queimada. Aumente o turno de irrigação, aplique cobertura morta (palhada) e redobre a atenção com fontes de calor na roça."
        });
    }

    // Alerta de vento para pulverização
    if (windSpeed > 18) {
        alerts.push({
            type: "warning",
            icon: "fa-wind",
            title: "Vento Forte (" + windSpeed + " km/h) - Inadequado para Pulverização",
            text: "Risco severo de deriva de caldas protetoras e bioinseticidas. A aplicação de defensivos ou caldas foliares com vento acima de 12 a 15 km/h desperdiça produto e atinge áreas não desejadas."
        });
    }

    // Alerta de chuva intensa ou janela de captação
    if (parseFloat(rainSum) > 25 || rainProb > 75) {
        alerts.push({
            type: "info",
            icon: "fa-cloud-showers-water",
            title: "Janela Hídrica Favorável (" + rainSum + " mm previstos)",
            text: "Oportunidade de recarga de cisternas e barreiros. Verifique calhas e descarte das primeiras águas do telhado. Para plantios de sequeiro (milho/feijão), prepare as sementes para semeadura no solo úmido."
        });
    }

    // Alerta de estresse térmico animal e vegetal
    const maxTemp = Math.round(daily.temperature_2m_max?.[3] ?? 32);
    if (maxTemp >= 35) {
        alerts.push({
            type: "warning",
            icon: "fa-temperature-arrow-up",
            title: "Temperatura Elevada (" + maxTemp + "°C) - Estresse Térmico",
            text: "Providencie sombra abundante e água limpa e fresca para bovinos, caprinos e aves caipiras. Em feijão e tomate, calor acima de 33°C pode provocar abortamento de flores."
        });
    }

    // Alerta de UV
    if (uvMax >= 9) {
        alerts.push({
            type: "notice",
            icon: "fa-sun",
            title: "Índice UV Extremo (" + uvMax + ") - Saúde do Trabalhador Rural",
            text: "Proteção obrigatória para atividades no campo: chapéu de palha de aba larga, camisa de manga comprida, óculos escuros e hidratação constante entre as 10h e 16h."
        });
    }

    if (alerts.length === 0) {
        alerts.push({
            type: "success",
            icon: "fa-circle-check",
            title: "Condições Climáticas Favoráveis",
            text: "Não há alertas de eventos extremos para o período imediato. Tempo propício para as rotinas regulares de adubação, capina e tratos culturais da sua lavoura."
        });
    }

    const typeClasses = {
        danger: "bg-red-50 border-red-200 text-red-900 border-l-4 border-l-red-600",
        warning: "bg-amber-50 border-amber-200 text-amber-900 border-l-4 border-l-amber-600",
        info: "bg-blue-50 border-blue-200 text-blue-900 border-l-4 border-l-blue-600",
        notice: "bg-purple-50 border-purple-200 text-purple-900 border-l-4 border-l-purple-600",
        success: "bg-emerald-50 border-emerald-200 text-emerald-900 border-l-4 border-l-emerald-600"
    };

    container.innerHTML = alerts.map(a => `
        <div class="p-4 rounded-xl border ${typeClasses[a.type] || typeClasses.info} flex items-start gap-3 shadow-sm">
            <i class="fa-solid ${a.icon} text-xl mt-0.5 flex-shrink-0"></i>
            <div>
                <h5 class="font-bold text-sm mb-1">${a.title}</h5>
                <p class="text-xs leading-relaxed opacity-90">${a.text}</p>
            </div>
        </div>
    `).join('');
}

function renderRainHistory(daily) {
    const container = document.getElementById('clima-history-container');
    if (!container || !daily.time || daily.time.length < 4) return;

    // Os 3 primeiros índices são past_days=3 (3 dias atrás, 2 dias atrás, ontem)
    const historyDays = daily.time.slice(0, 3);
    const rainSums = daily.precipitation_sum.slice(0, 3);

    let totalPastRain = 0;

    const cardsHtml = historyDays.map((dStr, idx) => {
        const val = parseFloat(rainSums[idx] ?? 0);
        totalPastRain += val;
        const dObj = new Date(dStr + 'T12:00:00');
        const dFormatted = dObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

        return `
            <div class="bg-white p-3 rounded-xl border border-slate-200 text-center flex-1 shadow-sm">
                <span class="text-xs text-slate-500 font-medium block">${dFormatted}</span>
                <span class="text-lg font-bold ${val > 0 ? 'text-blue-600' : 'text-slate-400'} block my-1">${val.toFixed(1)} mm</span>
                <span class="text-[10px] text-slate-400">${val > 0 ? 'Chuva registrada' : 'Sem chuva'}</span>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-600 uppercase">Acumulado dos últimos 3 dias:</span>
                <span class="text-sm font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">${totalPastRain.toFixed(1)} mm no solo</span>
            </div>
            <div class="flex gap-2">
                ${cardsHtml}
            </div>
        </div>
    `;
}

function updateDashboardWeatherWidget(cityName, cur, min, max, rainProb, wInfo) {
    const wCity = document.getElementById('dash-widget-city');
    const wTemp = document.getElementById('dash-widget-temp');
    const wDesc = document.getElementById('dash-widget-desc');
    const wIcon = document.getElementById('dash-widget-icon');
    const wMinMax = document.getElementById('dash-widget-minmax');
    const wRain = document.getElementById('dash-widget-rain');

    if (wCity) wCity.innerText = cityName;
    if (wTemp) wTemp.innerText = `${Math.round(cur.temperature_2m ?? 28)}°C`;
    if (wDesc) wDesc.innerText = wInfo.desc;
    if (wIcon) wIcon.className = `fa-solid ${wInfo.icon} text-3xl md:text-4xl ${wInfo.color}`;
    if (wMinMax) wMinMax.innerText = `Mín ${min}°C | Máx ${max}°C`;
    if (wRain) wRain.innerText = `Chuva: ${rainProb}% hoje`;
}

function generateAgroWeatherFallback(lat, lon, cityName) {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    
    // Geração de modelo matemático determinístico com base na latitude e estação
    const isSemiArid = lat > -15 && lat < -3;
    const baseTemp = isSemiArid ? 30 : 25;
    const baseRainProb = isSemiArid ? 15 : 40;

    const times = [];
    const hourlyTimes = [];
    const hourlyTemps = [];
    const hourlyProbs = [];
    const hourlyRains = [];
    const hourlyCodes = [];

    // Gerar 10 dias (3 passados + hoje + 6 futuros)
    const dailyMax = [];
    const dailyMin = [];
    const dailyRain = [];
    const dailyProb = [];
    const dailyUv = [];
    const dailyWind = [];
    const dailyCodes = [];

    for (let i = -3; i <= 6; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() + i);
        times.push(d.toISOString().slice(0, 10));
        dailyMax.push(baseTemp + Math.sin(i) * 3 + 2);
        dailyMin.push(baseTemp - 8 + Math.cos(i) * 2);
        const p = Math.max(0, Math.min(100, Math.round(baseRainProb + Math.sin(i * 1.5) * 20)));
        dailyProb.push(p);
        dailyRain.push(p > 50 ? (p * 0.15) : 0);
        dailyUv.push(9);
        dailyWind.push(14);
        dailyCodes.push(p > 60 ? 61 : (p > 30 ? 2 : 0));
    }

    // 24 horas a partir de agora
    for (let h = 0; h < 96; h++) {
        const hd = new Date(now);
        hd.setHours(hd.getHours() + h - 72);
        hourlyTimes.push(hd.toISOString());
        hourlyTemps.push(Math.round(baseTemp - 3 + Math.sin(h / 3) * 5));
        hourlyProbs.push(baseRainProb);
        hourlyRains.push(0);
        hourlyCodes.push(1);
    }

    return {
        current: {
            temperature_2m: baseTemp,
            relative_humidity_2m: isSemiArid ? 48 : 65,
            apparent_temperature: baseTemp + 1,
            precipitation: 0,
            weather_code: 1,
            surface_pressure: 1012,
            wind_speed_10m: 13,
            wind_direction_10m: 110
        },
        daily: {
            time: times,
            temperature_2m_max: dailyMax,
            temperature_2m_min: dailyMin,
            precipitation_sum: dailyRain,
            precipitation_probability_max: dailyProb,
            uv_index_max: dailyUv,
            wind_speed_10m_max: dailyWind,
            weather_code: dailyCodes
        },
        hourly: {
            time: hourlyTimes,
            temperature_2m: hourlyTemps,
            precipitation_probability: hourlyProbs,
            precipitation: hourlyRains,
            weather_code: hourlyCodes
        }
    };
}

// ==========================================
// 3. ECOPLANTIO - ASSISTENTE INTELIGENTE
// ==========================================

function initEcoPlantioForm() {
    const cropSelect = document.getElementById('plantio-crop-select');
    if (!cropSelect) return;

    cropSelect.innerHTML = Object.keys(ruralCropsData).map(key => {
        const c = ruralCropsData[key];
        return `<option value="${key}">${c.name}</option>`;
    }).join('');

    cropSelect.value = "milho";
}

function generatePlantingPlan() {
    const cropKey = document.getElementById('plantio-crop-select')?.value || 'milho';
    const cityIdx = document.getElementById('plantio-city-select')?.value || 0;
    const soilType = document.getElementById('plantio-soil-select')?.value || 'misto';
    const areaSize = document.getElementById('plantio-area-input')?.value || '1';
    const areaUnit = document.getElementById('plantio-area-unit')?.value || 'tarefas';
    const season = document.getElementById('plantio-season-select')?.value || 'chuvas';
    const waterAccess = document.getElementById('plantio-water-select')?.value || 'sequeiro';
    const slope = document.getElementById('plantio-slope-select')?.value || 'plano';

    const crop = ruralCropsData[cropKey] || ruralCropsData.milho;
    const city = ruralMunicipalitiesData[cityIdx] || ruralMunicipalitiesData[0];

    const resultCard = document.getElementById('plantio-result-card');
    if (!resultCard) return;

    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth' });

    // Análise de Risco Climático e Recomendação ZARC
    let compatibilityScore = "Alta Aptidão Agroclimática";
    let scoreColor = "bg-green-100 text-green-800 border-green-300";
    let compatibilityNotes = "As características da cultura casam perfeitamente com a região e condições informadas.";

    if (waterAccess === 'sequeiro' && (cropKey === 'tomate' || cropKey === 'banana')) {
        compatibilityScore = "Risco Elevado sem Irrigação";
        scoreColor = "bg-red-100 text-red-800 border-red-300";
        compatibilityNotes = "Esta cultura possui altíssima demanda de água contínua e raramente produz bem no sequeiro puro sem água de apoio.";
    } else if (waterAccess === 'sequeiro' && (cropKey === 'milho' || cropKey === 'feijao_comum') && season === 'seca') {
        compatibilityScore = "Risco de Perda por Seca";
        scoreColor = "bg-amber-100 text-amber-800 border-amber-300";
        compatibilityNotes = "Plantar milho/feijão no período seco sem irrigação viola o Zoneamento Agrícola (ZARC). Aguarde o início das chuvas ou providencie rega.";
    } else if (cropKey === 'palma_forrageira' || cropKey === 'mandioca' || cropKey === 'feijao_caupi') {
        compatibilityScore = "Excelente Resistência e Aptidão Regional";
        scoreColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
        compatibilityNotes = "Cultura altamente rústica e adaptada às oscilações pluviométricas do semiárido brasileiro.";
    }

    // Calcular espaçamento e quantidade aproximada de plantas
    let plantCountEstimate = "50.000 a 60.000 plantas/ha";
    if (cropKey === 'milho') plantCountEstimate = "Cerca de 55.000 covas/ha (4 a 5 sementes por metro linear)";
    else if (cropKey === 'feijao_caupi' || cropKey === 'feijao_comum') plantCountEstimate = "200.000 a 240.000 plantas/ha";
    else if (cropKey === 'mandioca') plantCountEstimate = "10.000 a 12.500 manivas/ha (1m x 0.8m)";
    else if (cropKey === 'palma_forrageira') plantCountEstimate = "10.000 a 20.000 raquetes/ha no plantio adensado";
    else if (cropKey === 'tomate') plantCountEstimate = "16.000 a 20.000 plantas/ha tutoradas";
    else if (cropKey === 'banana') plantCountEstimate = "1.600 a 2.000 covas/ha";
    else if (cropKey === 'melancia') plantCountEstimate = "2.500 a 3.300 plantas/ha";

    resultCard.innerHTML = `
        <div class="border-b border-amber-200/80 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border ${scoreColor}">
                    ${compatibilityScore}
                </span>
                <h3 class="text-2xl md:text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                    <i class="fa-solid ${crop.icon} text-amber-600"></i> Plano de Cultivo: ${crop.name}
                </h3>
                <p class="text-sm text-slate-600 mt-1">
                    Propriedade em <strong>${city.name} (${city.state})</strong> • Área informada: <strong>${escapeHtml(areaSize)} ${escapeHtml(areaUnit)}</strong> • Solo: <strong>${escapeHtml(soilType)}</strong>
                </p>
            </div>
            <div class="flex gap-2">
                <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 border border-slate-300">
                    <i class="fa-solid fa-print"></i> Imprimir Guia
                </button>
                <button onclick="sendToEcoIaChat('Poderia me dar mais orientações sobre o plantio de ${escapeHtml(crop.name)} em ${escapeHtml(city.name)} considerando solo ${escapeHtml(soilType)}?')" class="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                    <i class="fa-solid fa-robot"></i> Tirar Dúvidas na EcoIA
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- 1. Melhor Época e ZARC -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-regular fa-calendar-check text-amber-700"></i> Melhor Época de Plantio (ZARC)
                </h4>
                <p class="text-xs text-slate-700 leading-relaxed mb-3">
                    <strong>Semiárido / Região:</strong> ${crop.plantingSeasons.semiarido || crop.plantingSeasons.geral}
                </p>
                <div class="text-[11px] bg-white/80 p-2.5 rounded-xl border border-amber-200 text-amber-900">
                    <i class="fa-solid fa-circle-info mr-1 text-amber-600"></i> <strong>Nota ZARC:</strong> Respeitar a janela hídrica do município para reduzir risco de perda e ter direito a garantia-safra.
                </div>
            </div>

            <!-- 2. Ciclo e Tempo até a Colheita -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-hourglass-half text-amber-700"></i> Tempo Médio até a Colheita
                </h4>
                <p class="text-sm font-extrabold text-slate-800 mb-1">${crop.cycleDays}</p>
                <p class="text-xs text-slate-600 leading-relaxed">
                    Acompanhe os sinais visuais de maturidade (ponto de corte) e não colha com chuva para evitar apodrecimento.
                </p>
            </div>

            <!-- 3. Condições Climáticas e Solo -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-temperature-half text-amber-700"></i> Clima & Solo Recomendado
                </h4>
                <p class="text-xs text-slate-700 mb-1"><strong>Temperatura ideal:</strong> ${crop.idealTemp}</p>
                <p class="text-xs text-slate-700 mb-1"><strong>pH do solo:</strong> ${crop.soilPh}</p>
                <p class="text-xs text-slate-600"><strong>Tipo de solo:</strong> ${crop.soilType}</p>
            </div>

            <!-- 4. Espaçamento e Densidade -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-ruler-combined text-amber-700"></i> Espaçamento Recomendado
                </h4>
                <p class="text-xs text-slate-800 font-semibold mb-2">${crop.spacing}</p>
                <p class="text-xs text-slate-600"><strong>Profundidade da cova/semente:</strong> ${crop.seedDepth}</p>
                <p class="text-xs text-slate-500 mt-1">Densidade média estimada: ${plantCountEstimate}</p>
            </div>

            <!-- 5. Manejo de Irrigação -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-faucet-drip text-amber-700"></i> Manejo de Irrigação & Água
                </h4>
                <p class="text-xs text-slate-700 mb-2 leading-relaxed">${crop.irrigationTips}</p>
                <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200 inline-block">
                    Demanda de água no ciclo: ${crop.waterNeed}
                </span>
            </div>

            <!-- 6. Dificuldades Climáticas & Dicas do Semiárido -->
            <div class="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <h4 class="font-bold text-amber-950 text-sm mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-shield-halved text-amber-700"></i> Riscos Climáticos & Mitigação
                </h4>
                <p class="text-xs text-slate-700 leading-relaxed">${crop.climateRisks}</p>
            </div>
        </div>

        <!-- Tratos Culturais e Pragas -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <!-- Cuidados e Manejo Sustentável -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h4 class="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-hand-holding-seedling text-emerald-600"></i> Cuidados e Práticas de Manejo Agroecológico
                </h4>
                <ul class="space-y-2 text-xs text-slate-700">
                    ${crop.management.map(m => `
                        <li class="flex items-start gap-2">
                            <i class="fa-solid fa-check text-emerald-600 mt-0.5 flex-shrink-0"></i>
                            <span>${m}</span>
                        </li>
                    `).join('')}
                    <li class="flex items-start gap-2">
                        <i class="fa-solid fa-check text-emerald-600 mt-0.5 flex-shrink-0"></i>
                        <span><strong>Cobertura Morta (Mulching):</strong> Aplique palha seca ao redor das plantas para reter a umidade e reduzir a frequência de capinas.</span>
                    </li>
                </ul>
            </div>

            <!-- Pragas e Doenças Comuns -->
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h4 class="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-bug text-red-500"></i> Principais Pragas e Controle Orgânico
                </h4>
                <div class="space-y-3">
                    ${crop.pestsAndDiseases.map(p => `
                        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                            <div class="font-bold text-slate-800 mb-1 flex items-center justify-between">
                                <span>${p.name}</span>
                            </div>
                            <p class="text-slate-600 mb-1"><strong>Sintomas:</strong> ${p.symptoms}</p>
                            <p class="text-emerald-800 font-medium"><strong>Como combater:</strong> ${p.control}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Rodapé com Citação Técnica -->
        <div class="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
            <span>Fontes técnicas: Embrapa Semiárido, Embrapa Hortaliças e ZARC (MAPA).</span>
            <span class="italic">Orientações baseadas nas boas práticas agrícolas. Observe as condições locais do seu lote.</span>
        </div>
    `;
}

// ==========================================
// 4. ECOARMAZÉM - CONSERVAÇÃO E ARMAZENAMENTO
// ==========================================

function renderStorageCategoryPills() {
    const container = document.getElementById('armazem-category-pills');
    if (!container) return;

    const categories = [
        { id: "todos", label: "Todos os Produtos", icon: "fa-boxes-stacked" },
        { id: "Grãos e Cereais", label: "Grãos e Cereais", icon: "fa-wheat-awn" },
        { id: "Raízes e Tubérculos", label: "Mandioca e Tubérculos", icon: "fa-carrot" },
        { id: "Hortaliças e Bulbos", label: "Alho, Cebola e Hortaliças", icon: "fa-seedling" },
        { id: "Frutas e Hortaliças Frescas", label: "Frutas Tropicais", icon: "fa-apple-whole" },
        { id: "Produtos de Origem Animal", label: "Leite e Queijos", icon: "fa-glass-water" }
    ];

    container.innerHTML = categories.map(c => `
        <button type="button" onclick="setStorageFilter('${c.id}')" 
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${ruralState.storageFilter === c.id ? 'bg-amber-800 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-amber-100/70 border border-slate-200'}">
            <i class="fa-solid ${c.icon}"></i> ${c.label}
        </button>
    `).join('');
}

function setStorageFilter(catId) {
    ruralState.storageFilter = catId;
    renderStorageCategoryPills();
    renderRuralStorage();
}

function setStoragePurpose(purpose) {
    ruralState.storagePurpose = purpose;
    const buttons = document.querySelectorAll('.armazem-purpose-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-purpose') === purpose) {
            btn.className = "armazem-purpose-btn px-4 py-2 rounded-xl font-bold text-xs bg-amber-700 text-white shadow-sm border border-amber-800 transition";
        } else {
            btn.className = "armazem-purpose-btn px-4 py-2 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition";
        }
    });
    renderRuralStorage();
}

function handleStorageSearch(val) {
    ruralState.storageSearch = (val || '').toLowerCase().trim();
    renderRuralStorage();
}

function renderRuralStorage() {
    const container = document.getElementById('armazem-items-grid');
    if (!container) return;

    let items = Object.values(ruralStorageData);

    // Filtro por categoria
    if (ruralState.storageFilter !== 'todos') {
        items = items.filter(it => it.category === ruralState.storageFilter);
    }

    // Filtro por finalidade (sementes, consumo, venda, beneficiamento)
    if (ruralState.storagePurpose !== 'todos') {
        items = items.filter(it => it.purposes && it.purposes.includes(ruralState.storagePurpose));
    }

    // Filtro por busca de texto
    if (ruralState.storageSearch) {
        items = items.filter(it => 
            it.name.toLowerCase().includes(ruralState.storageSearch) ||
            it.category.toLowerCase().includes(ruralState.storageSearch) ||
            it.pestsProtection.toLowerCase().includes(ruralState.storageSearch)
        );
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                <i class="fa-solid fa-box-open text-4xl text-slate-300 mb-3"></i>
                <h4 class="font-bold text-slate-700 text-lg mb-1">Nenhum produto encontrado</h4>
                <p class="text-sm text-slate-500">Tente buscar por termos como 'milho', 'feijão', 'mandioca', 'leite' ou limpe os filtros.</p>
                <button onclick="setStorageFilter('todos'); setStoragePurpose('todos');" class="mt-4 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold hover:bg-amber-800 transition">
                    Ver todos os produtos
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-md transition p-6 flex flex-col h-full">
            <div class="flex items-start justify-between gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center text-2xl flex-shrink-0">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    ${item.category}
                </span>
            </div>

            <h3 class="text-xl font-bold text-slate-800 mb-2">${item.name}</h3>

            <!-- Finalidades Atendidas -->
            <div class="flex flex-wrap gap-1.5 mb-4">
                ${item.purposes.map(p => {
                    const labels = {
                        sementes: "🌰 Sementes",
                        consumo: "🍲 Consumo",
                        venda: "🚛 Venda",
                        beneficiamento: "⚙️ Beneficiamento"
                    };
                    return `<span class="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-50 text-amber-800 border border-amber-200">${labels[p] || p}</span>`;
                }).join('')}
            </div>

            <!-- Dados Rápidos -->
            <div class="space-y-2 text-xs text-slate-600 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex-grow">
                <div>
                    <strong class="text-slate-800">Temperatura:</strong> ${item.temp}
                </div>
                <div>
                    <strong class="text-slate-800">Umidade ideal:</strong> ${item.humidity}
                </div>
                <div>
                    <strong class="text-slate-800">Durabilidade:</strong> ${item.shelfLife.consumo || item.shelfLife.venda || Object.values(item.shelfLife)[0]}
                </div>
            </div>

            <!-- Botão de Abertura Detalhada -->
            <button onclick="openStorageModal('${item.id}')" class="w-full mt-auto py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm">
                <span>Ver Guia Completo de Armazenamento</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
        </div>
    `).join('');
}

function openStorageModal(itemId) {
    const item = ruralStorageData[itemId];
    if (!item) return;

    const modal = document.getElementById('armazem-modal');
    const modalContent = document.getElementById('armazem-modal-content');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="border-b border-slate-200 pb-4 mb-6 flex justify-between items-start">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-slate-800">${item.name}</h3>
                    <span class="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">${item.category}</span>
                </div>
            </div>
            <button onclick="closeStorageModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="space-y-6 text-sm text-slate-700 max-h-[70vh] overflow-y-auto pr-2">
            <!-- Embalagens Recomendadas por Finalidade -->
            <div class="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                <h4 class="font-bold text-amber-950 mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-box text-amber-700"></i> Embalagens e Recipientes por Finalidade:
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    ${item.packaging.sementes ? `
                        <div class="bg-white p-3 rounded-lg border border-amber-200">
                            <strong class="text-amber-800 block mb-1">🌰 Para Sementes (Próximo Plantio):</strong>
                            <p class="text-slate-600">${item.packaging.sementes}</p>
                            <span class="text-[11px] font-bold text-slate-500 block mt-1">Validade: ${item.shelfLife.sementes || '12 a 18 meses'}</span>
                        </div>
                    ` : ''}
                    ${item.packaging.consumo ? `
                        <div class="bg-white p-3 rounded-lg border border-amber-200">
                            <strong class="text-amber-800 block mb-1">🍲 Para Consumo Familiar:</strong>
                            <p class="text-slate-600">${item.packaging.consumo}</p>
                            <span class="text-[11px] font-bold text-slate-500 block mt-1">Validade: ${item.shelfLife.consumo || '6 a 12 meses'}</span>
                        </div>
                    ` : ''}
                    ${item.packaging.venda ? `
                        <div class="bg-white p-3 rounded-lg border border-amber-200">
                            <strong class="text-amber-800 block mb-1">🚛 Para Comercialização / Feira:</strong>
                            <p class="text-slate-600">${item.packaging.venda}</p>
                            <span class="text-[11px] font-bold text-slate-500 block mt-1">Validade: ${item.shelfLife.venda || '3 a 6 meses'}</span>
                        </div>
                    ` : ''}
                    ${item.packaging.beneficiamento ? `
                        <div class="bg-white p-3 rounded-lg border border-amber-200">
                            <strong class="text-amber-800 block mb-1">⚙️ Processamento e Beneficiamento:</strong>
                            <p class="text-slate-600">${item.packaging.beneficiamento}</p>
                            <span class="text-[11px] font-bold text-slate-500 block mt-1">Validade: ${item.shelfLife.beneficiamento || 'Variável'}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Proteção Contra Pragas e Fungos -->
            <div class="bg-white p-4 rounded-xl border border-slate-200">
                <h4 class="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-shield-cat text-emerald-600"></i> Proteção contra Pragas (Carunchos, Fungos e Roedores)
                </h4>
                <p class="text-xs text-slate-700 leading-relaxed">${item.pestsProtection}</p>
            </div>

            <!-- Sinais de Deterioração -->
            <div class="bg-red-50/60 p-4 rounded-xl border border-red-200">
                <h4 class="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation text-red-600"></i> Sinais Claros de Deterioração / Perda
                </h4>
                <p class="text-xs text-red-800 leading-relaxed">${item.deteriorationSigns}</p>
            </div>

            <!-- Higiene e Erros Comuns -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 class="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
                        <i class="fa-solid fa-soap text-blue-500"></i> Cuidados Higiênicos
                    </h5>
                    <p class="text-xs text-slate-600 leading-relaxed">${item.hygieneTips}</p>
                </div>
                <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 class="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1.5">
                        <i class="fa-solid fa-ban text-amber-600"></i> Erros Comuns a Evitar
                    </h5>
                    <p class="text-xs text-slate-600 leading-relaxed">${item.commonMistakes}</p>
                </div>
            </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-200 flex justify-end">
            <button onclick="closeStorageModal()" class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition">
                Fechar
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeStorageModal() {
    const modal = document.getElementById('armazem-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// ==========================================
// 5. ECOVIDA RURAL - CENTRAL DE VÍDEOS
// ==========================================

function renderRuralVideos() {
    const container = document.getElementById('videos-grid-container');
    if (!container) return;

    let vids = [...ruralVideosData];

    // Filtro de categoria
    if (ruralState.videoCategory !== 'todas') {
        vids = vids.filter(v => v.category === ruralState.videoCategory);
    }

    // Filtro de busca
    if (ruralState.videoSearch) {
        vids = vids.filter(v => 
            v.title.toLowerCase().includes(ruralState.videoSearch) ||
            v.description.toLowerCase().includes(ruralState.videoSearch) ||
            v.institution.toLowerCase().includes(ruralState.videoSearch)
        );
    }

    if (vids.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-200 p-8">
                <i class="fa-brands fa-youtube text-5xl text-red-500 mb-3"></i>
                <h4 class="font-bold text-slate-700 text-lg mb-1">Nenhum vídeo encontrado</h4>
                <p class="text-sm text-slate-500">Tente buscar por outras palavras-chave ou escolha outra categoria.</p>
                <button onclick="filterRuralVideos('todas')" class="mt-4 px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold hover:bg-amber-800 transition">
                    Ver todos os vídeos
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = vids.map(vid => `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500 transition flex flex-col h-full">
            <!-- Thumbnail e Duração -->
            <div class="relative cursor-pointer group" onclick="openVideoPlayer('${vid.youtubeId}', '${escapeHtml(vid.title)}')">
                <img src="https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg" alt="${escapeHtml(vid.title)}" class="w-full h-44 object-cover group-hover:scale-105 transition duration-300">
                <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition">
                    <div class="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <i class="fa-solid fa-play ml-1"></i>
                    </div>
                </div>
                <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono font-bold">
                    ${vid.duration}
                </span>
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-700/90 text-white text-[10px] font-bold uppercase tracking-wider">
                    ${vid.institution}
                </span>
            </div>

            <!-- Conteúdo -->
            <div class="p-5 flex flex-col flex-grow">
                <span class="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1.5 block">
                    ${vid.categoryLabel}
                </span>
                <h3 class="font-bold text-slate-800 text-base leading-snug mb-2 hover:text-amber-700 transition cursor-pointer" onclick="openVideoPlayer('${vid.youtubeId}', '${escapeHtml(vid.title)}')">
                    ${vid.title}
                </h3>
                <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-grow">
                    ${vid.description}
                </p>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span class="text-xs text-slate-500 flex items-center gap-1">
                        <i class="fa-solid fa-building-columns text-slate-400"></i> ${vid.institution}
                    </span>
                    <button onclick="openVideoPlayer('${vid.youtubeId}', '${escapeHtml(vid.title)}')" class="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition flex items-center gap-1">
                        Assistir <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterRuralVideos(cat) {
    ruralState.videoCategory = cat;
    const buttons = document.querySelectorAll('.video-cat-btn');
    buttons.forEach(b => {
        if (b.getAttribute('data-cat') === cat) {
            b.className = "video-cat-btn px-3 py-2 rounded-xl text-xs font-bold bg-amber-700 text-white shadow-sm border border-amber-800 transition whitespace-nowrap";
        } else {
            b.className = "video-cat-btn px-3 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:bg-amber-50 border border-slate-200 transition whitespace-nowrap";
        }
    });
    renderRuralVideos();
}

function handleVideoSearch(val) {
    ruralState.videoSearch = (val || '').toLowerCase().trim();
    renderRuralVideos();
}

function openVideoPlayer(youtubeId, title) {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('video-player-container');
    const titleEl = document.getElementById('video-modal-title');

    if (!modal || !container) return;

    if (titleEl) titleEl.innerText = title;

    container.innerHTML = `
        <div class="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe 
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1" 
                title="${escapeHtml(title)}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeVideoPlayer() {
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('video-player-container');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    if (container) container.innerHTML = '';
}

// ==========================================
// 6. ECOCOTAÇÃO - PREÇOS E MERCADO AGRÍCOLA
// ==========================================

function renderRuralQuotations() {
    const container = document.getElementById('cotacao-items-container');
    if (!container) return;

    let items = [...ruralQuotationsData];

    // Filtro por Estado
    if (ruralState.cotacaoState !== 'todos') {
        items = items.filter(it => it.state === ruralState.cotacaoState);
    }

    // Filtro por Categoria
    if (ruralState.cotacaoCategory !== 'todos') {
        items = items.filter(it => it.category === ruralState.cotacaoCategory);
    }

    // Filtro por Busca
    if (ruralState.cotacaoSearch) {
        items = items.filter(it => 
            it.product.toLowerCase().includes(ruralState.cotacaoSearch) ||
            it.stateName.toLowerCase().includes(ruralState.cotacaoSearch) ||
            it.source.toLowerCase().includes(ruralState.cotacaoSearch)
        );
    }

    if (items.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10 bg-white rounded-2xl border border-slate-200 p-8">
                <i class="fa-solid fa-chart-line text-4xl text-slate-300 mb-2"></i>
                <h4 class="font-bold text-slate-700 text-base mb-1">Nenhuma cotação encontrada</h4>
                <p class="text-xs text-slate-500">Altere o estado selecionado ou limpe os campos de pesquisa.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(c => {
        let varBadge = `<span class="text-slate-500 font-semibold text-xs flex items-center gap-1"><i class="fa-solid fa-minus"></i> 0.0% (estável)</span>`;
        let borderClass = "border-slate-200";

        if (c.variation > 0) {
            varBadge = `<span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-xs flex items-center gap-1 border border-emerald-200"><i class="fa-solid fa-arrow-trend-up"></i> +${c.variation.toFixed(1)}%</span>`;
            borderClass = "hover:border-emerald-400";
        } else if (c.variation < 0) {
            varBadge = `<span class="text-red-700 bg-red-50 px-2 py-0.5 rounded font-bold text-xs flex items-center gap-1 border border-red-200"><i class="fa-solid fa-arrow-trend-down"></i> ${c.variation.toFixed(1)}%</span>`;
            borderClass = "hover:border-red-400";
        }

        return `
            <div class="bg-white rounded-2xl border ${borderClass} p-5 shadow-sm transition flex flex-col justify-between hover:shadow-md">
                <div>
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                            ${c.category}
                        </span>
                        ${varBadge}
                    </div>

                    <h3 class="font-bold text-slate-800 text-lg mb-1">${c.product}</h3>
                    <span class="text-xs text-slate-500 font-medium block mb-3">
                        <i class="fa-solid fa-location-dot text-amber-600 mr-1"></i> ${c.stateName}
                    </span>

                    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 flex items-baseline justify-between">
                        <div>
                            <span class="text-xs text-slate-400 uppercase font-bold block">Preço Médio</span>
                            <div class="text-2xl md:text-3xl font-extrabold text-slate-900">
                                R$ ${c.price.toFixed(2).replace('.', ',')}
                            </div>
                        </div>
                        <span class="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                            por ${c.unit}
                        </span>
                    </div>

                    <div class="text-xs text-slate-500 space-y-1 mb-4">
                        <div class="flex justify-between">
                            <span>Período anterior:</span>
                            <span class="font-mono text-slate-700 font-semibold">R$ ${c.prevPrice.toFixed(2).replace('.', ',')}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Última atualização:</span>
                            <span class="text-slate-700">${c.lastUpdate}</span>
                        </div>
                    </div>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span class="truncate" title="${c.source}"><i class="fa-solid fa-landmark mr-1"></i> ${c.source}</span>
                    <span class="bg-green-50 text-green-700 px-2 py-0.5 rounded font-bold">Oficial</span>
                </div>
            </div>
        `;
    }).join('');
}

function handleCotacaoStateChange(val) {
    ruralState.cotacaoState = val;
    renderRuralQuotations();
}

function handleCotacaoCategoryChange(val) {
    ruralState.cotacaoCategory = val;
    renderRuralQuotations();
}

function handleCotacaoSearch(val) {
    ruralState.cotacaoSearch = (val || '').toLowerCase().trim();
    renderRuralQuotations();
}

// ==========================================
// 7. ECOIA RURAL - ASSISTENTE INTELIGENTE
// ==========================================

function renderRuralChatMessages() {
    const container = document.getElementById('rural-chat-messages');
    if (!container) return;

    container.innerHTML = ruralState.chatHistory.map(msg => {
        const isBot = msg.role === 'assistant';
        const sourceBadge = isBot ? (msg.isOnline ? 
            `<span class="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold ml-1.5 border border-emerald-300"><i class="fa-solid fa-bolt mr-0.5"></i> IA Online</span>` : 
            `<span class="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold ml-1.5 border border-amber-300"><i class="fa-solid fa-book-bookmark mr-0.5"></i> Embrapa & ZARC</span>`) : '';
        return `
            <div class="flex ${isBot ? 'justify-start' : 'justify-end'} mb-4">
                <div class="flex gap-3 max-w-[88%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}">
                    <div class="w-8 h-8 rounded-full ${isBot ? 'bg-amber-700 text-white' : 'bg-slate-700 text-white'} flex items-center justify-center flex-shrink-0 text-sm shadow-sm mt-1">
                        <i class="fa-solid ${isBot ? 'fa-wheat-awn' : 'fa-user'}"></i>
                    </div>
                    <div>
                        <div class="p-4 rounded-2xl ${isBot ? 'bg-white border border-slate-200 text-slate-800 shadow-sm' : 'bg-amber-700 text-white shadow-sm'} text-sm leading-relaxed whitespace-pre-wrap">
                            ${formatChatMessage(msg.text)}
                        </div>
                        <div class="flex items-center gap-1 mt-1 ${isBot ? 'justify-start' : 'justify-end'}">
                            <span class="text-[10px] text-slate-400">${msg.time || ''}</span>
                            ${sourceBadge}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
}

function formatChatMessage(text) {
    if (!text) return "";
    let formatted = escapeHtml(text);
    // Formatar negrito
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Formatar itálico
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Formatar quebras de linha com listas
    return formatted;
}

function sendToEcoIaChat(presetText) {
    switchRuralSubTab('ia');
    const input = document.getElementById('rural-chat-input');
    if (input) {
        input.value = presetText;
        submitEcoIaMessage();
    }
}

async function submitEcoIaMessage() {
    const input = document.getElementById('rural-chat-input');
    const userText = input ? input.value.trim() : '';
    if (!userText) return;

    input.value = '';

    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    // Adicionar mensagem do usuário
    ruralState.chatHistory.push({
        role: "user",
        text: userText,
        time: now
    });

    renderRuralChatMessages();

    // Feedback de carregamento / pensando
    const container = document.getElementById('rural-chat-messages');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'ia-typing-indicator';
    typingIndicator.className = "flex justify-start mb-4";
    typingIndicator.innerHTML = `
        <div class="flex gap-3 items-center text-xs text-slate-500 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm">
            <i class="fa-solid fa-circle-notch fa-spin text-amber-700"></i>
            <span>EcoIA consultando referências agrícolas e Embrapa...</span>
        </div>
    `;
    if (container) {
        container.appendChild(typingIndicator);
        container.scrollTop = container.scrollHeight;
    }

    try {
        let botResponse = "";
        let isOnline = false;

        // Tentar obter resposta via API de IA em tempo real (automática ou com chave configurada)
        botResponse = await fetchOnlineAiRuralResponse(userText);
        if (botResponse) {
            isOnline = true;
        } else {
            // Recorrer à Base de Conhecimento Agronômica Local Embrapa/ZARC
            botResponse = queryLocalRuralKnowledge(userText);
        }

        // Remover indicador
        const ind = document.getElementById('ia-typing-indicator');
        if (ind) ind.remove();

        // Adicionar resposta do bot
        ruralState.chatHistory.push({
            role: "assistant",
            text: botResponse,
            isOnline: isOnline,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        });

        renderRuralChatMessages();
    } catch (e) {
        console.error("Erro no chat EcoIA:", e);
        const ind = document.getElementById('ia-typing-indicator');
        if (ind) ind.remove();

        const fallback = queryLocalRuralKnowledge(userText);
        ruralState.chatHistory.push({
            role: "assistant",
            text: fallback,
            isOnline: false,
            time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        });
        renderRuralChatMessages();
    }
}

function queryLocalRuralKnowledge(query) {
    const lower = query.toLowerCase();

    // 1. Verificar base de conhecimento por palavras-chave
    for (const item of ruralKnowledgeBase) {
        for (const kw of item.keywords) {
            if (lower.includes(kw)) {
                return item.reply;
            }
        }
    }

    // 2. Verificar se mencionou alguma cultura específica do EcoPlantio
    for (const cropKey in ruralCropsData) {
        const crop = ruralCropsData[cropKey];
        if (lower.includes(crop.name.toLowerCase()) || lower.includes(cropKey)) {
            return `🌱 **Orientações Técnicas para o Cultivo de ${crop.name}:**\n\n` +
                   `• **Ciclo estimado:** ${crop.cycleDays}\n` +
                   `• **Melhor época de semeadura:** ${crop.plantingSeasons.semiarido || crop.plantingSeasons.geral}\n` +
                   `• **Espaçamento recomendado:** ${crop.spacing}\n` +
                   `• **Demanda de água:** ${crop.waterNeed}\n` +
                   `• **Manejo de irrigação:** ${crop.irrigationTips}\n\n` +
                   `Para ver o guia detalhado completo com controle de pragas e adubação, acesse a aba **EcoPlantio**!`;
        }
    }

    // 3. Resposta técnica estruturada padrão de extensionista rural
    return `🌾 **EcoIA Rural — Orientação Agropecuária:**

Entendi sua dúvida sobre **"${query}"**. 

Para atividades agrícolas no campo e no semiárido, as recomendações fundamentais da Embrapa e da extensão rural são:
1. **Planejamento Hídrico:** Verifique sempre a disponibilidade de água na sua propriedade e evite semeadura de culturas exigentes em períodos com previsão de estiagem prolongada.
2. **Saúde do Solo:** Mantenha sempre o solo coberto com palhada (cobertura morta/mulching) e aplique esterco de curral bem curtido para reter água e matéria orgânica.
3. **Manejo Ecológico de Pragas:** Prefira caldas naturais (como Calda Bordalesa, óleo de nim e biofertilizantes) antes de recorrer a insumos químicos tóxicos.
4. **Armazenamento Seguro:** Após a colheita, guarde sua produção com umidade controlada em recipientes herméticos (como garrafas PET com cinza ou tambores vedados) para impedir carunchos e mofos.

Você pode navegar pelos módulos específicos nos botões acima (**EcoClima**, **EcoPlantio**, **EcoArmazém**, **EcoCotação** e **EcoAproveitamento**) para obter relatórios completos!`;
}

// Motor Unificado de Chamadas de APIs de IA
async function fetchOnlineAiRuralResponse(userPrompt) {
    const provider = ruralState.aiProvider || "auto";

    // 1. Se o produtor escolheu Gemini e configurou a chave
    if ((provider === 'gemini' || (!ruralState.openaiKey && ruralState.geminiKey)) && ruralState.geminiKey) {
        const geminiRes = await fetchGeminiRuralResponse(userPrompt);
        if (geminiRes) return geminiRes;
    }

    // 2. Se o produtor escolheu OpenAI e configurou a chave
    if ((provider === 'openai' || (!ruralState.geminiKey && ruralState.openaiKey)) && ruralState.openaiKey && ruralState.openaiKey.startsWith('sk-')) {
        const openAiRes = await fetchOpenAiRuralResponse(userPrompt);
        if (openAiRes) return openAiRes;
    }

    // 3. API de IA Gratuita Integrada Direta (Não exige chave do usuário - Modelo Aberto de Alta Velocidade)
    try {
        const systemPrompt = `Você é o EcoIA Rural, assistente agronômico e extensionista virtual da plataforma EcoGuia, especializado em agricultura familiar, agroecologia, semiárido brasileiro, zoneamento de risco climático (ZARC) e recomendações da Embrapa.
Responda em português brasileiro de forma simples, prática, empática, respeitosa e muito acessível ao produtor do campo.
Organize as respostas com tópicos claros, negrito para termos importantes e passos numerados quando for receita ou manejo.
Priorize métodos sustentáveis, adubação orgânica com esterco curtido, conservação de água, biofertilizantes e combate natural a pragas (calda bordalesa, óleo de nim, cinza).
Contexto do produtor atual: Município de ${ruralState.currentLocation.name} (${ruralState.currentLocation.state}), Região: ${ruralState.currentLocation.region}.`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 9500);

        const response = await fetch("https://text.pollinations.ai/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    ...ruralState.chatHistory.slice(-4).map(m => ({
                        role: m.role,
                        content: m.text
                    })),
                    { role: "user", content: userPrompt }
                ],
                model: "openai",
                seed: Math.floor(Math.random() * 1000)
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const replyText = await response.text();
            if (replyText && replyText.trim().length > 15 && !replyText.toLowerCase().includes("error")) {
                return replyText.trim();
            }
        }
    } catch (e) {
        console.warn("API de IA online não respondeu a tempo, acionando base local:", e);
    }

    return null;
}

async function fetchGeminiRuralResponse(userPrompt) {
    try {
        const systemPrompt = `Você é o EcoIA Rural, extensionista agrícola da Embrapa. Local do produtor: ${ruralState.currentLocation.name} (${ruralState.currentLocation.state}). Responda com linguagem acessível, prática e sustentável.`;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${ruralState.geminiKey}`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `${systemPrompt}\n\nPergunta do agricultor: ${userPrompt}` }
                        ]
                    }
                ]
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
        }
    } catch (e) {
        console.warn("Erro ao chamar API Gemini:", e);
    }
    return null;
}

async function fetchOpenAiRuralResponse(userPrompt) {
    try {
        const systemPrompt = `Você é o EcoIA Rural, assistente virtual especialista em agricultura familiar, agroecologia, semiárido brasileiro, extensão rural, zoneamento de risco climático (ZARC) e recomendações técnicas da Embrapa. Contexto atual do produtor: Região ${ruralState.currentLocation.region}, Município ${ruralState.currentLocation.name}.`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8500);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ruralState.openaiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...ruralState.chatHistory.slice(-4).map(m => ({
                        role: m.role,
                        content: m.text
                    })),
                    { role: "user", content: userPrompt }
                ],
                max_tokens: 650,
                temperature: 0.5
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) return null;
        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
    } catch (e) {
        console.warn("Chamada à API OpenAI falhou:", e);
        return null;
    }
}

function openIaSettingsModal() {
    const modal = document.getElementById('ia-settings-modal');
    const openaiInput = document.getElementById('ia-openai-key-input');
    const geminiInput = document.getElementById('ia-gemini-key-input');
    const providerSelect = document.getElementById('ia-provider-select');

    if (openaiInput) openaiInput.value = ruralState.openaiKey || "";
    if (geminiInput) geminiInput.value = ruralState.geminiKey || "";
    if (providerSelect) providerSelect.value = ruralState.aiProvider || "auto";

    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeIaSettingsModal() {
    const modal = document.getElementById('ia-settings-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function saveIaSettings() {
    const openaiInput = document.getElementById('ia-openai-key-input');
    const geminiInput = document.getElementById('ia-gemini-key-input');
    const providerSelect = document.getElementById('ia-provider-select');

    if (openaiInput) {
        ruralState.openaiKey = openaiInput.value.trim();
        localStorage.setItem('ecoguia_openai_key', ruralState.openaiKey);
    }
    if (geminiInput) {
        ruralState.geminiKey = geminiInput.value.trim();
        localStorage.setItem('ecoguia_gemini_key', ruralState.geminiKey);
    }
    if (providerSelect) {
        ruralState.aiProvider = providerSelect.value;
        localStorage.setItem('ecoguia_ai_provider', ruralState.aiProvider);
    }

    alert("Configurações da IA salvas com sucesso!");
    closeIaSettingsModal();
}

// ==========================================
// 8. ECOAPROVEITAMENTO - CALCULADORA & SUSTENTABILIDADE
// ==========================================

function calculateCompostAndMulch() {
    const areaInput = document.getElementById('calc-area-size');
    const typeSelect = document.getElementById('calc-type-select');
    const resultBox = document.getElementById('calc-result-box');

    const area = parseFloat(areaInput?.value || 0);
    const type = typeSelect?.value || 'horta';

    if (!area || area <= 0) {
        alert("Por favor, informe uma área válida em metros quadrados (m²).");
        return;
    }

    let estercoKgPerM2 = 5; // 5 kg por m² para horta
    let palhaKgPerM2 = 2; // 2 kg de palhada para 5 cm de cobertura morta

    if (type === 'roca') {
        estercoKgPerM2 = 2;
        palhaKgPerM2 = 1.5;
    } else if (type === 'fruticultura') {
        estercoKgPerM2 = 8;
        palhaKgPerM2 = 3;
    }

    const totalEstercoKg = Math.round(area * estercoKgPerM2);
    const totalPalhaKg = Math.round(area * palhaKgPerM2);
    const carrinhosMaoEsterco = Math.ceil(totalEstercoKg / 40); // 1 carrinho comporta cerca de 40 kg
    const economiaAguaLitrosMes = Math.round(area * 150 * 0.4); // Economia média de 40% de evaporação

    if (resultBox) {
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
            <div class="bg-amber-50 p-5 rounded-2xl border border-amber-200">
                <h4 class="font-bold text-amber-950 text-base mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-calculator text-amber-700"></i> Estimativa de Recursos para ${area} m²:
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center mb-4">
                    <div class="bg-white p-3 rounded-xl border border-amber-200">
                        <span class="text-xs text-slate-500 block">Esterco Curtido</span>
                        <span class="text-xl font-extrabold text-amber-900">${totalEstercoKg} kg</span>
                        <span class="text-[11px] text-slate-500 block">~${carrinhosMaoEsterco} carrinhos de mão</span>
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-amber-200">
                        <span class="text-xs text-slate-500 block">Palha Seca (Mulching)</span>
                        <span class="text-xl font-extrabold text-amber-900">${totalPalhaKg} kg</span>
                        <span class="text-[11px] text-slate-500 block">Camada protetora de 5 a 8 cm</span>
                    </div>
                    <div class="bg-white p-3 rounded-xl border border-amber-200">
                        <span class="text-xs text-slate-500 block">Economia de Água Estimada</span>
                        <span class="text-xl font-extrabold text-blue-700">${economiaAguaLitrosMes.toLocaleString('pt-BR')} L/mês</span>
                        <span class="text-[11px] text-slate-500 block">Redução de evaporação no solo</span>
                    </div>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed">
                    <strong>Recomendação:</strong> Aplique o esterco sempre <strong>bem curtido</strong> (nunca fresco direto na raiz) misturado aos primeiros 10 cm do solo. Espalhe a palha por cima após o plantio, mantendo 5 cm livres ao redor do colo da planta para evitar fungos.
                </p>
            </div>
        `;
    }
}

// Auxiliar de escape de strings para prevenir injeção XSS
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
