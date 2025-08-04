import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
        // 古朴甲骨文主题色彩
        'oracle-dark': '#3E2723',      // 深咖啡色 - 墨色
        'oracle-primary': '#5D4037',   // 深褐色 - 古木色
        'oracle-secondary': '#8D6E63', // 灰褐色 - 古铜锈色
        'oracle-accent': '#A1887F',    // 浅褐色 - 古陶色
        'oracle-gold': '#B8860B',      // 暗金色 - 古铜器色
        'oracle-light': '#EFEBE9',     // 古纸色 - 羊皮纸色
        'oracle-bg': '#F5F5DC',        // 米色 - 古卷轴色
        'oracle-surface': '#FFF8E1',   // 象牙白 - 古绢色
        'oracle-text': '#2E1A0F',      // 深棕黑 - 古墨色
        'oracle-border': '#795548',    // 赭石色 - 古印泥色
        'oracle-muted': '#BCAAA4',     // 灰褐色 - 古石色
        
        // 保留原有颜色以兼容
        'ink-black': '#2E1A0F',        // 更新为古墨色
        'bone-white': '#FFF8E1',       // 更新为古绢色
        'cinnabar-red': '#B8860B',     // 更新为古金色
        'elegant-gray': '#BCAAA4',     // 更新为古石色
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
      fontFamily: {
        heading: ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif'], // 古朴标题字体
        sans: ['"Noto Sans SC"', '"Source Han Sans CN"', 'sans-serif'], // 现代正文字体
        oracle: ['"Noto Serif SC"', '"Source Han Serif CN"', 'serif'], // 甲骨文专用字体
      },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
