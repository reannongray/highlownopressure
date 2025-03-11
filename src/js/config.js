// Weather app configuration
export const CONFIG = {
    defaultLocation: {
        latitude: 40.7128, // New York
        longitude: -74.0060,
        name: "New York, USA"
    },
    units: "metric", // metric or imperial
    snarkySayings: {
        "clearSky": [
            "Perfect weather for overthinking your life choices!",
            "Sun's out, responsibility's out!",
            "Great day to pretend you're an outdoor person!",
            "Even the weather app thinks you should go outside today.",
            "This weather is so nice it's suspicious.",
            "No clouds, no shade, no excuses.",
            "Time to dust off that 'outdoor personality' you've been saving.",
            "Your plants are judging you for staying inside right now.",
            "Weather this good should be illegal on a workday.",
            "The sun is shining brighter than your future!",
            "Look outside: nature's way of saying 'phones down'.",
            "Today's forecast: FOMO if you stay indoors.",
            "Sun's out, guns out... or whatever limbs you're comfortable showing.",
            "Clear skies: nature's way of saying 'I'm watching you'."
        ],
        "cloudy": [
            "Cloudy with a chance of existential dread.",
            "The clouds are just having their own little meeting up there.",
            "Perfect day to stay in and judge people on social media!",
            "The sky is just being moody today, like your ex.",
            "Clouds: nature's way of saying 'maybe later'.",
            "50 shades of grey... but in the sky, so less exciting.",
            "It's like the sky installed a privacy filter.",
            "The sun is social distancing today.",
            "Cloudy: nature's way of saying 'meh' to your outdoor plans.",
            "Today's sky brought to you by the color 'blah'.",
            "Clouds gathering like your unread emails.",
            "Sky looking as uncertain as your career path.",
            "The clouds are conspiring against your laundry plans.",
            "Perfect lighting for your moody selfies today."
        ],
        "rain": [
            "Nature's way of washing away your outdoor plans!",
            "Great day to dramatically stare out windows!",
            "The sky is crying so you don't have to.",
            "Rain: Earth's way of telling you to binge watch another series.",
            "It's raining? What a perfect excuse to cancel plans!",
            "Free car wash! Just terrible timing.",
            "Bring an umbrella, or don't. We're not your mom.",
            "Like your ex, this rain will pass... eventually.",
            "Mother Nature's sprinkler system is acting up again.",
            "The perfect weather for pretending you're in a music video.",
            "Rain: when the sky decides your plants needed watering.",
            "It's not rain, it's the sky's way of telling you to work from home.",
            "Perfect weather for that indoor hobby you've been neglecting.",
            "Your hair's worst enemy has arrived.",
            "The weather is matching your mood. Coincidence?",
            "Raindrops keep falling on your head... and everywhere else."
        ],
        "snow": [
            "Free ice sculptures falling from the sky!",
            "Perfect weather for canceling plans you didn't want to keep anyway!",
            "Snow day: Nature's gift to procrastinators.",
            "Look outside! The world has installed its winter theme.",
            "It's snowing, which means it's too cold to snow.",
            "Winter wonderland or frozen nightmare? You decide!",
            "Time to pretend you know how to drive in this!",
            "Nature's way of making everything look prettier than it is.",
            "Snowflakes falling like your New Year's resolutions.",
            "The perfect excuse to drink hot chocolate at 11am.",
            "Mother Nature's dandruff is particularly bad today.",
            "Snow: making your commute exciting since forever.",
            "Time to build a snow person with unrealistic body standards.",
            "Walking in a winter wonderland... or more like carefully shuffling.",
            "The sky is giving free exfoliation treatment to your face."
        ],
        "extreme": [
            "Mother Nature is having quite the temper tantrum!",
            "Maybe today isn't the day for that picnic after all...",
            "Weather's giving strong 'stay in bed' vibes today.",
            "The forecast is spicy today! Extra drama in the atmosphere!",
            "Mother Nature clearly woke up and chose violence.",
            "The weather's mood swings are worse than yours!",
            "Time to reconsider all your life choices that led you here.",
            "This is the weather equivalent of caps lock being stuck on.",
            "Nature's way of saying 'I'm not mad, I'm disappointed'.",
            "The sky is auditioning for a disaster movie today.",
            "This weather is more unstable than your last relationship.",
            "Mother Nature's putting on quite the show today!",
            "Today's forecast: chaos with a chance of more chaos.",
            "Perfect day to test if your insurance policy is up to date!"
        ],
        "hot": [
            "It's hot enough to make a penguin book a vacation!",
            "The sun is showing off its microwave setting today.",
            "Perfect weather for explaining why you're sweating so much.",
            "Hot enough to make your phone ask for sunscreen.",
            "It's not the heat, it's the stupidity of being outside right now.",
            "Today's weather: Satan called, he wants his sauna back.",
            "Sweating is just your body crying for air conditioning.",
            "Perfect day to find out if your deodorant actually works.",
            "Today's top question: Is it hot, or is it just me? (It's hot.)",
            "The sun is taking its 'burning ball of gas' role very seriously today.",
            "Welcome to the great outdoors - also known as 'the oven' today.",
            "This weather makes your car feel like a toaster oven with seats.",
            "Today's free life hack: appreciate winter.",
            "So hot the asphalt is accepting credit cards for shoes stuck to it.",
            "Forecast: Hot with a chance of complaining about how hot it is."
        ],
        "cold": [
            "It's so cold even your phone is shivering!",
            "Perfect day to explain all your extra layers as 'fashion'.",
            "Cold enough to make a polar bear reconsider its life choices.",
            "The air hurts your face weather has arrived!",
            "It's not cold, it's just the universe reminding you that you're alive!",
            "Feels like the earth caught a cold and is sharing it with everyone.",
            "So cold your shadow is looking for a fireplace.",
            "Welcome to winter: where breathing through your nose is a mistake.",
            "Perfect weather for that 'I can see my breath' party trick.",
            "Today's forecast: wear everything you own at once.",
            "The kind of cold that makes your bones file a formal complaint.",
            "Even your goosebumps have goosebumps today.",
            "When does winter end? Asking for a friend... the friend is me. I'm cold.",
            "Stepping outside feels like opening the freezer with your face.",
            "Your heating bill is preparing its Oscar acceptance speech."
        ],
        "windy": [
            "Hold onto your hairstyles and loose papers!",
            "Mother Nature is really blowing this out of proportion.",
            "Perfect day to find out if you weigh enough to not get blown away.",
            "Free resistance training with every step outside!",
            "The wind is really giving your outfit that windblown look without consent.",
            "Today's forecast: bad hair day with gusts of 'why did I bother styling?'",
            "The trees are waving at you. Or are they desperately signaling for help?",
            "Nature's way of telling you that your umbrella has structural weaknesses.",
            "The wind's playing fetch with trash cans all over town.",
            "Great day to pretend you're in a dramatic music video!",
            "Wind Advisory: Small dogs and children should be properly anchored.",
            "The kites are flying themselves today."
        ],
        "fog": [
            "The world is playing hide and seek with you today.",
            "Silent Hill vibes, minus the psychological horror... hopefully.",
            "Mother Nature's privacy screen has been activated.",
            "Fog: nature's way of saying 'I need some personal space'.",
            "Perfect day to pretend you're in a mysterious movie scene.",
            "The cloud wanted to get a closer look at you today.",
            "Visibility is low, but the spooky ambiance is high.",
            "The world is rendering at low graphics settings today.",
            "Great day to whisper ominously for no reason.",
            "Fog: when clouds can't even make it off the ground.",
            "The atmosphere is having an identity crisis today."
        ],
        "humid": [
            "The air is hugging you whether you like it or not.",
            "It's not the heat, it's the humidity... said everyone, everywhere, always.",
            "Today's special: air you can wear!",
            "Your hair has officially been granted its own weather forecast.",
            "Mother Nature's free sauna experience.",
            "Humidity: making you question if you just showered or if that's sweat already.",
            "Today's air is sponsored by your local swimming pool.",
            "Even your clothes are asking for personal space in this humidity.",
            "Perfect weather for testing your deodorant's claims.",
            "When breathing feels like drinking water, but less refreshing.",
            "Bad hair day? Blame the atmosphere's water content!"
        ],
        "nightClear": [
            "Stars out tonight! Each one is a sun that doesn't care about your problems.",
            "Clear night sky: nature's way of making you feel insignificant in the universe.",
            "Perfect night for stargazing and overthinking everything.",
            "The moon is out and judging your life choices.",
            "Darkness with sparkles! Nature's nightclub.",
            "Tonight's sky is clearer than your future plans.",
            "Stars are out performing for free, and you're missing it inside.",
            "The stars are particularly judgmental tonight."
        ]
    }
};

// Weather condition constants
export const WEATHER_CONDITIONS = {
    CLEAR_SKY: 'clearSky',
    NIGHT_CLEAR: 'nightClear',
    CLOUDY: 'cloudy',
    RAIN: 'rain',
    SNOW: 'snow',
    EXTREME: 'extreme',
    FOG: 'fog',
    WINDY: 'windy',
    HOT: 'hot',
    COLD: 'cold',
    HUMID: 'humid'
};

// Moon phase details for different phases
export const MOON_PHASES = {
    NEW_MOON: {
        name: "New Moon", 
        icon: "ri-moon-line",
        description: "Not visible, the moon is between Earth and Sun."
    },
    WAXING_CRESCENT: {
        name: "Waxing Crescent", 
        icon: "ri-moon-line",
        description: "Moon is becoming more illuminated each night."
    },
    FIRST_QUARTER: {
        name: "First Quarter", 
        icon: "ri-moon-fill",
        description: "Moon is becoming more illuminated each night."
    },
    WAXING_GIBBOUS: {
        name: "Waxing Gibbous", 
        icon: "ri-moon-fill",
        description: "Moon is becoming more illuminated each night."
    },
    FULL_MOON: {
        name: "Full Moon", 
        icon: "ri-moon-fill",
        description: "Maximum illumination, visible all night."
    },
    WANING_GIBBOUS: {
        name: "Waning Gibbous", 
        icon: "ri-moon-fill",
        description: "Moon is becoming less illuminated each night."
    },
    LAST_QUARTER: {
        name: "Last Quarter", 
        icon: "ri-moon-fill",
        description: "Moon is becoming less illuminated each night."
    },
    WANING_CRESCENT: {
        name: "Waning Crescent", 
        icon: "ri-moon-line",
        description: "Moon is becoming less illuminated each night."
    }
};

// Moon phase mapping ranges
export const PHASE_RANGES = [
    { max: 0.025, phase: 'NEW_MOON' },
    { max: 0.125, phase: 'WAXING_CRESCENT' },
    { max: 0.25, phase: 'FIRST_QUARTER' },
    { max: 0.375, phase: 'WAXING_GIBBOUS' },
    { max: 0.625, phase: 'FULL_MOON' },
    { max: 0.75, phase: 'WANING_GIBBOUS' },
    { max: 0.875, phase: 'LAST_QUARTER' },
    { max: 1, phase: 'WANING_CRESCENT' }
];