import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    theme: {
        extend: {
            colors: {
                primary: "#FF9900",
                "background-light": "#F2F2F2",
                "background-dark": "#000000",
                "dark-gray": "#1A1A1A",
            },
            fontFamily: {
                display: ["Outfit", "sans-serif"],
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
                "3xl": "2rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries')
    ]
}
