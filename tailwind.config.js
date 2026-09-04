import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#E8F0EC',
                    100: '#C8DCD2',
                    200: '#9BBFAD',
                    300: '#6FA388',
                    400: '#4A8A6A',
                    500: '#2F6B57',
                    600: '#164A41',
                    700: '#0F3A33',
                    800: '#092822',
                    900: '#041411',
                },
                secondary: {
                    50: '#F7F6F0',
                    100: '#ECEAE0',
                    200: '#D4D0C0',
                    300: '#B8B29A',
                    400: '#9A9274',
                    500: '#8A9A5B',
                    600: '#6B7A4E',
                    700: '#4A5A32',
                    800: '#3A4828',
                    900: '#2A361C',
                },
                accent: {
                    50: '#FDF8ED',
                    100: '#FAF0D0',
                    200: '#F5E2A0',
                    300: '#E8C860',
                    400: '#D9B56D',
                    500: '#C4A35A',
                    600: '#A68A45',
                    700: '#867038',
                    800: '#65562B',
                    900: '#443C1E',
                },
                surface: '#FFFFFF',
                background: '#F7F5EF',
                charcoal: '#202522',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                'sm': '6px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
            },
            boxShadow: {
                'subtle': '0 1px 2px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.03)',
                'card': '0 0 0 1px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.04)',
                'elevated': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 16px rgba(0, 0, 0, 0.06)',
            },
            fontSize: {
                'xxs': '0.6875rem',
            },
        },
    },

    plugins: [forms],
};
