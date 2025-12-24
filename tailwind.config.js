/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                cream: '#fbfaf8',
                'dark-overlay': 'rgba(0, 0, 0, 0.6)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
