/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'chat-background': "url('/assets/background.jpg')",
            },
            width: {
                'bar-width': '35rem',
            },
            colors: {
                primary: '#202c33',
                secondary: '#111b21',
                accent: '#2A3942',
                'message-user': '#005c4b',
            },
        },
        fontFamily: {
            sans: 'Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell, Fira Sans, sans-serif',
        },
        container: {
            center: true,
        },
    },
    plugins: [],
}
