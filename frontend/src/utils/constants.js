export const CATEGORY_MAP = {
    car: 'Car & Motorbike',
    computer: 'Computers & Accessories',
    elettronica: 'Electronics',
    salute: 'Health & PersonalCare',
    cucina: 'Home & Kitchen',
    casa: 'HomeImprovement',
    musica: 'MusicalInstruments',
    office: 'OfficeProducts',
    games: 'Toys & Games',
}

export const CATEGORY_THEMES = {
    all: {
        bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
        color: '#b4b2a9',
        iconName: 'LayoutGrid',
        description: 'Tutte le categorie di prodotti',
    },
    car: {
        bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
        color: '#b4b2a9',
        iconName: 'Car',
        description: 'Tutto per la tua auto e moto',
    },
    computer: {
        bg: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 50%, #1a3a5c 100%)',
        color: '#85b7eb',
        iconName: 'Monitor',
        description: 'Laptop, accessori e periferiche',
    },
    elettronica: {
        bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#7ec8e3',
        iconName: 'Zap',
        description: 'Gadget e dispositivi elettronici',
    },
    salute: {
        bg: 'linear-gradient(135deg, #2e0e1a 0%, #4a1230 50%, #6b1945 100%)',
        color: '#ed93b1',
        iconName: 'HeartPulse',
        description: 'Salute, cura e benessere personale',
    },
    cucina: {
        bg: 'linear-gradient(135deg, #1a2e1a 0%, #2d4a1e 50%, #3d6b2c 100%)',
        color: '#97c459',
        iconName: 'UtensilsCrossed',
        description: 'Elettrodomestici e accessori cucina',
    },
    casa: {
        bg: 'linear-gradient(135deg, #2e1a0e 0%, #4a2e12 50%, #6b4019 100%)',
        color: '#f0a070',
        iconName: 'Home',
        description: 'Tutto per la casa e il fai da te',
    },
    musica: {
        bg: 'linear-gradient(135deg, #1e0a2e 0%, #2d1045 50%, #4a1a6b 100%)',
        color: '#afa9ec',
        iconName: 'Music',
        description: 'Strumenti musicali e accessori',
    },
    office: {
        bg: 'linear-gradient(135deg, #1e1e0a 0%, #2d2d10 50%, #4a4a1a 100%)',
        color: '#fac775',
        iconName: 'Building2',
        description: 'Forniture e prodotti per ufficio',
    },
    games: {
        bg: 'linear-gradient(135deg, #0a1e0a 0%, #102d10 50%, #1a4a1a 100%)',
        color: '#5dca95',
        iconName: 'Gamepad2',
        description: 'Giochi, giocattoli e intrattenimento',
    },
}

export const SORT_OPTIONS = [
    { value: '', label: 'Rilevanza' },
    { value: 'price_asc', label: 'Prezzo ↑' },
    { value: 'price_desc', label: 'Prezzo ↓' },
    { value: 'rating', label: 'Più votati' },
]

export const DEFAULT_THEME = {
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    color: '#b4b2a9',
    iconName: 'Package',
    description: '',
}