/**
 * 💎 Omni Tools - 120 ELITE TOOLS! 💎
 * 
 * BATCH 1-6: 110 tools across all categories
 * BATCH 7 (10 tools): Base64 + URL + JWT + Color Blindness + TTS + Invoice + Age + Hash + Typing + Gradient
 */

class OmniTools {
    constructor() {
        this.tools = this.initTools();
        this.currentTool = null;
        this.init();
    }

    init() {
        this.renderGrid();

        const search = document.getElementById('search');
        let timeout;
        search.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.renderGrid(e.target.value), 150);
        });

        document.getElementById('back-btn').addEventListener('click', () => this.closeToolView());
    }

    initTools() {
        return {
            wordCounter: {
                name: "Word Counter",
                searchTerms: "word count character letter text",
                description: "Count words, characters, and reading time",
                icon: "📝",
                category: "Text",
                render: () => this.renderWordCounter()
            },
            calculator: {
                name: "Calculator",
                searchTerms: "calc math calculate percentage percent",
                description: "Basic calculator and percentage calculations",
                icon: "🔢",
                category: "Math",
                render: () => this.renderCalculator()
            },
            bmi: {
                name: "BMI Calculator",
                searchTerms: "bmi body mass index health weight",
                description: "Calculate your Body Mass Index",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderBMI()
            },
            caseConverter: {
                name: "Case Converter",
                searchTerms: "uppercase lowercase title case text transform",
                description: "Convert text between different cases",
                icon: "🔠",
                category: "Text",
                render: () => this.renderCaseConverter()
            },
            passwordGenerator: {
                name: "Password Generator",
                searchTerms: "password generator random secure",
                description: "Generate secure random passwords",
                icon: "🔐",
                category: "Security",
                render: () => this.renderPasswordGenerator()
            },
            colorPicker: {
                name: "Color Picker",
                searchTerms: "color picker hex rgb palette",
                description: "Pick and convert colors between formats",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorPicker()
            },
            base64: {
                name: "Base64 Encoder",
                searchTerms: "base64 encode decode convert",
                description: "Encode and decode Base64 strings",
                icon: "💾",
                category: "Developer",
                render: () => this.renderBase64()
            },
            jsonFormatter: {
                name: "JSON Formatter",
                searchTerms: "json format validate pretty print",
                description: "Format and validate JSON data",
                icon: "{ }",
                category: "Developer",
                render: () => this.renderJSON()
            },
            urlEncoder: {
                name: "URL Encoder",
                searchTerms: "url encode decode uri",
                description: "Encode and decode URLs",
                icon: "🔗",
                category: "Developer",
                render: () => this.renderURLEncoder()
            },
            markdown: {
                name: "Markdown Preview",
                searchTerms: "markdown preview md",
                description: "Preview markdown formatting",
                icon: "📄",
                category: "Text",
                render: () => this.renderMarkdown()
            },
            // === CALCULATORS (8) ===
            tipCalculator: {
                name: "Tip Calculator",
                searchTerms: "tip gratuity restaurant bill split",
                description: "Calculate tips and split bills",
                icon: "💰",
                category: "Calculator",
                render: () => this.renderTipCalculator()
            },
            loanCalculator: {
                name: "Loan Calculator",
                searchTerms: "loan payment interest monthly emi",
                description: "Calculate loan payments and interest",
                icon: "🏦",
                category: "Calculator",
                render: () => this.renderLoanCalculator()
            },
            ageCalculator: {
                name: "Age Calculator",
                searchTerms: "age birthday years old date",
                description: "Calculate exact age from birthdate",
                icon: "🎂",
                category: "Calculator",
                render: () => this.renderAgeCalculator()
            },
            discountCalculator: {
                name: "Discount Calculator",
                searchTerms: "discount sale price savings percentage",
                description: "Calculate discounted prices",
                icon: "🏷️",
                category: "Calculator",
                render: () => this.renderDiscountCalculator()
            },
            compoundInterest: {
                name: "Compound Interest",
                searchTerms: "compound interest investment savings growth",
                description: "Calculate compound interest growth",
                icon: "📈",
                category: "Calculator",
                render: () => this.renderCompoundInterest()
            },
            percentageChange: {
                name: "Percentage Change",
                searchTerms: "percentage change increase decrease difference",
                description: "Calculate percentage increase/decrease",
                icon: "📊",
                category: "Calculator",
                render: () => this.renderPercentageChange()
            },
            taxCalculator: {
                name: "Tax Calculator",
                searchTerms: "tax vat gst sales calculate",
                description: "Calculate tax on amounts",
                icon: "🧾",
                category: "Calculator",
                render: () => this.renderTaxCalculator()
            },
            mortgageCalculator: {
                name: "Mortgage Calculator",
                searchTerms: "mortgage home loan payment monthly",
                description: "Calculate mortgage payments",
                icon: "🏠",
                category: "Calculator",
                render: () => this.renderMortgageCalculator()
            },
            // === CONVERTERS (6) ===
            temperatureConverter: {
                name: "Temperature Converter",
                searchTerms: "temperature celsius fahrenheit kelvin convert",
                description: "Convert between temperature units",
                icon: "🌡️",
                category: "Converter",
                render: () => this.renderTemperatureConverter()
            },
            lengthConverter: {
                name: "Length Converter",
                searchTerms: "length distance meter feet inch cm convert",
                description: "Convert between length units",
                icon: "📏",
                category: "Converter",
                render: () => this.renderLengthConverter()
            },
            weightConverter: {
                name: "Weight Converter",
                searchTerms: "weight mass kg pound gram convert",
                description: "Convert between weight units",
                icon: "⚖️",
                category: "Converter",
                render: () => this.renderWeightConverter()
            },
            currencyConverter: {
                name: "Currency Converter",
                searchTerms: "currency money exchange rate convert usd eur",
                description: "Convert between currencies",
                icon: "💱",
                category: "Converter",
                render: () => this.renderCurrencyConverter()
            },
            timeZoneConverter: {
                name: "Time Zone Converter",
                searchTerms: "time zone timezone convert world clock",
                description: "Convert between time zones",
                icon: "🌍",
                category: "Converter",
                render: () => this.renderTimeZoneConverter()
            },
            speedConverter: {
                name: "Speed Converter",
                searchTerms: "speed velocity kmh mph convert",
                description: "Convert between speed units",
                icon: "🚀",
                category: "Converter",
                render: () => this.renderSpeedConverter()
            },
            // === TEXT TOOLS (6) ===
            textReverse: {
                name: "Text Reverser",
                searchTerms: "reverse text backwards flip",
                description: "Reverse text or words",
                icon: "🔄",
                category: "Text",
                render: () => this.renderTextReverse()
            },
            textSort: {
                name: "Text Sorter",
                searchTerms: "sort lines alphabetical order text",
                description: "Sort lines alphabetically",
                icon: "🔤",
                category: "Text",
                render: () => this.renderTextSort()
            },
            findReplace: {
                name: "Find & Replace",
                searchTerms: "find replace search text substitute",
                description: "Find and replace text",
                icon: "🔍",
                category: "Text",
                render: () => this.renderFindReplace()
            },
            duplicateRemover: {
                name: "Duplicate Remover",
                searchTerms: "duplicate remove unique lines filter",
                description: "Remove duplicate lines",
                icon: "🗑️",
                category: "Text",
                render: () => this.renderDuplicateRemover()
            },
            lineCounter: {
                name: "Line Counter",
                searchTerms: "line count number text rows",
                description: "Count lines and analyze text",
                icon: "🔢",
                category: "Text",
                render: () => this.renderLineCounter()
            },
            textDiff: {
                name: "Text Diff",
                searchTerms: "diff compare difference text changes",
                description: "Compare two texts",
                icon: "⚡",
                category: "Text",
                render: () => this.renderTextDiff()
            },
            // === DEVELOPER TOOLS (5) ===
            uuidGenerator: {
                name: "UUID Generator",
                searchTerms: "uuid guid unique identifier generate",
                description: "Generate UUIDs/GUIDs",
                icon: "🆔",
                category: "Developer",
                render: () => this.renderUUIDGenerator()
            },
            hashGenerator: {
                name: "Hash Generator",
                searchTerms: "hash md5 sha256 sha1 checksum",
                description: "Generate hash values (MD5, SHA)",
                icon: "🔐",
                category: "Developer",
                render: () => this.renderHashGenerator()
            },
            regexTester: {
                name: "Regex Tester",
                searchTerms: "regex regular expression test pattern match",
                description: "Test regular expressions",
                icon: "🔍",
                category: "Developer",
                render: () => this.renderRegexTester()
            },
            htmlEncoder: {
                name: "HTML Encoder",
                searchTerms: "html encode decode entities escape",
                description: "Encode/decode HTML entities",
                icon: "🌐",
                category: "Developer",
                render: () => this.renderHTMLEncoder()
            },
            timestampConverter: {
                name: "Timestamp Converter",
                searchTerms: "timestamp unix epoch time convert date",
                description: "Convert Unix timestamps",
                icon: "⏰",
                category: "Developer",
                render: () => this.renderTimestampConverter()
            },
            // === FINANCE TOOLS (5) ===
            roiCalculator: {
                name: "ROI Calculator",
                searchTerms: "roi return investment profit calculate",
                description: "Calculate Return on Investment",
                icon: "💹",
                category: "Finance",
                render: () => this.renderROICalculator()
            },
            profitMargin: {
                name: "Profit Margin",
                searchTerms: "profit margin markup revenue cost",
                description: "Calculate profit margins",
                icon: "💵",
                category: "Finance",
                render: () => this.renderProfitMargin()
            },
            breakEven: {
                name: "Break-Even Calculator",
                searchTerms: "break even point cost revenue profit",
                description: "Calculate break-even point",
                icon: "⚖️",
                category: "Finance",
                render: () => this.renderBreakEven()
            },
            savingsGoal: {
                name: "Savings Goal",
                searchTerms: "savings goal target monthly deposit",
                description: "Calculate monthly savings needed",
                icon: "🎯",
                category: "Finance",
                render: () => this.renderSavingsGoal()
            },
            inflationCalculator: {
                name: "Inflation Calculator",
                searchTerms: "inflation purchasing power money value",
                description: "Calculate inflation impact",
                icon: "📉",
                category: "Finance",
                render: () => this.renderInflationCalculator()
            },
            // === UTILITY TOOLS (5) ===
            qrGenerator: {
                name: "QR Code Generator",
                searchTerms: "qr code generator barcode scan",
                description: "Generate QR codes from text",
                icon: "📱",
                category: "Utility",
                render: () => this.renderQRGenerator()
            },
            randomPicker: {
                name: "Random Picker",
                searchTerms: "random picker choice selector decide",
                description: "Pick random items from a list",
                icon: "🎲",
                category: "Utility",
                render: () => this.renderRandomPicker()
            },
            listRandomizer: {
                name: "List Randomizer",
                searchTerms: "shuffle randomize list order mix",
                description: "Shuffle/randomize lists",
                icon: "🔀",
                category: "Utility",
                render: () => this.renderListRandomizer()
            },
            numberGenerator: {
                name: "Random Number",
                searchTerms: "random number generator range lottery",
                description: "Generate random numbers",
                icon: "🔢",
                category: "Utility",
                render: () => this.renderNumberGenerator()
            },
            counterTimer: {
                name: "Counter & Timer",
                searchTerms: "counter timer stopwatch count",
                description: "Simple counter and timer",
                icon: "⏱️",
                category: "Utility",
                render: () => this.renderCounterTimer()
            },
            // === MORE CONVERTERS (5) ===
            dataSizeConverter: {
                name: "Data Size Converter",
                searchTerms: "data size bytes kb mb gb tb convert",
                description: "Convert data sizes",
                icon: "💾",
                category: "Converter",
                render: () => this.renderDataSizeConverter()
            },
            areaConverter: {
                name: "Area Converter",
                searchTerms: "area square meter feet acre hectare convert",
                description: "Convert area units",
                icon: "📐",
                category: "Converter",
                render: () => this.renderAreaConverter()
            },
            volumeConverter: {
                name: "Volume Converter",
                searchTerms: "volume liter gallon cubic meter convert",
                description: "Convert volume units",
                icon: "🧪",
                category: "Converter",
                render: () => this.renderVolumeConverter()
            },
            pressureConverter: {
                name: "Pressure Converter",
                searchTerms: "pressure psi bar pascal atm convert",
                description: "Convert pressure units",
                icon: "🌪️",
                category: "Converter",
                render: () => this.renderPressureConverter()
            },
            energyConverter: {
                name: "Energy Converter",
                searchTerms: "energy joule calorie watt convert",
                description: "Convert energy units",
                icon: "⚡",
                category: "Converter",
                render: () => this.renderEnergyConverter()
            },
            // === HEALTH & FITNESS TOOLS (5) ===
            calorieCalculator: {
                name: "Calorie Calculator",
                searchTerms: "calorie bmr tdee daily energy expenditure",
                description: "Calculate daily calorie needs",
                icon: "🍎",
                category: "Health",
                render: () => this.renderCalorieCalculator()
            },
            macroCalculator: {
                name: "Macro Calculator",
                searchTerms: "macro protein carbs fat nutrition diet",
                description: "Calculate macronutrient ratios",
                icon: "🥗",
                category: "Health",
                render: () => this.renderMacroCalculator()
            },
            waterIntake: {
                name: "Water Intake",
                searchTerms: "water hydration intake daily recommended",
                description: "Calculate daily water needs",
                icon: "💧",
                category: "Health",
                render: () => this.renderWaterIntake()
            },
            bodyFat: {
                name: "Body Fat Calculator",
                searchTerms: "body fat percentage lean mass calculator",
                description: "Estimate body fat percentage",
                icon: "📊",
                category: "Health",
                render: () => this.renderBodyFat()
            },
            idealWeight: {
                name: "Ideal Weight",
                searchTerms: "ideal weight healthy bmi target",
                description: "Calculate ideal body weight",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderIdealWeight()
            },
            // === DATE & TIME TOOLS (5) ===
            dateDifference: {
                name: "Date Difference",
                searchTerms: "date difference calculator days between",
                description: "Calculate days between dates",
                icon: "📅",
                category: "Date & Time",
                render: () => this.renderDateDifference()
            },
            dateAdd: {
                name: "Date Calculator",
                searchTerms: "date add subtract calculator future past",
                description: "Add/subtract days from date",
                icon: "📆",
                category: "Date & Time",
                render: () => this.renderDateAdd()
            },
            weekNumber: {
                name: "Week Number",
                searchTerms: "week number year calendar iso",
                description: "Get week number of year",
                icon: "📋",
                category: "Date & Time",
                render: () => this.renderWeekNumber()
            },
            workdayCalculator: {
                name: "Workday Calculator",
                searchTerms: "workday business days calculator exclude weekends",
                description: "Calculate business days",
                icon: "💼",
                category: "Date & Time",
                render: () => this.renderWorkdayCalculator()
            },
            timeUntil: {
                name: "Countdown Timer",
                searchTerms: "countdown timer time until event",
                description: "Time until a specific date",
                icon: "⏳",
                category: "Date & Time",
                render: () => this.renderTimeUntil()
            },
            // === IMAGE & COLOR TOOLS (5) ===
            colorMixer: {
                name: "Color Mixer",
                searchTerms: "color mixer blend combine rgb",
                description: "Mix two colors together",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorMixer()
            },
            gradientGenerator: {
                name: "Gradient Generator",
                searchTerms: "gradient generator css linear color",
                description: "Create CSS gradients",
                icon: "🌈",
                category: "Design",
                render: () => this.renderGradientGenerator()
            },
            contrastChecker: {
                name: "Contrast Checker",
                searchTerms: "contrast checker accessibility wcag color",
                description: "Check color contrast ratio",
                icon: "👁️",
                category: "Design",
                render: () => this.renderContrastChecker()
            },
            colorShades: {
                name: "Color Shades",
                searchTerms: "color shades tints palette generator",
                description: "Generate color shades/tints",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorShades()
            },
            imageResizer: {
                name: "Image Size Calculator",
                searchTerms: "image resize calculator aspect ratio dimensions",
                description: "Calculate image dimensions",
                icon: "🖼️",
                category: "Design",
                render: () => this.renderImageResizer()
            },
            // === MATH & SCIENCE TOOLS (5) ===
            fractionCalculator: {
                name: "Fraction Calculator",
                searchTerms: "fraction calculator add subtract multiply divide",
                description: "Calculate with fractions",
                icon: "➗",
                category: "Math",
                render: () => this.renderFractionCalculator()
            },
            scientificCalculator: {
                name: "Scientific Calculator",
                searchTerms: "scientific calculator math functions sqrt log",
                description: "Advanced math calculations",
                icon: "🔬",
                category: "Math",
                render: () => this.renderScientificCalculator()
            },
            statisticsCalculator: {
                name: "Statistics Calculator",
                searchTerms: "statistics mean median mode average std dev",
                description: "Calculate statistics",
                icon: "📊",
                category: "Math",
                render: () => this.renderStatisticsCalculator()
            },
            numberBase: {
                name: "Number Base Converter",
                searchTerms: "number base binary hex decimal octal convert",
                description: "Convert number bases",
                icon: "🔢",
                category: "Math",
                render: () => this.renderNumberBase()
            },
            unitCircle: {
                name: "Angle Converter",
                searchTerms: "angle degrees radians convert trigonometry",
                description: "Convert angle units",
                icon: "📐",
                category: "Math",
                render: () => this.renderAngleConverter()
            },
            // === PRODUCTIVITY TOOLS (5) ===
            pomodoroTimer: {
                name: "Pomodoro Timer",
                searchTerms: "pomodoro timer productivity focus work break",
                description: "Productivity timer with breaks",
                icon: "🍅",
                category: "Productivity",
                render: () => this.renderPomodoroTimer()
            },
            notepad: {
                name: "Quick Notepad",
                searchTerms: "notepad notes text editor quick",
                description: "Quick text notepad",
                icon: "📝",
                category: "Productivity",
                render: () => this.renderNotepad()
            },
            todoList: {
                name: "Todo List",
                searchTerms: "todo list tasks checklist productivity",
                description: "Simple todo list manager",
                icon: "✅",
                category: "Productivity",
                render: () => this.renderTodoList()
            },
            wordGoal: {
                name: "Writing Goal Tracker",
                searchTerms: "writing goal words tracker progress",
                description: "Track writing progress",
                icon: "✍️",
                category: "Productivity",
                render: () => this.renderWordGoal()
            },
            readingTime: {
                name: "Reading Time Estimator",
                searchTerms: "reading time estimate words per minute",
                description: "Estimate reading time",
                icon: "📖",
                category: "Productivity",
                render: () => this.renderReadingTime()
            },
            // === NETWORK/WEB TOOLS (5) ===
            ipInfo: {
                name: "IP Address Info",
                searchTerms: "ip address info network location",
                description: "Show your IP information",
                icon: "🌐",
                category: "Network",
                render: () => this.renderIPInfo()
            },
            userAgent: {
                name: "User Agent Parser",
                searchTerms: "user agent browser device parser",
                description: "Parse user agent strings",
                icon: "🖥️",
                category: "Network",
                render: () => this.renderUserAgent()
            },
            dnsLookup: {
                name: "DNS Lookup",
                searchTerms: "dns lookup domain ip address",
                description: "DNS information tool",
                icon: "🔍",
                category: "Network",
                render: () => this.renderDNSLookup()
            },
            portChecker: {
                name: "Port Information",
                searchTerms: "port number service common ports",
                description: "Common port reference",
                icon: "🔌",
                category: "Network",
                render: () => this.renderPortChecker()
            },
            httpStatus: {
                name: "HTTP Status Codes",
                searchTerms: "http status codes error reference",
                description: "HTTP status code reference",
                icon: "📡",
                category: "Network",
                render: () => this.renderHTTPStatus()
            },
            // === SPECIALIZED TOOLS (5) ===
            binaryText: {
                name: "Binary Text Converter",
                searchTerms: "binary text convert ascii encode decode",
                description: "Convert text to/from binary",
                icon: "💻",
                category: "Developer",
                render: () => this.renderBinaryText()
            },
            morseCode: {
                name: "Morse Code Translator",
                searchTerms: "morse code translator encode decode",
                description: "Translate morse code",
                icon: "📻",
                category: "Utility",
                render: () => this.renderMorseCode()
            },
            romanNumerals: {
                name: "Roman Numerals",
                searchTerms: "roman numerals convert number",
                description: "Convert to/from Roman numerals",
                icon: "🏛️",
                category: "Math",
                render: () => this.renderRomanNumerals()
            },
            emojiPicker: {
                name: "Emoji Picker",
                searchTerms: "emoji picker symbols emoticons",
                description: "Browse and copy emojis",
                icon: "😀",
                category: "Utility",
                render: () => this.renderEmojiPicker()
            },
            letterCounter: {
                name: "Letter Frequency",
                searchTerms: "letter frequency count analysis text",
                description: "Analyze letter frequency",
                icon: "🔤",
                category: "Text",
                render: () => this.renderLetterCounter()
            },
            // === FINAL BATCH - MISCELLANEOUS TOOLS (15) ===
            passwordStrength: {
                name: "Password Strength",
                searchTerms: "password strength checker security test",
                description: "Check password strength",
                icon: "🔒",
                category: "Utility",
                render: () => this.renderPasswordStrength()
            },
            passwordGenerator: {
                name: "Password Generator",
                searchTerms: "password generator random secure create",
                description: "Generate secure passwords",
                icon: "🔑",
                category: "Utility",
                render: () => this.renderPasswordGenerator()
            },
            loremIpsum: {
                name: "Lorem Ipsum Generator",
                searchTerms: "lorem ipsum placeholder text generator",
                description: "Generate placeholder text",
                icon: "📄",
                category: "Text",
                render: () => this.renderLoremIpsum()
            },
            csvToJson: {
                name: "CSV to JSON",
                searchTerms: "csv json convert parser data",
                description: "Convert CSV to JSON",
                icon: "📊",
                category: "Developer",
                render: () => this.renderCSVToJSON()
            },
            jsonFormatter: {
                name: "JSON Formatter",
                searchTerms: "json formatter beautify pretty print",
                description: "Format and validate JSON",
                icon: "{ }",
                category: "Developer",
                render: () => this.renderJSONFormatter()
            },
            slugGenerator: {
                name: "Slug Generator",
                searchTerms: "slug url generator seo friendly",
                description: "Generate URL-friendly slugs",
                icon: "🔗",
                category: "Developer",
                render: () => this.renderSlugGenerator()
            },
            creditCard: {
                name: "Credit Card Validator",
                searchTerms: "credit card validator luhn check",
                description: "Validate credit card numbers",
                icon: "💳",
                category: "Utility",
                render: () => this.renderCreditCard()
            },
            ibanValidator: {
                name: "IBAN Validator",
                searchTerms: "iban validator bank account international",
                description: "Validate IBAN numbers",
                icon: "🏦",
                category: "Finance",
                render: () => this.renderIBANValidator()
            },
            colorPalette: {
                name: "Color Palette Generator",
                searchTerms: "color palette generator scheme harmony",
                description: "Generate color palettes",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorPalette()
            },
            imageToDataURL: {
                name: "Image to Data URL",
                searchTerms: "image data url base64 convert",
                description: "Convert image to Data URL",
                icon: "🖼️",
                category: "Developer",
                render: () => this.renderImageToDataURL()
            },
            cronExpression: {
                name: "Cron Expression Helper",
                searchTerms: "cron expression scheduler helper",
                description: "Build cron expressions",
                icon: "⏰",
                category: "Developer",
                render: () => this.renderCronExpression()
            },
            unitConverter: {
                name: "Universal Unit Converter",
                searchTerms: "unit converter universal all measurement",
                description: "Convert various units",
                icon: "🔄",
                category: "Converter",
                render: () => this.renderUnitConverter()
            },
            textCase: {
                name: "Text Case Converter",
                searchTerms: "text case upper lower title camel snake",
                description: "Convert text case styles",
                icon: "Aa",
                category: "Text",
                render: () => this.renderTextCase()
            },
            wordScrambler: {
                name: "Word Scrambler",
                searchTerms: "word scrambler shuffle anagram game",
                description: "Scramble words and text",
                icon: "🔀",
                category: "Utility",
                render: () => this.renderWordScrambler()
            },
            diceRoller: {
                name: "Dice Roller",
                searchTerms: "dice roller random d20 d6 game",
                description: "Roll virtual dice",
                icon: "🎲",
                category: "Utility",
                render: () => this.renderDiceRoller()
            },
            // === BATCH 6 - PREMIUM TOOLS (10) ===
            markdownPreview: {
                name: "Markdown Preview",
                searchTerms: "markdown preview render html converter",
                description: "Preview Markdown in real-time",
                icon: "📝",
                category: "Developer",
                render: () => this.renderMarkdownPreview()
            },
            regexTester: {
                name: "Advanced Regex Tester",
                searchTerms: "regex regular expression tester matcher",
                description: "Test regex with matches",
                icon: "🔍",
                category: "Developer",
                render: () => this.renderRegexTester()
            },
            colorConverter: {
                name: "Color Format Converter",
                searchTerms: "color hex rgb hsl convert format",
                description: "Convert color formats",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorConverter()
            },
            sqlFormatter: {
                name: "SQL Formatter",
                searchTerms: "sql format beautify query database",
                description: "Format SQL queries",
                icon: "🗄️",
                category: "Developer",
                render: () => this.renderSQLFormatter()
            },
            imageCompressor: {
                name: "Image Quality Adjuster",
                searchTerms: "image compress quality resize optimize",
                description: "Adjust image quality",
                icon: "🖼️",
                category: "Utility",
                render: () => this.renderImageCompressor()
            },
            stopwatch: {
                name: "Stopwatch & Lap Timer",
                searchTerms: "stopwatch timer lap chronometer",
                description: "Precision stopwatch",
                icon: "⏱️",
                category: "Utility",
                render: () => this.renderStopwatch()
            },
            bmiCalculator: {
                name: "Advanced BMI Calculator",
                searchTerms: "bmi body mass index health calculator",
                description: "Calculate BMI with categories",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderBMICalculator()
            },
            currencyFormatter: {
                name: "Currency Formatter",
                searchTerms: "currency format money number locale",
                description: "Format currency values",
                icon: "💵",
                category: "Finance",
                render: () => this.renderCurrencyFormatter()
            },
            textDiff: {
                name: "Advanced Text Diff",
                searchTerms: "text diff compare difference changes",
                description: "Compare text differences",
                icon: "🔄",
                category: "Text",
                render: () => this.renderTextDiff()
            },
            unicodeExplorer: {
                name: "Unicode Character Explorer",
                searchTerms: "unicode character code point explorer",
                description: "Explore Unicode characters",
                icon: "🔤",
                category: "Developer",
                render: () => this.renderUnicodeExplorer()
            },
            // === BATCH 7 - ELITE TOOLS (10) ===
            base64Tool: {
                name: "Base64 Encoder/Decoder",
                searchTerms: "base64 encode decode converter",
                description: "Encode/decode Base64",
                icon: "🔐",
                category: "Developer",
                render: () => this.renderBase64Tool()
            },
            urlEncoder: {
                name: "URL Encoder/Decoder",
                searchTerms: "url encode decode uri percent",
                description: "Encode/decode URLs",
                icon: "🔗",
                category: "Developer",
                render: () => this.renderURLEncoder()
            },
            jwtDecoder: {
                name: "JWT Decoder",
                searchTerms: "jwt json web token decoder parser",
                description: "Decode JWT tokens",
                icon: "🎫",
                category: "Developer",
                render: () => this.renderJWTDecoder()
            },
            colorBlindness: {
                name: "Color Blindness Simulator",
                searchTerms: "color blindness simulator accessibility",
                description: "Simulate color blindness",
                icon: "👁️",
                category: "Design",
                render: () => this.renderColorBlindness()
            },
            textToSpeech: {
                name: "Text to Speech",
                searchTerms: "text to speech tts voice read",
                description: "Convert text to speech",
                icon: "🔊",
                category: "Utility",
                render: () => this.renderTextToSpeech()
            },
            invoiceCalculator: {
                name: "Invoice Calculator",
                searchTerms: "invoice calculator billing total tax",
                description: "Calculate invoice totals",
                icon: "🧾",
                category: "Finance",
                render: () => this.renderInvoiceCalculator()
            },
            ageInDays: {
                name: "Age in Days Calculator",
                searchTerms: "age days hours minutes calculator",
                description: "Calculate exact age",
                icon: "📅",
                category: "Date",
                render: () => this.renderAgeInDays()
            },
            fileHashGenerator: {
                name: "File Hash Generator",
                searchTerms: "file hash checksum md5 sha integrity",
                description: "Generate file hashes",
                icon: "🔏",
                category: "Developer",
                render: () => this.renderFileHashGenerator()
            },
            speedTest: {
                name: "Typing Speed Test",
                searchTerms: "typing speed test wpm words per minute",
                description: "Test typing speed",
                icon: "⌨️",
                category: "Utility",
                render: () => this.renderSpeedTest()
            },
            gradientText: {
                name: "Gradient Text Generator",
                searchTerms: "gradient text css generator color",
                description: "Create gradient text CSS",
                icon: "🌈",
                category: "Design",
                render: () => this.renderGradientText()
            }
        };
    }

    renderGrid(filter = '') {
        const grid = document.getElementById('grid');
        grid.innerHTML = '';

        const f = filter.toLowerCase().trim();
        let count = 0;

        Object.entries(this.tools).forEach(([id, tool]) => {
            if (f) {
                const searchable = `${tool.name} ${tool.searchTerms} ${tool.description} ${tool.category}`.toLowerCase();
                if (!searchable.includes(f)) return;
            }

            count++;
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => this.openTool(id);

            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <div class="card-category">${tool.category}</div>
                        <div class="card-title">${tool.name}</div>
                    </div>
                    <div class="card-icon">${tool.icon}</div>
                </div>
                <div class="card-desc">${tool.description}</div>
            `;

            grid.appendChild(card);
        });

        if (count === 0) {
            grid.innerHTML = '<p style="color: #666; text-align: center; padding: 40px;">No tools found. Try a different search.</p>';
        }
    }

    openTool(id) {
        const tool = this.tools[id];
        if (!tool) return;

        this.currentTool = id;
        document.getElementById('tool-view').classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            tool.render();
        } catch (error) {
            console.error('Tool render error:', error);
            document.getElementById('tool-content').innerHTML = `
                <div class="result" style="border-color: #f00; color: #f00;">
                    Error loading tool. Please try again.
                </div>
            `;
        }
    }

    closeToolView() {
        document.getElementById('tool-view').classList.remove('active');
        document.body.style.overflow = 'auto';
        this.currentTool = null;
    }

    // === TOOL RENDERERS ===

    renderWordCounter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Word Counter</h2>
            <textarea id="text-input" rows="10" placeholder="Paste or type your text here..."></textarea>
            <div class="result">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="word-count">0</div>
                        <div style="font-size: 12px; color: #666;">WORDS</div>
                    </div>
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="char-count">0</div>
                        <div style="font-size: 12px; color: #666;">CHARACTERS</div>
                    </div>
                    <div>
                        <div style="font-size: 32px; font-weight: bold;" id="read-time">0</div>
                        <div style="font-size: 12px; color: #666;">MIN READ</div>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('text-input');
        input.addEventListener('input', () => {
            const text = input.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            const readTime = Math.ceil(words / 200);

            document.getElementById('word-count').textContent = words;
            document.getElementById('char-count').textContent = chars;
            document.getElementById('read-time').textContent = readTime;
        });
    }

    renderCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Calculator</h2>
            <div style="margin-bottom: 30px;">
                <h3 style="margin-bottom: 15px;">Percentage Calculator</h3>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <span>What is</span>
                    <input type="number" id="percent" style="width: 100px;" placeholder="10">
                    <span>% of</span>
                    <input type="number" id="value" style="width: 120px;" placeholder="100">
                    <span>?</span>
                </div>
                <div class="result" id="calc-result">0</div>
            </div>
        `;

        const calc = () => {
            const percent = parseFloat(document.getElementById('percent').value) || 0;
            const value = parseFloat(document.getElementById('value').value) || 0;
            const result = (percent / 100) * value;
            document.getElementById('calc-result').textContent = result.toFixed(2);
        };

        document.getElementById('percent').addEventListener('input', calc);
        document.getElementById('value').addEventListener('input', calc);
    }

    renderBMI() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">BMI Calculator</h2>
            <input type="number" id="weight" placeholder="Weight (kg)" step="0.1">
            <input type="number" id="height" placeholder="Height (cm)" step="0.1">
            <button id="calc-bmi">Calculate BMI</button>
            <div class="result" id="bmi-result" style="display: none;"></div>
        `;

        document.getElementById('calc-bmi').addEventListener('click', () => {
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value) / 100;

            if (!weight || !height) {
                alert('Please enter both weight and height');
                return;
            }

            const bmi = weight / (height * height);
            let category = '';

            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';

            const result = document.getElementById('bmi-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;">${bmi.toFixed(1)}</div>
                <div style="font-size: 18px; color: #999;">${category}</div>
            `;
        });
    }

    renderCaseConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Case Converter</h2>
            <textarea id="case-input" rows="6" placeholder="Enter text to convert..."></textarea>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 20px;">
                <button id="upper">UPPERCASE</button>
                <button id="lower">lowercase</button>
                <button id="title">Title Case</button>
                <button id="sentence">Sentence case</button>
            </div>
            <div class="result" id="case-output" style="min-height: 100px; text-align: left;"></div>
        `;

        const input = document.getElementById('case-input');
        const output = document.getElementById('case-output');

        document.getElementById('upper').onclick = () => output.textContent = input.value.toUpperCase();
        document.getElementById('lower').onclick = () => output.textContent = input.value.toLowerCase();
        document.getElementById('title').onclick = () => {
            output.textContent = input.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        };
        document.getElementById('sentence').onclick = () => {
            output.textContent = input.value.toLowerCase().replace(/(^\w|\.\s+\w)/g, l => l.toUpperCase());
        };
    }

    renderPasswordGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Password Generator</h2>
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px;">
                    Length: <span id="length-display">16</span>
                    <input type="range" id="length" min="8" max="64" value="16" style="width: 100%; margin-top: 10px;">
                </label>
            </div>
            <button id="generate">Generate Password</button>
            <div class="result" id="password" style="font-family: monospace; font-size: 20px; word-break: break-all; cursor: pointer;" title="Click to copy">
                Click generate
            </div>
        `;

        const lengthSlider = document.getElementById('length');
        const lengthDisplay = document.getElementById('length-display');

        lengthSlider.addEventListener('input', () => {
            lengthDisplay.textContent = lengthSlider.value;
        });

        document.getElementById('generate').addEventListener('click', () => {
            const length = parseInt(lengthSlider.value);
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
            let password = '';

            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const output = document.getElementById('password');
            output.textContent = password;

            output.onclick = () => {
                navigator.clipboard.writeText(password);
                output.style.borderColor = '#0f0';
                setTimeout(() => output.style.borderColor = '#333', 1000);
            };
        });
    }

    renderColorPicker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Picker</h2>
            <input type="color" id="color" value="#3b82f6" style="width: 100%; height: 100px; cursor: pointer;">
            <div class="result" id="color-values" style="text-align: left;"></div>
        `;

        const updateColor = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);

            document.getElementById('color-values').innerHTML = `
                <div style="margin-bottom: 10px;"><strong>HEX:</strong> ${hex.toUpperCase()}</div>
                <div style="margin-bottom: 10px;"><strong>RGB:</strong> rgb(${r}, ${g}, ${b})</div>
                <div><strong>HSL:</strong> (calculated from RGB)</div>
            `;
        };

        document.getElementById('color').addEventListener('input', (e) => updateColor(e.target.value));
        updateColor('#3b82f6');
    }

    renderBase64() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Base64 Encoder/Decoder</h2>
            <textarea id="base64-input" rows="5" placeholder="Enter text or Base64..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="encode">Encode</button>
                <button id="decode">Decode</button>
            </div>
            <div class="result" id="base64-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('encode').onclick = () => {
            const input = document.getElementById('base64-input').value;
            try {
                document.getElementById('base64-output').textContent = btoa(input);
            } catch (e) {
                document.getElementById('base64-output').textContent = 'Error: Invalid input';
            }
        };

        document.getElementById('decode').onclick = () => {
            const input = document.getElementById('base64-input').value;
            try {
                document.getElementById('base64-output').textContent = atob(input);
            } catch (e) {
                document.getElementById('base64-output').textContent = 'Error: Invalid Base64';
            }
        };
    }

    renderJSON() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JSON Formatter</h2>
            <textarea id="json-input" rows="8" placeholder='{"key": "value"}'></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="format">Format</button>
                <button id="minify">Minify</button>
            </div>
            <div class="result" id="json-output" style="min-height: 150px; text-align: left; white-space: pre; font-family: monospace; font-size: 14px; overflow-x: auto;"></div>
        `;

        document.getElementById('format').onclick = () => {
            try {
                const input = document.getElementById('json-input').value;
                const parsed = JSON.parse(input);
                document.getElementById('json-output').textContent = JSON.stringify(parsed, null, 2);
            } catch (e) {
                document.getElementById('json-output').textContent = 'Error: ' + e.message;
            }
        };

        document.getElementById('minify').onclick = () => {
            try {
                const input = document.getElementById('json-input').value;
                const parsed = JSON.parse(input);
                document.getElementById('json-output').textContent = JSON.stringify(parsed);
            } catch (e) {
                document.getElementById('json-output').textContent = 'Error: ' + e.message;
            }
        };
    }

    renderURLEncoder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">URL Encoder/Decoder</h2>
            <textarea id="url-input" rows="5" placeholder="Enter URL or encoded string..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="url-encode">Encode</button>
                <button id="url-decode">Decode</button>
            </div>
            <div class="result" id="url-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('url-encode').onclick = () => {
            const input = document.getElementById('url-input').value;
            document.getElementById('url-output').textContent = encodeURIComponent(input);
        };

        document.getElementById('url-decode').onclick = () => {
            try {
                const input = document.getElementById('url-input').value;
                document.getElementById('url-output').textContent = decodeURIComponent(input);
            } catch (e) {
                document.getElementById('url-output').textContent = 'Error: Invalid encoded string';
            }
        };
    }

    renderMarkdown() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Markdown Preview</h2>
            <textarea id="md-input" rows="10" placeholder="# Heading\n\n**Bold** and *italic*\n\n- List item"></textarea>
            <div class="result" id="md-output" style="min-height: 200px; text-align: left;"></div>
        `;

        const input = document.getElementById('md-input');
        const output = document.getElementById('md-output');

        const simpleMarkdown = (text) => {
            return text
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*(.*)\*/gim, '<em>$1</em>')
                .replace(/^\- (.*$)/gim, '<li>$1</li>')
                .replace(/\n/gim, '<br>');
        };

        input.addEventListener('input', () => {
            output.innerHTML = simpleMarkdown(input.value);
        });
    }

    // === CALCULATOR RENDERERS ===

    renderTipCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Tip Calculator</h2>
            <input type="number" id="bill-amount" placeholder="Bill Amount" step="0.01">
            <div style="margin: 20px 0;">
                <label style="display: block; margin-bottom: 10px;">
                    Tip Percentage: <span id="tip-percent-display">15</span>%
                    <input type="range" id="tip-percent" min="0" max="30" value="15" style="width: 100%; margin-top: 10px;">
                </label>
            </div>
            <input type="number" id="split-people" placeholder="Split between (people)" min="1" value="1">
            <div class="result" id="tip-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">TIP AMOUNT</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tip-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">TOTAL</div>
                    <div style="font-size: 28px; font-weight: bold;" id="total-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">PER PERSON</div>
                    <div style="font-size: 28px; font-weight: bold;" id="per-person">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const bill = parseFloat(document.getElementById('bill-amount').value) || 0;
            const tipPercent = parseFloat(document.getElementById('tip-percent').value);
            const people = parseInt(document.getElementById('split-people').value) || 1;

            const tipAmount = bill * (tipPercent / 100);
            const total = bill + tipAmount;
            const perPerson = total / people;

            document.getElementById('tip-amount').textContent = `$${tipAmount.toFixed(2)}`;
            document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
            document.getElementById('per-person').textContent = `$${perPerson.toFixed(2)}`;
        };

        document.getElementById('tip-percent').addEventListener('input', (e) => {
            document.getElementById('tip-percent-display').textContent = e.target.value;
            calculate();
        });
        document.getElementById('bill-amount').addEventListener('input', calculate);
        document.getElementById('split-people').addEventListener('input', calculate);
    }

    renderLoanCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Loan Calculator</h2>
            <input type="number" id="loan-amount" placeholder="Loan Amount" step="1000">
            <input type="number" id="interest-rate" placeholder="Annual Interest Rate (%)" step="0.1">
            <input type="number" id="loan-term" placeholder="Loan Term (years)" step="1">
            <button id="calc-loan">Calculate</button>
            <div class="result" id="loan-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-loan').addEventListener('click', () => {
            const principal = parseFloat(document.getElementById('loan-amount').value);
            const annualRate = parseFloat(document.getElementById('interest-rate').value);
            const years = parseFloat(document.getElementById('loan-term').value);

            if (!principal || !annualRate || !years) {
                alert('Please fill all fields');
                return;
            }

            const monthlyRate = annualRate / 100 / 12;
            const numPayments = years * 12;
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - principal;

            const result = document.getElementById('loan-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Payment:</strong> $${totalPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest:</strong> $${totalInterest.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Based on ${numPayments} monthly payments
                </div>
            `;
        });
    }

    renderAgeCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Age Calculator</h2>
            <input type="date" id="birthdate" placeholder="Birthdate">
            <button id="calc-age">Calculate Age</button>
            <div class="result" id="age-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-age').addEventListener('click', () => {
            const birthdate = document.getElementById('birthdate').value;
            if (!birthdate) {
                alert('Please select a birthdate');
                return;
            }

            const birth = new Date(birthdate);
            const today = new Date();

            let years = today.getFullYear() - birth.getFullYear();
            let months = today.getMonth() - birth.getMonth();
            let days = today.getDate() - birth.getDate();

            if (days < 0) {
                months--;
                days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
            const totalWeeks = Math.floor(totalDays / 7);
            const totalMonths = years * 12 + months;

            const result = document.getElementById('age-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
                    ${years} years, ${months} months, ${days} days
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalMonths}</div>
                        <div style="font-size: 12px; color: #666;">Total Months</div>
                    </div>
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalWeeks}</div>
                        <div style="font-size: 12px; color: #666;">Total Weeks</div>
                    </div>
                    <div>
                        <div style="font-size: 20px; font-weight: bold;">${totalDays}</div>
                        <div style="font-size: 12px; color: #666;">Total Days</div>
                    </div>
                </div>
            `;
        });
    }

    renderDiscountCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Discount Calculator</h2>
            <input type="number" id="original-price" placeholder="Original Price" step="0.01">
            <input type="number" id="discount-percent" placeholder="Discount (%)" step="1">
            <div class="result" id="discount-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">FINAL PRICE</div>
                    <div style="font-size: 32px; font-weight: bold; color: #0f0;" id="final-price">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">YOU SAVE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="savings">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const original = parseFloat(document.getElementById('original-price').value) || 0;
            const discount = parseFloat(document.getElementById('discount-percent').value) || 0;

            const savings = original * (discount / 100);
            const finalPrice = original - savings;

            document.getElementById('final-price').textContent = `$${finalPrice.toFixed(2)}`;
            document.getElementById('savings').textContent = `$${savings.toFixed(2)}`;
        };

        document.getElementById('original-price').addEventListener('input', calculate);
        document.getElementById('discount-percent').addEventListener('input', calculate);
    }

    renderCompoundInterest() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Compound Interest Calculator</h2>
            <input type="number" id="principal" placeholder="Initial Investment" step="100">
            <input type="number" id="rate" placeholder="Annual Interest Rate (%)" step="0.1">
            <input type="number" id="time" placeholder="Time Period (years)" step="1">
            <input type="number" id="compound-freq" placeholder="Compounds per Year" value="12">
            <button id="calc-compound">Calculate</button>
            <div class="result" id="compound-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-compound').addEventListener('click', () => {
            const P = parseFloat(document.getElementById('principal').value);
            const r = parseFloat(document.getElementById('rate').value) / 100;
            const t = parseFloat(document.getElementById('time').value);
            const n = parseFloat(document.getElementById('compound-freq').value);

            if (!P || !r || !t || !n) {
                alert('Please fill all fields');
                return;
            }

            const A = P * Math.pow((1 + r / n), n * t);
            const interest = A - P;

            const result = document.getElementById('compound-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Final Amount:</strong> $${A.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest Earned:</strong> $${interest.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Initial: $${P.toFixed(2)} | Rate: ${(r * 100).toFixed(2)}% | Time: ${t} years
                </div>
            `;
        });
    }

    renderPercentageChange() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Percentage Change Calculator</h2>
            <input type="number" id="old-value" placeholder="Original Value" step="0.01">
            <input type="number" id="new-value" placeholder="New Value" step="0.01">
            <div class="result" id="change-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">CHANGE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="change-percent">0%</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">DIFFERENCE</div>
                    <div style="font-size: 32px; font-weight: bold;" id="change-diff">0</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const oldVal = parseFloat(document.getElementById('old-value').value) || 0;
            const newVal = parseFloat(document.getElementById('new-value').value) || 0;

            if (oldVal === 0) {
                document.getElementById('change-percent').textContent = 'N/A';
                document.getElementById('change-diff').textContent = '0';
                return;
            }

            const diff = newVal - oldVal;
            const percentChange = (diff / oldVal) * 100;

            const changeEl = document.getElementById('change-percent');
            changeEl.textContent = `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`;
            changeEl.style.color = percentChange > 0 ? '#0f0' : percentChange < 0 ? '#f00' : '#fff';

            document.getElementById('change-diff').textContent = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}`;
        };

        document.getElementById('old-value').addEventListener('input', calculate);
        document.getElementById('new-value').addEventListener('input', calculate);
    }

    renderTaxCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Tax Calculator</h2>
            <input type="number" id="amount" placeholder="Amount" step="0.01">
            <input type="number" id="tax-rate" placeholder="Tax Rate (%)" step="0.1" value="10">
            <div style="margin: 20px 0;">
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="tax-included">
                    <span>Tax is already included in amount</span>
                </label>
            </div>
            <div class="result" id="tax-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">TAX AMOUNT</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tax-amount">$0.00</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">TOTAL</div>
                    <div style="font-size: 28px; font-weight: bold;" id="tax-total">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const amount = parseFloat(document.getElementById('amount').value) || 0;
            const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const included = document.getElementById('tax-included').checked;

            let taxAmount, total;

            if (included) {
                // Tax is included, extract it
                taxAmount = amount - (amount / (1 + taxRate / 100));
                total = amount;
            } else {
                // Add tax to amount
                taxAmount = amount * (taxRate / 100);
                total = amount + taxAmount;
            }

            document.getElementById('tax-amount').textContent = `$${taxAmount.toFixed(2)}`;
            document.getElementById('tax-total').textContent = `$${total.toFixed(2)}`;
        };

        document.getElementById('amount').addEventListener('input', calculate);
        document.getElementById('tax-rate').addEventListener('input', calculate);
        document.getElementById('tax-included').addEventListener('change', calculate);
    }

    renderMortgageCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Mortgage Calculator</h2>
            <input type="number" id="home-price" placeholder="Home Price" step="1000">
            <input type="number" id="down-payment" placeholder="Down Payment" step="1000">
            <input type="number" id="mortgage-rate" placeholder="Interest Rate (%)" step="0.1">
            <input type="number" id="mortgage-term" placeholder="Loan Term (years)" value="30">
            <button id="calc-mortgage">Calculate</button>
            <div class="result" id="mortgage-result" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-mortgage').addEventListener('click', () => {
            const homePrice = parseFloat(document.getElementById('home-price').value);
            const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
            const annualRate = parseFloat(document.getElementById('mortgage-rate').value);
            const years = parseFloat(document.getElementById('mortgage-term').value);

            if (!homePrice || !annualRate || !years) {
                alert('Please fill required fields');
                return;
            }

            const principal = homePrice - downPayment;
            const monthlyRate = annualRate / 100 / 12;
            const numPayments = years * 12;
            const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
            const totalPayment = monthlyPayment * numPayments;
            const totalInterest = totalPayment - principal;

            const result = document.getElementById('mortgage-result');
            result.style.display = 'block';
            result.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Loan Amount:</strong> $${principal.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Interest:</strong> $${totalInterest.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Payment:</strong> $${totalPayment.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    ${numPayments} monthly payments at ${annualRate}% APR
                </div>
            `;
        });
    }

    // === CONVERTER RENDERERS ===

    renderTemperatureConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Temperature Converter</h2>
            <input type="number" id="temp-input" placeholder="Enter temperature" step="0.1">
            <select id="temp-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
            </select>
            <div class="result" id="temp-result" style="text-align: left;">
                <div style="margin-bottom: 10px;"><strong>Celsius:</strong> <span id="celsius">0</span> °C</div>
                <div style="margin-bottom: 10px;"><strong>Fahrenheit:</strong> <span id="fahrenheit">32</span> °F</div>
                <div><strong>Kelvin:</strong> <span id="kelvin">273.15</span> K</div>
            </div>
        `;

        const convert = () => {
            const value = parseFloat(document.getElementById('temp-input').value) || 0;
            const from = document.getElementById('temp-from').value;

            let celsius, fahrenheit, kelvin;

            if (from === 'celsius') {
                celsius = value;
                fahrenheit = (celsius * 9 / 5) + 32;
                kelvin = celsius + 273.15;
            } else if (from === 'fahrenheit') {
                fahrenheit = value;
                celsius = (fahrenheit - 32) * 5 / 9;
                kelvin = celsius + 273.15;
            } else {
                kelvin = value;
                celsius = kelvin - 273.15;
                fahrenheit = (celsius * 9 / 5) + 32;
            }

            document.getElementById('celsius').textContent = celsius.toFixed(2);
            document.getElementById('fahrenheit').textContent = fahrenheit.toFixed(2);
            document.getElementById('kelvin').textContent = kelvin.toFixed(2);
        };

        document.getElementById('temp-input').addEventListener('input', convert);
        document.getElementById('temp-from').addEventListener('change', convert);
    }

    renderLengthConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Length Converter</h2>
            <input type="number" id="length-input" placeholder="Enter length" step="0.01">
            <select id="length-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="meters">Meters</option>
                <option value="kilometers">Kilometers</option>
                <option value="centimeters">Centimeters</option>
                <option value="feet">Feet</option>
                <option value="inches">Inches</option>
                <option value="miles">Miles</option>
            </select>
            <div class="result" id="length-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Meters:</strong> <span id="meters">0</span></div>
                <div><strong>Kilometers:</strong> <span id="kilometers">0</span></div>
                <div><strong>Centimeters:</strong> <span id="centimeters">0</span></div>
                <div><strong>Feet:</strong> <span id="feet">0</span></div>
                <div><strong>Inches:</strong> <span id="inches">0</span></div>
                <div><strong>Miles:</strong> <span id="miles">0</span></div>
            </div>
        `;

        const conversions = {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            feet: 3.28084,
            inches: 39.3701,
            miles: 0.000621371
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('length-input').value) || 0;
            const from = document.getElementById('length-from').value;

            const meters = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = meters * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('length-input').addEventListener('input', convert);
        document.getElementById('length-from').addEventListener('change', convert);
    }

    renderWeightConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Weight Converter</h2>
            <input type="number" id="weight-input" placeholder="Enter weight" step="0.01">
            <select id="weight-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="kilograms">Kilograms</option>
                <option value="grams">Grams</option>
                <option value="pounds">Pounds</option>
                <option value="ounces">Ounces</option>
                <option value="tons">Metric Tons</option>
            </select>
            <div class="result" id="weight-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Kilograms:</strong> <span id="kilograms">0</span></div>
                <div><strong>Grams:</strong> <span id="grams">0</span></div>
                <div><strong>Pounds:</strong> <span id="pounds">0</span></div>
                <div><strong>Ounces:</strong> <span id="ounces">0</span></div>
                <div><strong>Metric Tons:</strong> <span id="tons">0</span></div>
            </div>
        `;

        const conversions = {
            kilograms: 1,
            grams: 1000,
            pounds: 2.20462,
            ounces: 35.274,
            tons: 0.001
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('weight-input').value) || 0;
            const from = document.getElementById('weight-from').value;

            const kilograms = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = kilograms * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('weight-input').addEventListener('input', convert);
        document.getElementById('weight-from').addEventListener('change', convert);
    }

    renderCurrencyConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Currency Converter</h2>
            <input type="number" id="currency-input" placeholder="Enter amount" step="0.01">
            <select id="currency-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
            </select>
            <select id="currency-to" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR" selected>EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
            </select>
            <div class="result" id="currency-result">
                <div style="font-size: 36px; font-weight: bold;" id="converted-amount">0.00</div>
                <div style="font-size: 12px; color: #666; margin-top: 10px;">
                    Using approximate exchange rates
                </div>
            </div>
        `;

        // Approximate rates relative to USD
        const rates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 149.50,
            INR: 83.12,
            CAD: 1.35,
            AUD: 1.52
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('currency-input').value) || 0;
            const from = document.getElementById('currency-from').value;
            const to = document.getElementById('currency-to').value;

            const usdValue = value / rates[from];
            const converted = usdValue * rates[to];

            document.getElementById('converted-amount').textContent =
                `${converted.toFixed(2)} ${to}`;
        };

        document.getElementById('currency-input').addEventListener('input', convert);
        document.getElementById('currency-from').addEventListener('change', convert);
        document.getElementById('currency-to').addEventListener('change', convert);
    }

    renderTimeZoneConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Time Zone Converter</h2>
            <input type="time" id="time-input" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
            <select id="tz-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="0">UTC (GMT+0)</option>
                <option value="-5">EST (GMT-5)</option>
                <option value="-8">PST (GMT-8)</option>
                <option value="1">CET (GMT+1)</option>
                <option value="5.5">IST (GMT+5:30)</option>
                <option value="8">CST (GMT+8)</option>
                <option value="9">JST (GMT+9)</option>
                <option value="10">AEST (GMT+10)</option>
            </select>
            <select id="tz-to" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="0">UTC (GMT+0)</option>
                <option value="-5">EST (GMT-5)</option>
                <option value="-8">PST (GMT-8)</option>
                <option value="1">CET (GMT+1)</option>
                <option value="5.5" selected>IST (GMT+5:30)</option>
                <option value="8">CST (GMT+8)</option>
                <option value="9">JST (GMT+9)</option>
                <option value="10">AEST (GMT+10)</option>
            </select>
            <div class="result" id="tz-result">
                <div style="font-size: 48px; font-weight: bold;" id="converted-time">--:--</div>
            </div>
        `;

        const convert = () => {
            const timeValue = document.getElementById('time-input').value;
            if (!timeValue) return;

            const [hours, minutes] = timeValue.split(':').map(Number);
            const fromTz = parseFloat(document.getElementById('tz-from').value);
            const toTz = parseFloat(document.getElementById('tz-to').value);

            const diff = toTz - fromTz;
            let newHours = hours + diff;
            let newMinutes = minutes;

            // Handle fractional timezone offsets (like IST +5:30)
            const fracHours = Math.floor(diff);
            const fracMinutes = (diff - fracHours) * 60;
            newMinutes += fracMinutes;

            if (newMinutes >= 60) {
                newHours += 1;
                newMinutes -= 60;
            } else if (newMinutes < 0) {
                newHours -= 1;
                newMinutes += 60;
            }

            if (newHours >= 24) newHours -= 24;
            if (newHours < 0) newHours += 24;

            const formatted = `${String(Math.floor(newHours)).padStart(2, '0')}:${String(Math.floor(newMinutes)).padStart(2, '0')}`;
            document.getElementById('converted-time').textContent = formatted;
        };

        document.getElementById('time-input').addEventListener('input', convert);
        document.getElementById('tz-from').addEventListener('change', convert);
        document.getElementById('tz-to').addEventListener('change', convert);

        // Set current time
        const now = new Date();
        document.getElementById('time-input').value =
            `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        convert();
    }

    renderSpeedConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Speed Converter</h2>
            <input type="number" id="speed-input" placeholder="Enter speed" step="0.01">
            <select id="speed-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="kmh">Kilometers per Hour (km/h)</option>
                <option value="mph">Miles per Hour (mph)</option>
                <option value="ms">Meters per Second (m/s)</option>
                <option value="knots">Knots</option>
            </select>
            <div class="result" id="speed-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>km/h:</strong> <span id="kmh">0</span></div>
                <div><strong>mph:</strong> <span id="mph">0</span></div>
                <div><strong>m/s:</strong> <span id="ms">0</span></div>
                <div><strong>Knots:</strong> <span id="knots">0</span></div>
            </div>
        `;

        const conversions = {
            kmh: 1,
            mph: 0.621371,
            ms: 0.277778,
            knots: 0.539957
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('speed-input').value) || 0;
            const from = document.getElementById('speed-from').value;

            const kmh = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = kmh * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('speed-input').addEventListener('input', convert);
        document.getElementById('speed-from').addEventListener('change', convert);
    }

    // === TEXT TOOL RENDERERS ===

    renderTextReverse() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Reverser</h2>
            <textarea id="reverse-input" rows="6" placeholder="Enter text to reverse..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="reverse-chars">Reverse Characters</button>
                <button id="reverse-words">Reverse Words</button>
            </div>
            <div class="result" id="reverse-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('reverse-chars').onclick = () => {
            const input = document.getElementById('reverse-input').value;
            document.getElementById('reverse-output').textContent = input.split('').reverse().join('');
        };

        document.getElementById('reverse-words').onclick = () => {
            const input = document.getElementById('reverse-input').value;
            document.getElementById('reverse-output').textContent = input.split(' ').reverse().join(' ');
        };
    }

    renderTextSort() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Sorter</h2>
            <textarea id="sort-input" rows="10" placeholder="Enter lines to sort (one per line)..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="sort-asc">Sort A-Z</button>
                <button id="sort-desc">Sort Z-A</button>
                <button id="sort-length">By Length</button>
            </div>
            <div class="result" id="sort-output" style="min-height: 150px; text-align: left; white-space: pre-wrap;"></div>
        `;

        document.getElementById('sort-asc').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent = lines.sort().join('\n');
        };

        document.getElementById('sort-desc').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent = lines.sort().reverse().join('\n');
        };

        document.getElementById('sort-length').onclick = () => {
            const input = document.getElementById('sort-input').value;
            const lines = input.split('\n').filter(l => l.trim());
            document.getElementById('sort-output').textContent =
                lines.sort((a, b) => a.length - b.length).join('\n');
        };
    }

    renderFindReplace() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Find & Replace</h2>
            <textarea id="fr-input" rows="6" placeholder="Enter text..."></textarea>
            <input type="text" id="find-text" placeholder="Find">
            <input type="text" id="replace-text" placeholder="Replace with">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="replace-first">Replace First</button>
                <button id="replace-all">Replace All</button>
            </div>
            <div class="result" id="fr-output" style="min-height: 100px; text-align: left; white-space: pre-wrap;"></div>
        `;

        document.getElementById('replace-first').onclick = () => {
            const input = document.getElementById('fr-input').value;
            const find = document.getElementById('find-text').value;
            const replace = document.getElementById('replace-text').value;

            if (!find) {
                alert('Please enter text to find');
                return;
            }

            document.getElementById('fr-output').textContent = input.replace(find, replace);
        };

        document.getElementById('replace-all').onclick = () => {
            const input = document.getElementById('fr-input').value;
            const find = document.getElementById('find-text').value;
            const replace = document.getElementById('replace-text').value;

            if (!find) {
                alert('Please enter text to find');
                return;
            }

            const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            document.getElementById('fr-output').textContent = input.replace(regex, replace);
        };
    }

    renderDuplicateRemover() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Duplicate Remover</h2>
            <textarea id="dup-input" rows="10" placeholder="Enter lines (duplicates will be removed)..."></textarea>
            <button id="remove-dups">Remove Duplicates</button>
            <div class="result" id="dup-output" style="min-height: 150px; text-align: left; white-space: pre-wrap;"></div>
            <div style="margin-top: 15px; font-size: 14px; color: #666;" id="dup-stats"></div>
        `;

        document.getElementById('remove-dups').onclick = () => {
            const input = document.getElementById('dup-input').value;
            const lines = input.split('\n');
            const originalCount = lines.length;
            const unique = [...new Set(lines)];
            const removed = originalCount - unique.length;

            document.getElementById('dup-output').textContent = unique.join('\n');
            document.getElementById('dup-stats').textContent =
                `Original: ${originalCount} lines | Unique: ${unique.length} lines | Removed: ${removed} duplicates`;
        };
    }

    renderLineCounter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Line Counter</h2>
            <textarea id="line-input" rows="10" placeholder="Enter or paste text..."></textarea>
            <div class="result" id="line-result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px;">
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="line-count">0</div>
                    <div style="font-size: 12px; color: #666;">LINES</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="non-empty">0</div>
                    <div style="font-size: 12px; color: #666;">NON-EMPTY</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="empty-lines">0</div>
                    <div style="font-size: 12px; color: #666;">EMPTY</div>
                </div>
            </div>
        `;

        const count = () => {
            const input = document.getElementById('line-input').value;
            const lines = input.split('\n');
            const totalLines = lines.length;
            const nonEmpty = lines.filter(l => l.trim()).length;
            const empty = totalLines - nonEmpty;

            document.getElementById('line-count').textContent = totalLines;
            document.getElementById('non-empty').textContent = nonEmpty;
            document.getElementById('empty-lines').textContent = empty;
        };

        document.getElementById('line-input').addEventListener('input', count);
    }

    renderTextDiff() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Diff</h2>
            <textarea id="diff-text1" rows="6" placeholder="Enter first text..."></textarea>
            <textarea id="diff-text2" rows="6" placeholder="Enter second text..."></textarea>
            <button id="compare-texts">Compare</button>
            <div class="result" id="diff-output" style="min-height: 100px; text-align: left;"></div>
        `;

        document.getElementById('compare-texts').onclick = () => {
            const text1 = document.getElementById('diff-text1').value;
            const text2 = document.getElementById('diff-text2').value;

            const lines1 = text1.split('\n');
            const lines2 = text2.split('\n');

            let diff = '';
            const maxLines = Math.max(lines1.length, lines2.length);

            for (let i = 0; i < maxLines; i++) {
                const line1 = lines1[i] || '';
                const line2 = lines2[i] || '';

                if (line1 === line2) {
                    diff += `  ${line1}\n`;
                } else {
                    if (line1) diff += `- ${line1}\n`;
                    if (line2) diff += `+ ${line2}\n`;
                }
            }

            const output = document.getElementById('diff-output');
            output.style.whiteSpace = 'pre-wrap';
            output.style.fontFamily = 'monospace';
            output.textContent = diff || 'Texts are identical';
        };
    }

    // === DEVELOPER TOOL RENDERERS ===

    renderUUIDGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">UUID Generator</h2>
            <button id="gen-uuid">Generate UUID</button>
            <div class="result" id="uuid-output" style="font-family: monospace; font-size: 18px; cursor: pointer;" title="Click to copy">
                Click generate to create UUID
            </div>
            <div style="margin-top: 20px;">
                <button id="gen-multiple">Generate 10 UUIDs</button>
            </div>
            <div class="result" id="uuid-list" style="font-family: monospace; font-size: 14px; text-align: left; white-space: pre;"></div>
        `;

        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        document.getElementById('gen-uuid').onclick = () => {
            const uuid = generateUUID();
            const output = document.getElementById('uuid-output');
            output.textContent = uuid;
            output.onclick = () => {
                navigator.clipboard.writeText(uuid);
                output.style.borderColor = '#0f0';
                setTimeout(() => output.style.borderColor = '#333', 1000);
            };
        };

        document.getElementById('gen-multiple').onclick = () => {
            let uuids = '';
            for (let i = 0; i < 10; i++) {
                uuids += generateUUID() + '\n';
            }
            document.getElementById('uuid-list').textContent = uuids;
        };
    }

    renderHashGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Hash Generator</h2>
            <textarea id="hash-input" rows="6" placeholder="Enter text to hash..."></textarea>
            <button id="gen-hash">Generate Hashes</button>
            <div class="result" id="hash-output" style="text-align: left; font-family: monospace; font-size: 12px; word-break: break-all;"></div>
        `;

        // Simple hash functions (for demonstration - not cryptographically secure)
        const simpleHash = (str, seed = 0) => {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
        };

        document.getElementById('gen-hash').onclick = () => {
            const input = document.getElementById('hash-input').value;
            if (!input) {
                alert('Please enter text to hash');
                return;
            }

            const hash1 = simpleHash(input, 1);
            const hash2 = simpleHash(input, 2);

            document.getElementById('hash-output').innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Hash-128 (Variant 1):</strong><br>
                    ${hash1}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Hash-128 (Variant 2):</strong><br>
                    ${hash2}
                </div>
                <div style="font-size: 10px; color: #666;">
                    Note: These are demonstration hashes, not cryptographically secure
                </div>
            `;
        };
    }

    renderRegexTester() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Regex Tester</h2>
            <input type="text" id="regex-pattern" placeholder="Enter regex pattern (e.g., \\d+)">
            <div style="margin: 15px 0;">
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="regex-global" checked>
                    <span>Global (g)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="regex-case">
                    <span>Case Insensitive (i)</span>
                </label>
            </div>
            <textarea id="regex-test" rows="6" placeholder="Enter test text..."></textarea>
            <button id="test-regex">Test Regex</button>
            <div class="result" id="regex-output" style="text-align: left;"></div>
        `;

        document.getElementById('test-regex').onclick = () => {
            const pattern = document.getElementById('regex-pattern').value;
            const text = document.getElementById('regex-test').value;

            if (!pattern) {
                alert('Please enter a regex pattern');
                return;
            }

            try {
                let flags = '';
                if (document.getElementById('regex-global').checked) flags += 'g';
                if (document.getElementById('regex-case').checked) flags += 'i';

                const regex = new RegExp(pattern, flags);
                const matches = text.match(regex);

                const output = document.getElementById('regex-output');
                if (matches) {
                    output.innerHTML = `
                        <div style="margin-bottom: 10px;"><strong>Matches found: ${matches.length}</strong></div>
                        <div style="font-family: monospace; white-space: pre-wrap;">${matches.join('\n')}</div>
                    `;
                } else {
                    output.textContent = 'No matches found';
                }
            } catch (e) {
                document.getElementById('regex-output').innerHTML =
                    `<div style="color: #f00;">Error: ${e.message}</div>`;
            }
        };
    }

    renderHTMLEncoder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">HTML Encoder/Decoder</h2>
            <textarea id="html-input" rows="6" placeholder="Enter HTML or text..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="html-encode">Encode</button>
                <button id="html-decode">Decode</button>
            </div>
            <div class="result" id="html-output" style="min-height: 100px; text-align: left; word-break: break-all;"></div>
        `;

        document.getElementById('html-encode').onclick = () => {
            const input = document.getElementById('html-input').value;
            const encoded = input
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            document.getElementById('html-output').textContent = encoded;
        };

        document.getElementById('html-decode').onclick = () => {
            const input = document.getElementById('html-input').value;
            const textarea = document.createElement('textarea');
            textarea.innerHTML = input;
            document.getElementById('html-output').textContent = textarea.value;
        };
    }

    renderTimestampConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Timestamp Converter</h2>
            <input type="number" id="timestamp-input" placeholder="Unix timestamp (seconds)">
            <button id="convert-timestamp">Convert to Date</button>
            <div class="result" id="timestamp-output" style="text-align: left;"></div>
            <hr style="margin: 30px 0; border-color: #333;">
            <input type="datetime-local" id="date-input">
            <button id="convert-date">Convert to Timestamp</button>
            <div class="result" id="date-output" style="text-align: left;"></div>
        `;

        document.getElementById('convert-timestamp').onclick = () => {
            const timestamp = parseInt(document.getElementById('timestamp-input').value);
            if (!timestamp) {
                alert('Please enter a timestamp');
                return;
            }

            const date = new Date(timestamp * 1000);
            document.getElementById('timestamp-output').innerHTML = `
                <div><strong>Date:</strong> ${date.toLocaleString()}</div>
                <div><strong>UTC:</strong> ${date.toUTCString()}</div>
                <div><strong>ISO:</strong> ${date.toISOString()}</div>
            `;
        };

        document.getElementById('convert-date').onclick = () => {
            const dateStr = document.getElementById('date-input').value;
            if (!dateStr) {
                alert('Please select a date');
                return;
            }

            const timestamp = Math.floor(new Date(dateStr).getTime() / 1000);
            document.getElementById('date-output').innerHTML = `
                <div style="font-size: 24px; font-weight: bold;">${timestamp}</div>
                <div style="font-size: 12px; color: #666;">Unix timestamp (seconds)</div>
            `;
        };

        // Set current time
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localTime = new Date(now - offset).toISOString().slice(0, 16);
        document.getElementById('date-input').value = localTime;
    }

    // === FINANCE TOOL RENDERERS ===

    renderROICalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">ROI Calculator</h2>
            <input type="number" id="initial-investment" placeholder="Initial Investment" step="100">
            <input type="number" id="final-value" placeholder="Final Value" step="100">
            <button id="calc-roi">Calculate ROI</button>
            <div class="result" id="roi-output" style="display: none;">
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;" id="roi-percent"></div>
                <div style="font-size: 14px; color: #666;">Return on Investment</div>
                <div style="margin-top: 20px; text-align: left;" id="roi-details"></div>
            </div>
        `;

        document.getElementById('calc-roi').onclick = () => {
            const initial = parseFloat(document.getElementById('initial-investment').value);
            const final = parseFloat(document.getElementById('final-value').value);

            if (!initial || !final) {
                alert('Please fill all fields');
                return;
            }

            const roi = ((final - initial) / initial) * 100;
            const profit = final - initial;

            const output = document.getElementById('roi-output');
            output.style.display = 'block';

            const roiEl = document.getElementById('roi-percent');
            roiEl.textContent = `${roi > 0 ? '+' : ''}${roi.toFixed(2)}%`;
            roiEl.style.color = roi > 0 ? '#0f0' : '#f00';

            document.getElementById('roi-details').innerHTML = `
                <div><strong>Profit/Loss:</strong> $${profit.toFixed(2)}</div>
                <div><strong>Initial:</strong> $${initial.toFixed(2)}</div>
                <div><strong>Final:</strong> $${final.toFixed(2)}</div>
            `;
        };
    }

    renderProfitMargin() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Profit Margin Calculator</h2>
            <input type="number" id="revenue" placeholder="Revenue" step="0.01">
            <input type="number" id="cost" placeholder="Cost" step="0.01">
            <div class="result" id="margin-output" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">PROFIT MARGIN</div>
                    <div style="font-size: 32px; font-weight: bold;" id="margin-percent">0%</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">PROFIT</div>
                    <div style="font-size: 32px; font-weight: bold;" id="profit-amount">$0.00</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const revenue = parseFloat(document.getElementById('revenue').value) || 0;
            const cost = parseFloat(document.getElementById('cost').value) || 0;

            const profit = revenue - cost;
            const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

            document.getElementById('margin-percent').textContent = `${margin.toFixed(2)}%`;
            document.getElementById('profit-amount').textContent = `$${profit.toFixed(2)}`;
        };

        document.getElementById('revenue').addEventListener('input', calculate);
        document.getElementById('cost').addEventListener('input', calculate);
    }

    renderBreakEven() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Break-Even Calculator</h2>
            <input type="number" id="fixed-costs" placeholder="Fixed Costs" step="100">
            <input type="number" id="price-per-unit" placeholder="Price per Unit" step="0.01">
            <input type="number" id="variable-cost" placeholder="Variable Cost per Unit" step="0.01">
            <button id="calc-breakeven">Calculate</button>
            <div class="result" id="breakeven-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-breakeven').onclick = () => {
            const fixedCosts = parseFloat(document.getElementById('fixed-costs').value);
            const price = parseFloat(document.getElementById('price-per-unit').value);
            const variableCost = parseFloat(document.getElementById('variable-cost').value);

            if (!fixedCosts || !price || variableCost === undefined) {
                alert('Please fill all fields');
                return;
            }

            const contributionMargin = price - variableCost;
            if (contributionMargin <= 0) {
                alert('Price must be greater than variable cost');
                return;
            }

            const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
            const breakEvenRevenue = breakEvenUnits * price;

            const output = document.getElementById('breakeven-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
                    ${breakEvenUnits} units
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Break-Even Revenue:</strong> $${breakEvenRevenue.toFixed(2)}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Contribution Margin:</strong> $${contributionMargin.toFixed(2)} per unit
                </div>
                <div style="font-size: 12px; color: #666;">
                    You need to sell ${breakEvenUnits} units to break even
                </div>
            `;
        };
    }

    renderSavingsGoal() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Savings Goal Calculator</h2>
            <input type="number" id="goal-amount" placeholder="Goal Amount" step="100">
            <input type="number" id="current-savings" placeholder="Current Savings" step="100">
            <input type="number" id="months-to-goal" placeholder="Months to Reach Goal" step="1">
            <input type="number" id="interest-rate-savings" placeholder="Annual Interest Rate (%)" step="0.1" value="0">
            <button id="calc-savings">Calculate</button>
            <div class="result" id="savings-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-savings').onclick = () => {
            const goal = parseFloat(document.getElementById('goal-amount').value);
            const current = parseFloat(document.getElementById('current-savings').value) || 0;
            const months = parseInt(document.getElementById('months-to-goal').value);
            const annualRate = parseFloat(document.getElementById('interest-rate-savings').value) || 0;

            if (!goal || !months) {
                alert('Please fill required fields');
                return;
            }

            const remaining = goal - current;
            const monthlyRate = annualRate / 100 / 12;

            let monthlyDeposit;
            if (monthlyRate > 0) {
                // Future value of annuity formula
                monthlyDeposit = remaining / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
            } else {
                monthlyDeposit = remaining / months;
            }

            const totalDeposits = monthlyDeposit * months;

            const output = document.getElementById('savings-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">
                    $${monthlyDeposit.toFixed(2)}/month
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Total Deposits:</strong> $${totalDeposits.toFixed(2)}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Starting Amount:</strong> $${current.toFixed(2)}
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Goal:</strong> $${goal.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    Save $${monthlyDeposit.toFixed(2)} monthly for ${months} months
                </div>
            `;
        };
    }

    renderInflationCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Inflation Calculator</h2>
            <input type="number" id="amount-inflation" placeholder="Amount" step="100">
            <input type="number" id="inflation-rate" placeholder="Annual Inflation Rate (%)" step="0.1" value="3">
            <input type="number" id="years-inflation" placeholder="Number of Years" step="1">
            <button id="calc-inflation">Calculate</button>
            <div class="result" id="inflation-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-inflation').onclick = () => {
            const amount = parseFloat(document.getElementById('amount-inflation').value);
            const rate = parseFloat(document.getElementById('inflation-rate').value);
            const years = parseInt(document.getElementById('years-inflation').value);

            if (!amount || !rate || !years) {
                alert('Please fill all fields');
                return;
            }

            const futureValue = amount * Math.pow(1 + rate / 100, years);
            const purchasingPower = amount / Math.pow(1 + rate / 100, years);
            const totalInflation = futureValue - amount;

            const output = document.getElementById('inflation-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Future Value:</strong> $${futureValue.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Today's Purchasing Power:</strong> $${purchasingPower.toFixed(2)}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Total Inflation Impact:</strong> $${totalInflation.toFixed(2)}
                </div>
                <div style="font-size: 12px; color: #666;">
                    At ${rate}% inflation over ${years} years
                </div>
            `;
        };
    }

    // === UTILITY TOOL RENDERERS ===

    renderQRGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">QR Code Generator</h2>
            <textarea id="qr-input" rows="4" placeholder="Enter text or URL for QR code..."></textarea>
            <button id="gen-qr">Generate QR Code</button>
            <div class="result" id="qr-output" style="min-height: 200px;">
                <div style="padding: 40px; font-size: 48px;">📱</div>
                <div style="color: #666;">QR code will appear here</div>
                <div style="margin-top: 20px; font-size: 12px; color: #666;">
                    Note: This is a placeholder. For actual QR generation,<br>
                    integrate a library like qrcode.js or use an API
                </div>
            </div>
        `;

        document.getElementById('gen-qr').onclick = () => {
            const text = document.getElementById('qr-input').value;
            if (!text) {
                alert('Please enter text for QR code');
                return;
            }

            // Placeholder - in production, use a QR library
            document.getElementById('qr-output').innerHTML = `
                <div style="padding: 20px;">
                    <div style="font-size: 14px; margin-bottom: 10px;">QR Code for:</div>
                    <div style="font-weight: bold; margin-bottom: 20px; word-break: break-all;">${text}</div>
                    <div style="width: 200px; height: 200px; margin: 0 auto; background: #fff; border: 2px solid #333; display: flex; align-items: center; justify-content: center;">
                        <div style="font-size: 80px;">📱</div>
                    </div>
                    <div style="margin-top: 15px; font-size: 12px; color: #666;">
                        Integrate qrcode.js for actual QR generation
                    </div>
                </div>
            `;
        };
    }

    renderRandomPicker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random Picker</h2>
            <textarea id="picker-input" rows="8" placeholder="Enter options (one per line)..."></textarea>
            <button id="pick-random">Pick Random</button>
            <div class="result" id="picker-output" style="min-height: 100px;">
                <div style="font-size: 36px; font-weight: bold;" id="picked-item">?</div>
            </div>
        `;

        document.getElementById('pick-random').onclick = () => {
            const input = document.getElementById('picker-input').value;
            const items = input.split('\n').filter(item => item.trim());

            if (items.length === 0) {
                alert('Please enter at least one option');
                return;
            }

            const randomItem = items[Math.floor(Math.random() * items.length)];
            document.getElementById('picked-item').textContent = randomItem;
        };
    }

    renderListRandomizer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">List Randomizer</h2>
            <textarea id="randomize-input" rows="10" placeholder="Enter items to shuffle (one per line)..."></textarea>
            <button id="shuffle-list">Shuffle List</button>
            <div class="result" id="randomize-output" style="min-height: 150px; text-align: left; white-space: pre-wrap;"></div>
        `;

        document.getElementById('shuffle-list').onclick = () => {
            const input = document.getElementById('randomize-input').value;
            const items = input.split('\n').filter(item => item.trim());

            if (items.length === 0) {
                alert('Please enter items to shuffle');
                return;
            }

            // Fisher-Yates shuffle
            const shuffled = [...items];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            document.getElementById('randomize-output').textContent = shuffled.join('\n');
        };
    }

    renderNumberGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random Number Generator</h2>
            <input type="number" id="min-num" placeholder="Minimum" value="1">
            <input type="number" id="max-num" placeholder="Maximum" value="100">
            <input type="number" id="count-num" placeholder="How many numbers?" value="1" min="1" max="100">
            <button id="gen-numbers">Generate</button>
            <div class="result" id="numbers-output" style="min-height: 100px;">
                <div style="font-size: 48px; font-weight: bold;" id="random-numbers">?</div>
            </div>
        `;

        document.getElementById('gen-numbers').onclick = () => {
            const min = parseInt(document.getElementById('min-num').value);
            const max = parseInt(document.getElementById('max-num').value);
            const count = parseInt(document.getElementById('count-num').value);

            if (min >= max) {
                alert('Minimum must be less than maximum');
                return;
            }

            const numbers = [];
            for (let i = 0; i < count; i++) {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }

            document.getElementById('random-numbers').textContent = numbers.join(', ');
        };
    }

    renderCounterTimer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Counter & Timer</h2>
            <div style="margin-bottom: 30px;">
                <h3>Counter</h3>
                <div style="font-size: 64px; font-weight: bold; margin: 20px 0;" id="counter-display">0</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                    <button id="counter-dec">- Decrease</button>
                    <button id="counter-reset">Reset</button>
                    <button id="counter-inc">+ Increase</button>
                </div>
            </div>
            <hr style="margin: 30px 0; border-color: #333;">
            <div>
                <h3>Timer</h3>
                <div style="font-size: 48px; font-weight: bold; margin: 20px 0; font-family: monospace;" id="timer-display">00:00:00</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <button id="timer-start">Start</button>
                    <button id="timer-reset">Reset</button>
                </div>
            </div>
        `;

        let counter = 0;
        let timerSeconds = 0;
        let timerInterval = null;

        document.getElementById('counter-inc').onclick = () => {
            counter++;
            document.getElementById('counter-display').textContent = counter;
        };

        document.getElementById('counter-dec').onclick = () => {
            counter--;
            document.getElementById('counter-display').textContent = counter;
        };

        document.getElementById('counter-reset').onclick = () => {
            counter = 0;
            document.getElementById('counter-display').textContent = counter;
        };

        const updateTimerDisplay = () => {
            const hours = Math.floor(timerSeconds / 3600);
            const minutes = Math.floor((timerSeconds % 3600) / 60);
            const seconds = timerSeconds % 60;
            document.getElementById('timer-display').textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        document.getElementById('timer-start').onclick = function () {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                this.textContent = 'Start';
            } else {
                timerInterval = setInterval(() => {
                    timerSeconds++;
                    updateTimerDisplay();
                }, 1000);
                this.textContent = 'Pause';
            }
        };

        document.getElementById('timer-reset').onclick = () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                document.getElementById('timer-start').textContent = 'Start';
            }
            timerSeconds = 0;
            updateTimerDisplay();
        };
    }

    // === MORE CONVERTER RENDERERS ===

    renderDataSizeConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Data Size Converter</h2>
            <input type="number" id="data-input" placeholder="Enter size" step="0.01">
            <select id="data-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="bytes">Bytes</option>
                <option value="kb">Kilobytes (KB)</option>
                <option value="mb">Megabytes (MB)</option>
                <option value="gb" selected>Gigabytes (GB)</option>
                <option value="tb">Terabytes (TB)</option>
            </select>
            <div class="result" id="data-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Bytes:</strong> <span id="bytes">0</span></div>
                <div><strong>KB:</strong> <span id="kb">0</span></div>
                <div><strong>MB:</strong> <span id="mb">0</span></div>
                <div><strong>GB:</strong> <span id="gb">0</span></div>
                <div><strong>TB:</strong> <span id="tb">0</span></div>
            </div>
        `;

        const conversions = {
            bytes: 1,
            kb: 1024,
            mb: 1024 * 1024,
            gb: 1024 * 1024 * 1024,
            tb: 1024 * 1024 * 1024 * 1024
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('data-input').value) || 0;
            const from = document.getElementById('data-from').value;

            const bytes = value * conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = bytes / conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('data-input').addEventListener('input', convert);
        document.getElementById('data-from').addEventListener('change', convert);
    }

    renderAreaConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Area Converter</h2>
            <input type="number" id="area-input" placeholder="Enter area" step="0.01">
            <select id="area-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="sqm">Square Meters</option>
                <option value="sqft">Square Feet</option>
                <option value="sqkm">Square Kilometers</option>
                <option value="sqmi">Square Miles</option>
                <option value="acre">Acres</option>
                <option value="hectare">Hectares</option>
            </select>
            <div class="result" id="area-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Sq Meters:</strong> <span id="sqm">0</span></div>
                <div><strong>Sq Feet:</strong> <span id="sqft">0</span></div>
                <div><strong>Sq Km:</strong> <span id="sqkm">0</span></div>
                <div><strong>Sq Miles:</strong> <span id="sqmi">0</span></div>
                <div><strong>Acres:</strong> <span id="acre">0</span></div>
                <div><strong>Hectares:</strong> <span id="hectare">0</span></div>
            </div>
        `;

        const conversions = {
            sqm: 1,
            sqft: 10.7639,
            sqkm: 0.000001,
            sqmi: 3.861e-7,
            acre: 0.000247105,
            hectare: 0.0001
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('area-input').value) || 0;
            const from = document.getElementById('area-from').value;

            const sqm = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = sqm * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(6);
            });
        };

        document.getElementById('area-input').addEventListener('input', convert);
        document.getElementById('area-from').addEventListener('change', convert);
    }

    renderVolumeConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Volume Converter</h2>
            <input type="number" id="volume-input" placeholder="Enter volume" step="0.01">
            <select id="volume-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="liters">Liters</option>
                <option value="ml">Milliliters</option>
                <option value="gallons">Gallons (US)</option>
                <option value="cubicm">Cubic Meters</option>
                <option value="cubicft">Cubic Feet</option>
            </select>
            <div class="result" id="volume-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Liters:</strong> <span id="liters">0</span></div>
                <div><strong>Milliliters:</strong> <span id="ml">0</span></div>
                <div><strong>Gallons:</strong> <span id="gallons">0</span></div>
                <div><strong>Cubic Meters:</strong> <span id="cubicm">0</span></div>
                <div><strong>Cubic Feet:</strong> <span id="cubicft">0</span></div>
            </div>
        `;

        const conversions = {
            liters: 1,
            ml: 1000,
            gallons: 0.264172,
            cubicm: 0.001,
            cubicft: 0.0353147
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('volume-input').value) || 0;
            const from = document.getElementById('volume-from').value;

            const liters = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = liters * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(4);
            });
        };

        document.getElementById('volume-input').addEventListener('input', convert);
        document.getElementById('volume-from').addEventListener('change', convert);
    }

    renderPressureConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Pressure Converter</h2>
            <input type="number" id="pressure-input" placeholder="Enter pressure" step="0.01">
            <select id="pressure-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="pascal">Pascal (Pa)</option>
                <option value="bar">Bar</option>
                <option value="psi">PSI</option>
                <option value="atm">Atmosphere (atm)</option>
            </select>
            <div class="result" id="pressure-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Pascal:</strong> <span id="pascal">0</span></div>
                <div><strong>Bar:</strong> <span id="bar">0</span></div>
                <div><strong>PSI:</strong> <span id="psi">0</span></div>
                <div><strong>Atmosphere:</strong> <span id="atm">0</span></div>
            </div>
        `;

        const conversions = {
            pascal: 1,
            bar: 0.00001,
            psi: 0.000145038,
            atm: 9.8692e-6
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('pressure-input').value) || 0;
            const from = document.getElementById('pressure-from').value;

            const pascal = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = pascal * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(6);
            });
        };

        document.getElementById('pressure-input').addEventListener('input', convert);
        document.getElementById('pressure-from').addEventListener('change', convert);
    }

    renderEnergyConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Energy Converter</h2>
            <input type="number" id="energy-input" placeholder="Enter energy" step="0.01">
            <select id="energy-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="joules">Joules</option>
                <option value="calories">Calories</option>
                <option value="kwh">Kilowatt-hours</option>
                <option value="btu">BTU</option>
            </select>
            <div class="result" id="energy-result" style="text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div><strong>Joules:</strong> <span id="joules">0</span></div>
                <div><strong>Calories:</strong> <span id="calories">0</span></div>
                <div><strong>kWh:</strong> <span id="kwh">0</span></div>
                <div><strong>BTU:</strong> <span id="btu">0</span></div>
            </div>
        `;

        const conversions = {
            joules: 1,
            calories: 0.239006,
            kwh: 2.7778e-7,
            btu: 0.000947817
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('energy-input').value) || 0;
            const from = document.getElementById('energy-from').value;

            const joules = value / conversions[from];

            Object.keys(conversions).forEach(unit => {
                const converted = joules * conversions[unit];
                document.getElementById(unit).textContent = converted.toFixed(6);
            });
        };

        document.getElementById('energy-input').addEventListener('input', convert);
        document.getElementById('energy-from').addEventListener('change', convert);
    }

    // === HEALTH & FITNESS TOOL RENDERERS ===

    renderCalorieCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Calorie Calculator</h2>
            <select id="gender" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="number" id="age-cal" placeholder="Age" min="15" max="100">
            <input type="number" id="weight-cal" placeholder="Weight (kg)" step="0.1">
            <input type="number" id="height-cal" placeholder="Height (cm)" step="0.1">
            <select id="activity" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="1.2">Sedentary (little/no exercise)</option>
                <option value="1.375">Lightly active (1-3 days/week)</option>
                <option value="1.55">Moderately active (3-5 days/week)</option>
                <option value="1.725">Very active (6-7 days/week)</option>
                <option value="1.9">Extremely active (athlete)</option>
            </select>
            <button id="calc-calories">Calculate</button>
            <div class="result" id="calorie-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-calories').onclick = () => {
            const gender = document.getElementById('gender').value;
            const age = parseInt(document.getElementById('age-cal').value);
            const weight = parseFloat(document.getElementById('weight-cal').value);
            const height = parseFloat(document.getElementById('height-cal').value);
            const activity = parseFloat(document.getElementById('activity').value);

            if (!age || !weight || !height) {
                alert('Please fill all fields');
                return;
            }

            // Mifflin-St Jeor Equation
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            const tdee = bmr * activity;
            const maintain = Math.round(tdee);
            const lose = Math.round(tdee - 500);
            const gain = Math.round(tdee + 500);

            const output = document.getElementById('calorie-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>BMR:</strong> ${Math.round(bmr)} calories/day
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Maintain weight:</strong> ${maintain} calories/day
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Lose weight:</strong> ${lose} calories/day
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Gain weight:</strong> ${gain} calories/day
                </div>
            `;
        };
    }

    renderMacroCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Macro Calculator</h2>
            <input type="number" id="total-calories" placeholder="Total Daily Calories" step="100">
            <select id="diet-type" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="balanced">Balanced (30/40/30)</option>
                <option value="lowcarb">Low Carb (40/30/30)</option>
                <option value="highprotein">High Protein (40/30/30)</option>
                <option value="keto">Keto (70/25/5)</option>
            </select>
            <div class="result" id="macro-output" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div>
                    <div style="font-size: 14px; color: #666;">PROTEIN</div>
                    <div style="font-size: 28px; font-weight: bold;" id="protein">0g</div>
                    <div style="font-size: 12px; color: #666;" id="protein-cal">0 cal</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">CARBS</div>
                    <div style="font-size: 28px; font-weight: bold;" id="carbs">0g</div>
                    <div style="font-size: 12px; color: #666;" id="carbs-cal">0 cal</div>
                </div>
                <div>
                    <div style="font-size: 14px; color: #666;">FATS</div>
                    <div style="font-size: 28px; font-weight: bold;" id="fats">0g</div>
                    <div style="font-size: 12px; color: #666;" id="fats-cal">0 cal</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const calories = parseFloat(document.getElementById('total-calories').value) || 0;
            const diet = document.getElementById('diet-type').value;

            let proteinPercent, carbsPercent, fatsPercent;
            if (diet === 'balanced') [proteinPercent, carbsPercent, fatsPercent] = [30, 40, 30];
            else if (diet === 'lowcarb') [proteinPercent, carbsPercent, fatsPercent] = [40, 30, 30];
            else if (diet === 'highprotein') [proteinPercent, carbsPercent, fatsPercent] = [40, 30, 30];
            else[proteinPercent, carbsPercent, fatsPercent] = [25, 5, 70];

            const proteinCal = calories * (proteinPercent / 100);
            const carbsCal = calories * (carbsPercent / 100);
            const fatsCal = calories * (fatsPercent / 100);

            document.getElementById('protein').textContent = `${Math.round(proteinCal / 4)}g`;
            document.getElementById('protein-cal').textContent = `${Math.round(proteinCal)} cal`;
            document.getElementById('carbs').textContent = `${Math.round(carbsCal / 4)}g`;
            document.getElementById('carbs-cal').textContent = `${Math.round(carbsCal)} cal`;
            document.getElementById('fats').textContent = `${Math.round(fatsCal / 9)}g`;
            document.getElementById('fats-cal').textContent = `${Math.round(fatsCal)} cal`;
        };

        document.getElementById('total-calories').addEventListener('input', calculate);
        document.getElementById('diet-type').addEventListener('change', calculate);
    }

    renderWaterIntake() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Water Intake Calculator</h2>
            <input type="number" id="weight-water" placeholder="Weight (kg)" step="0.1">
            <input type="number" id="exercise-mins" placeholder="Exercise (minutes/day)" value="0">
            <button id="calc-water">Calculate</button>
            <div class="result" id="water-output" style="display: none;">
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;" id="water-amount"></div>
                <div style="font-size: 14px; color: #666;">Recommended daily water intake</div>
            </div>
        `;

        document.getElementById('calc-water').onclick = () => {
            const weight = parseFloat(document.getElementById('weight-water').value);
            const exercise = parseInt(document.getElementById('exercise-mins').value) || 0;

            if (!weight) {
                alert('Please enter your weight');
                return;
            }

            const baseWater = weight * 0.033; // liters
            const exerciseWater = (exercise / 30) * 0.35; // extra liters
            const total = baseWater + exerciseWater;

            const output = document.getElementById('water-output');
            output.style.display = 'block';
            document.getElementById('water-amount').textContent = `${total.toFixed(1)} L`;
        };
    }

    renderBodyFat() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Body Fat Calculator (Navy Method)</h2>
            <select id="gender-bf" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="number" id="height-bf" placeholder="Height (cm)" step="0.1">
            <input type="number" id="neck-bf" placeholder="Neck circumference (cm)" step="0.1">
            <input type="number" id="waist-bf" placeholder="Waist circumference (cm)" step="0.1">
            <input type="number" id="hip-bf" placeholder="Hip circumference (cm) - Female only" step="0.1">
            <button id="calc-bf">Calculate</button>
            <div class="result" id="bf-output" style="display: none;"></div>
        `;

        document.getElementById('calc-bf').onclick = () => {
            const gender = document.getElementById('gender-bf').value;
            const height = parseFloat(document.getElementById('height-bf').value);
            const neck = parseFloat(document.getElementById('neck-bf').value);
            const waist = parseFloat(document.getElementById('waist-bf').value);
            const hip = parseFloat(document.getElementById('hip-bf').value);

            if (!height || !neck || !waist || (gender === 'female' && !hip)) {
                alert('Please fill all required fields');
                return;
            }

            let bodyFat;
            if (gender === 'male') {
                bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            } else {
                bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
            }

            const output = document.getElementById('bf-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;">${bodyFat.toFixed(1)}%</div>
                <div style="font-size: 14px; color: #666;">Estimated Body Fat Percentage</div>
            `;
        };
    }

    renderIdealWeight() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Ideal Weight Calculator</h2>
            <select id="gender-iw" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="number" id="height-iw" placeholder="Height (cm)" step="0.1">
            <button id="calc-iw">Calculate</button>
            <div class="result" id="iw-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-iw').onclick = () => {
            const gender = document.getElementById('gender-iw').value;
            const height = parseFloat(document.getElementById('height-iw').value);

            if (!height) {
                alert('Please enter height');
                return;
            }

            const heightInches = height / 2.54;
            let robinson, miller, hamwi;

            if (gender === 'male') {
                robinson = 52 + 1.9 * (heightInches - 60);
                miller = 56.2 + 1.41 * (heightInches - 60);
                hamwi = 48 + 2.7 * (heightInches - 60);
            } else {
                robinson = 49 + 1.7 * (heightInches - 60);
                miller = 53.1 + 1.36 * (heightInches - 60);
                hamwi = 45.5 + 2.2 * (heightInches - 60);
            }

            const average = (robinson + miller + hamwi) / 3;

            const output = document.getElementById('iw-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${average.toFixed(1)} kg</div>
                <div style="margin-bottom: 10px;"><strong>Robinson Formula:</strong> ${robinson.toFixed(1)} kg</div>
                <div style="margin-bottom: 10px;"><strong>Miller Formula:</strong> ${miller.toFixed(1)} kg</div>
                <div><strong>Hamwi Formula:</strong> ${hamwi.toFixed(1)} kg</div>
            `;
        };
    }

    // === DATE & TIME TOOL RENDERERS ===

    renderDateDifference() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Date Difference Calculator</h2>
            <input type="date" id="date-from">
            <input type="date" id="date-to">
            <div class="result" id="date-diff-output" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px;">
                <div>
                    <div style="font-size: 28px; font-weight: bold;" id="diff-days">0</div>
                    <div style="font-size: 12px; color: #666;">Days</div>
                </div>
                <div>
                    <div style="font-size: 28px; font-weight: bold;" id="diff-weeks">0</div>
                    <div style="font-size: 12px; color: #666;">Weeks</div>
                </div>
                <div>
                    <div style="font-size: 28px; font-weight: bold;" id="diff-months">0</div>
                    <div style="font-size: 12px; color: #666;">Months</div>
                </div>
                <div>
                    <div style="font-size: 28px; font-weight: bold;" id="diff-years">0</div>
                    <div style="font-size: 12px; color: #666;">Years</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const from = new Date(document.getElementById('date-from').value);
            const to = new Date(document.getElementById('date-to').value);

            if (!from || !to || isNaN(from) || isNaN(to)) return;

            const diff = Math.abs(to - from);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30.44);
            const years = Math.floor(days / 365.25);

            document.getElementById('diff-days').textContent = days;
            document.getElementById('diff-weeks').textContent = weeks;
            document.getElementById('diff-months').textContent = months;
            document.getElementById('diff-years').textContent = years;
        };

        document.getElementById('date-from').addEventListener('change', calculate);
        document.getElementById('date-to').addEventListener('change', calculate);

        // Set today's date
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date-to').value = today;
    }

    renderDateAdd() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Date Calculator</h2>
            <input type="date" id="start-date">
            <input type="number" id="days-add" placeholder="Days to add/subtract" value="0">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="add-days">Add Days</button>
                <button id="subtract-days">Subtract Days</button>
            </div>
            <div class="result" id="new-date-output"></div>
        `;

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('start-date').value = today;

        document.getElementById('add-days').onclick = () => {
            const startDate = new Date(document.getElementById('start-date').value);
            const days = parseInt(document.getElementById('days-add').value) || 0;

            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + days);

            document.getElementById('new-date-output').innerHTML = `
                <div style="font-size: 36px; font-weight: bold;">${newDate.toDateString()}</div>
            `;
        };

        document.getElementById('subtract-days').onclick = () => {
            const startDate = new Date(document.getElementById('start-date').value);
            const days = parseInt(document.getElementById('days-add').value) || 0;

            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() - days);

            document.getElementById('new-date-output').innerHTML = `
                <div style="font-size: 36px; font-weight: bold;">${newDate.toDateString()}</div>
            `;
        };
    }

    renderWeekNumber() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Week Number Calculator</h2>
            <input type="date" id="week-date">
            <button id="calc-week">Get Week Number</button>
            <div class="result" id="week-output" style="display: none;">
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;" id="week-num"></div>
                <div style="font-size: 14px; color: #666;">Week of the year</div>
            </div>
        `;

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('week-date').value = today;

        document.getElementById('calc-week').onclick = () => {
            const date = new Date(document.getElementById('week-date').value);
            const firstDay = new Date(date.getFullYear(), 0, 1);
            const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
            const weekNum = Math.ceil((days + firstDay.getDay() + 1) / 7);

            const output = document.getElementById('week-output');
            output.style.display = 'block';
            document.getElementById('week-num').textContent = `Week ${weekNum}`;
        };
    }

    renderWorkdayCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Workday Calculator</h2>
            <input type="date" id="work-start">
            <input type="date" id="work-end">
            <button id="calc-workdays">Calculate Business Days</button>
            <div class="result" id="workday-output" style="display: none;">
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 10px;" id="workdays"></div>
                <div style="font-size: 14px; color: #666;">Business days (excluding weekends)</div>
            </div>
        `;

        document.getElementById('calc-workdays').onclick = () => {
            const start = new Date(document.getElementById('work-start').value);
            const end = new Date(document.getElementById('work-end').value);

            if (!start || !end || isNaN(start) || isNaN(end)) {
                alert('Please select both dates');
                return;
            }

            let workdays = 0;
            const current = new Date(start);

            while (current <= end) {
                const day = current.getDay();
                if (day !== 0 && day !== 6) workdays++;
                current.setDate(current.getDate() + 1);
            }

            const output = document.getElementById('workday-output');
            output.style.display = 'block';
            document.getElementById('workdays').textContent = workdays;
        };
    }

    renderTimeUntil() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Countdown Timer</h2>
            <input type="datetime-local" id="target-datetime">
            <button id="start-countdown">Start Countdown</button>
            <div class="result" id="countdown-output" style="font-family: monospace; font-size: 36px; font-weight: bold;"></div>
        `;

        let interval = null;

        document.getElementById('start-countdown').onclick = () => {
            const target = new Date(document.getElementById('target-datetime').value);

            if (!target || isNaN(target)) {
                alert('Please select a date and time');
                return;
            }

            if (interval) clearInterval(interval);

            const updateCountdown = () => {
                const now = new Date();
                const diff = target - now;

                if (diff <= 0) {
                    document.getElementById('countdown-output').textContent = 'Time\'s up!';
                    clearInterval(interval);
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                document.getElementById('countdown-output').textContent =
                    `${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };

            updateCountdown();
            interval = setInterval(updateCountdown, 1000);
        };
    }

    // === IMAGE & COLOR TOOL RENDERERS ===

    renderColorMixer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Mixer</h2>
            <input type="color" id="color1" value="#ff0000" style="width: 48%; height: 60px;">
            <input type="color" id="color2" value="#0000ff" style="width: 48%; height: 60px;">
            <div class="result" id="mixed-color" style="height: 100px; margin-top: 20px;"></div>
            <div style="margin-top: 10px; font-family: monospace;" id="mixed-hex"></div>
        `;

        const mix = () => {
            const c1 = document.getElementById('color1').value;
            const c2 = document.getElementById('color2').value;

            const r1 = parseInt(c1.slice(1, 3), 16);
            const g1 = parseInt(c1.slice(3, 5), 16);
            const b1 = parseInt(c1.slice(5, 7), 16);

            const r2 = parseInt(c2.slice(1, 3), 16);
            const g2 = parseInt(c2.slice(3, 5), 16);
            const b2 = parseInt(c2.slice(5, 7), 16);

            const r = Math.round((r1 + r2) / 2);
            const g = Math.round((g1 + g2) / 2);
            const b = Math.round((b1 + b2) / 2);

            const mixed = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

            document.getElementById('mixed-color').style.background = mixed;
            document.getElementById('mixed-hex').textContent = mixed.toUpperCase();
        };

        document.getElementById('color1').addEventListener('input', mix);
        document.getElementById('color2').addEventListener('input', mix);
        mix();
    }

    renderGradientGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Gradient Generator</h2>
            <input type="color" id="grad-color1" value="#667eea" style="width: 48%; height: 60px;">
            <input type="color" id="grad-color2" value="#764ba2" style="width: 48%; height: 60px;">
            <select id="grad-direction" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="to right">Left to Right</option>
                <option value="to bottom">Top to Bottom</option>
                <option value="to bottom right">Diagonal</option>
                <option value="135deg">45° Diagonal</option>
            </select>
            <div class="result" id="gradient-preview" style="height: 150px; margin-bottom: 20px;"></div>
            <div class="result" style="font-family: monospace; font-size: 12px; text-align: left; word-break: break-all;" id="gradient-css"></div>
        `;

        const generate = () => {
            const c1 = document.getElementById('grad-color1').value;
            const c2 = document.getElementById('grad-color2').value;
            const dir = document.getElementById('grad-direction').value;

            const gradient = `linear-gradient(${dir}, ${c1}, ${c2})`;
            document.getElementById('gradient-preview').style.background = gradient;
            document.getElementById('gradient-css').textContent = `background: ${gradient};`;
        };

        document.getElementById('grad-color1').addEventListener('input', generate);
        document.getElementById('grad-color2').addEventListener('input', generate);
        document.getElementById('grad-direction').addEventListener('change', generate);
        generate();
    }

    renderContrastChecker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Contrast Checker</h2>
            <input type="color" id="fg-color" value="#000000" style="width: 48%; height: 60px;">
            <input type="color" id="bg-color" value="#ffffff" style="width: 48%; height: 60px;">
            <div class="result" id="contrast-preview" style="height: 100px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
                Sample Text
            </div>
            <div class="result" id="contrast-ratio" style="text-align: left;"></div>
        `;

        const check = () => {
            const fg = document.getElementById('fg-color').value;
            const bg = document.getElementById('bg-color').value;

            document.getElementById('contrast-preview').style.color = fg;
            document.getElementById('contrast-preview').style.background = bg;

            // Calculate relative luminance
            const getLuminance = (hex) => {
                const rgb = [
                    parseInt(hex.slice(1, 3), 16) / 255,
                    parseInt(hex.slice(3, 5), 16) / 255,
                    parseInt(hex.slice(5, 7), 16) / 255
                ].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
                return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
            };

            const l1 = getLuminance(fg);
            const l2 = getLuminance(bg);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

            const passAA = ratio >= 4.5 ? '✅' : '❌';
            const passAAA = ratio >= 7 ? '✅' : '❌';

            document.getElementById('contrast-ratio').innerHTML = `
                <div style="font-size: 36px; font-weight: bold; margin-bottom: 15px;">${ratio.toFixed(2)}:1</div>
                <div><strong>WCAG AA:</strong> ${passAA} (4.5:1 required)</div>
                <div><strong>WCAG AAA:</strong> ${passAAA} (7:1 required)</div>
            `;
        };

        document.getElementById('fg-color').addEventListener('input', check);
        document.getElementById('bg-color').addEventListener('input', check);
        check();
    }

    renderColorShades() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Shades Generator</h2>
            <input type="color" id="base-color" value="#3b82f6" style="width: 100%; height: 60px;">
            <div class="result" id="shades-output" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 20px;"></div>
        `;

        const generate = () => {
            const base = document.getElementById('base-color').value;
            const r = parseInt(base.slice(1, 3), 16);
            const g = parseInt(base.slice(3, 5), 16);
            const b = parseInt(base.slice(5, 7), 16);

            let html = '';
            for (let i = 0; i < 5; i++) {
                const factor = 1 - (i * 0.2);
                const nr = Math.round(r * factor);
                const ng = Math.round(g * factor);
                const nb = Math.round(b * factor);
                const shade = `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;

                html += `<div style="background: ${shade}; height: 80px; border-radius: 8px; display: flex; align-items: end; justify-content: center; padding: 10px; font-size: 10px;">${shade}</div>`;
            }

            document.getElementById('shades-output').innerHTML = html;
        };

        document.getElementById('base-color').addEventListener('input', generate);
        generate();
    }

    renderImageResizer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Image Size Calculator</h2>
            <input type="number" id="orig-width" placeholder="Original Width" step="1">
            <input type="number" id="orig-height" placeholder="Original Height" step="1">
            <input type="number" id="new-width" placeholder="New Width (leave empty)" step="1">
            <input type="number" id="new-height" placeholder="New Height (leave empty)" step="1">
            <div class="result" id="resize-output"></div>
        `;

        const calculate = () => {
            const origW = parseFloat(document.getElementById('orig-width').value);
            const origH = parseFloat(document.getElementById('orig-height').value);
            const newW = parseFloat(document.getElementById('new-width').value);
            const newH = parseFloat(document.getElementById('new-height').value);

            if (!origW || !origH) return;

            const aspectRatio = origW / origH;
            let resultW, resultH;

            if (newW && !newH) {
                resultW = newW;
                resultH = newW / aspectRatio;
            } else if (newH && !newW) {
                resultH = newH;
                resultW = newH * aspectRatio;
            } else if (newW && newH) {
                resultW = newW;
                resultH = newH;
            } else {
                return;
            }

            document.getElementById('resize-output').innerHTML = `
                <div style="font-size: 28px; font-weight: bold;">${Math.round(resultW)} × ${Math.round(resultH)}</div>
                <div style="font-size: 14px; color: #666; margin-top: 10px;">Aspect Ratio: ${aspectRatio.toFixed(2)}:1</div>
            `;
        };

        document.getElementById('orig-width').addEventListener('input', calculate);
        document.getElementById('orig-height').addEventListener('input', calculate);
        document.getElementById('new-width').addEventListener('input', calculate);
        document.getElementById('new-height').addEventListener('input', calculate);
    }

    // === MATH & SCIENCE TOOL RENDERERS ===

    renderFractionCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Fraction Calculator</h2>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 20px;">
                <input type="number" id="frac1-num" placeholder="Numerator">
                <span>/</span>
                <input type="number" id="frac1-den" placeholder="Denominator">
            </div>
            <select id="frac-op" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="+">Add (+)</option>
                <option value="-">Subtract (-)</option>
                <option value="*">Multiply (×)</option>
                <option value="/">Divide (÷)</option>
            </select>
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 20px;">
                <input type="number" id="frac2-num" placeholder="Numerator">
                <span>/</span>
                <input type="number" id="frac2-den" placeholder="Denominator">
            </div>
            <button id="calc-frac">Calculate</button>
            <div class="result" id="frac-output"></div>
        `;

        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

        document.getElementById('calc-frac').onclick = () => {
            const n1 = parseInt(document.getElementById('frac1-num').value);
            const d1 = parseInt(document.getElementById('frac1-den').value);
            const n2 = parseInt(document.getElementById('frac2-num').value);
            const d2 = parseInt(document.getElementById('frac2-den').value);
            const op = document.getElementById('frac-op').value;

            if (!n1 || !d1 || !n2 || !d2 || d1 === 0 || d2 === 0) {
                alert('Please enter valid fractions');
                return;
            }

            let resultNum, resultDen;

            if (op === '+') {
                resultNum = n1 * d2 + n2 * d1;
                resultDen = d1 * d2;
            } else if (op === '-') {
                resultNum = n1 * d2 - n2 * d1;
                resultDen = d1 * d2;
            } else if (op === '*') {
                resultNum = n1 * n2;
                resultDen = d1 * d2;
            } else {
                resultNum = n1 * d2;
                resultDen = d1 * n2;
            }

            const divisor = gcd(Math.abs(resultNum), Math.abs(resultDen));
            resultNum /= divisor;
            resultDen /= divisor;

            document.getElementById('frac-output').innerHTML = `
                <div style="font-size: 48px; font-weight: bold;">${resultNum} / ${resultDen}</div>
                <div style="font-size: 18px; color: #666; margin-top: 10px;">= ${(resultNum / resultDen).toFixed(4)}</div>
            `;
        };
    }

    renderScientificCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Scientific Calculator</h2>
            <input type="number" id="sci-input" placeholder="Enter number" step="any">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <button id="sqrt">√ Square Root</button>
                <button id="square">x² Square</button>
                <button id="cube">x³ Cube</button>
                <button id="log">log₁₀</button>
                <button id="ln">ln (natural log)</button>
                <button id="exp">eˣ</button>
                <button id="sin">sin</button>
                <button id="cos">cos</button>
                <button id="tan">tan</button>
            </div>
            <div class="result" id="sci-output"></div>
        `;

        const calc = (fn, label) => {
            const val = parseFloat(document.getElementById('sci-input').value);
            if (isNaN(val)) {
                alert('Please enter a valid number');
                return;
            }
            const result = fn(val);
            document.getElementById('sci-output').innerHTML = `
                <div style="font-size: 14px; color: #666;">${label}</div>
                <div style="font-size: 36px; font-weight: bold;">${result.toFixed(6)}</div>
            `;
        };

        document.getElementById('sqrt').onclick = () => calc(Math.sqrt, '√x');
        document.getElementById('square').onclick = () => calc(x => x * x, 'x²');
        document.getElementById('cube').onclick = () => calc(x => x * x * x, 'x³');
        document.getElementById('log').onclick = () => calc(Math.log10, 'log₁₀(x)');
        document.getElementById('ln').onclick = () => calc(Math.log, 'ln(x)');
        document.getElementById('exp').onclick = () => calc(Math.exp, 'eˣ');
        document.getElementById('sin').onclick = () => calc(x => Math.sin(x * Math.PI / 180), 'sin(x°)');
        document.getElementById('cos').onclick = () => calc(x => Math.cos(x * Math.PI / 180), 'cos(x°)');
        document.getElementById('tan').onclick = () => calc(x => Math.tan(x * Math.PI / 180), 'tan(x°)');
    }

    renderStatisticsCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Statistics Calculator</h2>
            <textarea id="stats-input" rows="8" placeholder="Enter numbers (one per line or comma-separated)"></textarea>
            <button id="calc-stats">Calculate Statistics</button>
            <div class="result" id="stats-output" style="text-align: left;"></div>
        `;

        document.getElementById('calc-stats').onclick = () => {
            const input = document.getElementById('stats-input').value;
            const numbers = input.split(/[,\n]/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

            if (numbers.length === 0) {
                alert('Please enter valid numbers');
                return;
            }

            numbers.sort((a, b) => a - b);

            const sum = numbers.reduce((a, b) => a + b, 0);
            const mean = sum / numbers.length;
            const median = numbers.length % 2 === 0
                ? (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2
                : numbers[Math.floor(numbers.length / 2)];

            const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numbers.length;
            const stdDev = Math.sqrt(variance);

            document.getElementById('stats-output').innerHTML = `
                <div style="margin-bottom: 10px;"><strong>Count:</strong> ${numbers.length}</div>
                <div style="margin-bottom: 10px;"><strong>Sum:</strong> ${sum.toFixed(2)}</div>
                <div style="margin-bottom: 10px;"><strong>Mean:</strong> ${mean.toFixed(2)}</div>
                <div style="margin-bottom: 10px;"><strong>Median:</strong> ${median.toFixed(2)}</div>
                <div style="margin-bottom: 10px;"><strong>Std Dev:</strong> ${stdDev.toFixed(2)}</div>
                <div style="margin-bottom: 10px;"><strong>Min:</strong> ${numbers[0]}</div>
                <div><strong>Max:</strong> ${numbers[numbers.length - 1]}</div>
            `;
        };
    }

    renderNumberBase() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Number Base Converter</h2>
            <input type="text" id="base-input" placeholder="Enter number">
            <select id="base-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="10">Decimal (Base 10)</option>
                <option value="2">Binary (Base 2)</option>
                <option value="8">Octal (Base 8)</option>
                <option value="16">Hexadecimal (Base 16)</option>
            </select>
            <div class="result" id="base-output" style="text-align: left;"></div>
        `;

        const convert = () => {
            const input = document.getElementById('base-input').value.trim();
            const fromBase = parseInt(document.getElementById('base-from').value);

            if (!input) return;

            try {
                const decimal = parseInt(input, fromBase);
                if (isNaN(decimal)) {
                    document.getElementById('base-output').textContent = 'Invalid input';
                    return;
                }

                document.getElementById('base-output').innerHTML = `
                    <div style="margin-bottom: 10px;"><strong>Decimal:</strong> ${decimal}</div>
                    <div style="margin-bottom: 10px;"><strong>Binary:</strong> ${decimal.toString(2)}</div>
                    <div style="margin-bottom: 10px;"><strong>Octal:</strong> ${decimal.toString(8)}</div>
                    <div><strong>Hexadecimal:</strong> ${decimal.toString(16).toUpperCase()}</div>
                `;
            } catch (e) {
                document.getElementById('base-output').textContent = 'Error converting number';
            }
        };

        document.getElementById('base-input').addEventListener('input', convert);
        document.getElementById('base-from').addEventListener('change', convert);
    }

    renderAngleConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Angle Converter</h2>
            <input type="number" id="angle-input" placeholder="Enter angle" step="0.01">
            <select id="angle-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="degrees">Degrees</option>
                <option value="radians">Radians</option>
                <option value="gradians">Gradians</option>
            </select>
            <div class="result" id="angle-output" style="text-align: left;">
                <div style="margin-bottom: 10px;"><strong>Degrees:</strong> <span id="degrees">0</span>°</div>
                <div style="margin-bottom: 10px;"><strong>Radians:</strong> <span id="radians">0</span> rad</div>
                <div><strong>Gradians:</strong> <span id="gradians">0</span> gon</div>
            </div>
        `;

        const convert = () => {
            const value = parseFloat(document.getElementById('angle-input').value) || 0;
            const from = document.getElementById('angle-from').value;

            let degrees;
            if (from === 'degrees') degrees = value;
            else if (from === 'radians') degrees = value * (180 / Math.PI);
            else degrees = value * 0.9;

            const radians = degrees * (Math.PI / 180);
            const gradians = degrees / 0.9;

            document.getElementById('degrees').textContent = degrees.toFixed(4);
            document.getElementById('radians').textContent = radians.toFixed(4);
            document.getElementById('gradians').textContent = gradians.toFixed(4);
        };

        document.getElementById('angle-input').addEventListener('input', convert);
        document.getElementById('angle-from').addEventListener('change', convert);
    }

    // === PRODUCTIVITY TOOL RENDERERS ===

    renderPomodoroTimer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Pomodoro Timer</h2>
            <div style="font-size: 72px; font-weight: bold; font-family: monospace; margin: 30px 0;" id="pomo-display">25:00</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="pomo-start">Start</button>
                <button id="pomo-pause">Pause</button>
                <button id="pomo-reset">Reset</button>
            </div>
            <div style="font-size: 14px; color: #666;" id="pomo-status">Ready to focus!</div>
        `;

        let timeLeft = 25 * 60;
        let interval = null;
        let isWork = true;

        const updateDisplay = () => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            document.getElementById('pomo-display').textContent =
                `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };

        document.getElementById('pomo-start').onclick = () => {
            if (interval) return;
            interval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    interval = null;
                    isWork = !isWork;
                    timeLeft = isWork ? 25 * 60 : 5 * 60;
                    updateDisplay();
                    document.getElementById('pomo-status').textContent =
                        isWork ? 'Break over! Time to work!' : 'Work done! Take a break!';
                }
            }, 1000);
            document.getElementById('pomo-status').textContent = isWork ? 'Working...' : 'Break time!';
        };

        document.getElementById('pomo-pause').onclick = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
                document.getElementById('pomo-status').textContent = 'Paused';
            }
        };

        document.getElementById('pomo-reset').onclick = () => {
            if (interval) clearInterval(interval);
            interval = null;
            isWork = true;
            timeLeft = 25 * 60;
            updateDisplay();
            document.getElementById('pomo-status').textContent = 'Ready to focus!';
        };
    }

    renderNotepad() {
        const content = document.getElementById('tool-content');
        const saved = localStorage.getItem('quickNotepad') || '';
        content.innerHTML = `
            <h2 class="tool-title">Quick Notepad</h2>
            <textarea id="notepad-text" rows="15" placeholder="Start typing... (auto-saves to browser)" style="font-family: monospace;">${saved}</textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button id="clear-notepad">Clear</button>
                <button id="download-notepad">Download as .txt</button>
            </div>
            <div style="margin-top: 10px; font-size: 12px; color: #666;">Auto-saved locally</div>
        `;

        const textarea = document.getElementById('notepad-text');
        textarea.addEventListener('input', () => {
            localStorage.setItem('quickNotepad', textarea.value);
        });

        document.getElementById('clear-notepad').onclick = () => {
            if (confirm('Clear all notes?')) {
                textarea.value = '';
                localStorage.removeItem('quickNotepad');
            }
        };

        document.getElementById('download-notepad').onclick = () => {
            const blob = new Blob([textarea.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'notes.txt';
            a.click();
            URL.revokeObjectURL(url);
        };
    }

    renderTodoList() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Todo List</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="todo-input" placeholder="Add a task..." style="flex: 1;">
                <button id="add-todo">Add</button>
            </div>
            <div class="result" id="todo-list" style="text-align: left;"></div>
        `;

        let todos = JSON.parse(localStorage.getItem('todoList') || '[]');

        const render = () => {
            const list = document.getElementById('todo-list');
            if (todos.length === 0) {
                list.innerHTML = '<div style="color: #666; padding: 20px; text-align: center;">No tasks yet!</div>';
                return;
            }
            list.innerHTML = todos.map((todo, i) => `
                <div style="display: flex; align-items: center; gap: 10px; padding: 10px; border-bottom: 1px solid #333;">
                    <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="window.toggleTodo(${i})">
                    <span style="flex: 1; ${todo.done ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${todo.text}</span>
                    <button onclick="window.deleteTodo(${i})" style="padding: 5px 10px;">Delete</button>
                </div>
            `).join('');
        };

        window.toggleTodo = (i) => {
            todos[i].done = !todos[i].done;
            localStorage.setItem('todoList', JSON.stringify(todos));
            render();
        };

        window.deleteTodo = (i) => {
            todos.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(todos));
            render();
        };

        const addTodo = () => {
            const input = document.getElementById('todo-input');
            if (input.value.trim()) {
                todos.push({ text: input.value.trim(), done: false });
                localStorage.setItem('todoList', JSON.stringify(todos));
                input.value = '';
                render();
            }
        };

        document.getElementById('add-todo').onclick = addTodo;
        document.getElementById('todo-input').onkeypress = (e) => {
            if (e.key === 'Enter') addTodo();
        };

        render();
    }

    renderWordGoal() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Writing Goal Tracker</h2>
            <input type="number" id="word-goal" placeholder="Word goal" value="1000">
            <textarea id="writing-area" rows="12" placeholder="Start writing..."></textarea>
            <div class="result" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="current-words">0</div>
                    <div style="font-size: 12px; color: #666;">Words Written</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="words-remaining">1000</div>
                    <div style="font-size: 12px; color: #666;">Remaining</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="progress-percent">0%</div>
                    <div style="font-size: 12px; color: #666;">Progress</div>
                </div>
            </div>
        `;

        const update = () => {
            const text = document.getElementById('writing-area').value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const goal = parseInt(document.getElementById('word-goal').value) || 1000;
            const remaining = Math.max(0, goal - words);
            const percent = Math.min(100, Math.round((words / goal) * 100));

            document.getElementById('current-words').textContent = words;
            document.getElementById('words-remaining').textContent = remaining;
            document.getElementById('progress-percent').textContent = `${percent}%`;
        };

        document.getElementById('writing-area').addEventListener('input', update);
        document.getElementById('word-goal').addEventListener('input', update);
    }

    renderReadingTime() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Reading Time Estimator</h2>
            <input type="number" id="wpm" placeholder="Words per minute" value="200">
            <textarea id="reading-text" rows="10" placeholder="Paste your text here..."></textarea>
            <div class="result" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="read-words">0</div>
                    <div style="font-size: 12px; color: #666;">Words</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="read-time">0 min</div>
                    <div style="font-size: 12px; color: #666;">Reading Time</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="read-chars">0</div>
                    <div style="font-size: 12px; color: #666;">Characters</div>
                </div>
            </div>
        `;

        const calculate = () => {
            const text = document.getElementById('reading-text').value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            const wpm = parseInt(document.getElementById('wpm').value) || 200;
            const minutes = Math.ceil(words / wpm);

            document.getElementById('read-words').textContent = words;
            document.getElementById('read-chars').textContent = chars;
            document.getElementById('read-time').textContent = `${minutes} min`;
        };

        document.getElementById('reading-text').addEventListener('input', calculate);
        document.getElementById('wpm').addEventListener('input', calculate);
    }

    // === NETWORK/WEB TOOL RENDERERS ===

    renderIPInfo() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">IP Address Info</h2>
            <button id="get-ip">Get My IP Info</button>
            <div class="result" id="ip-output" style="text-align: left;"></div>
        `;

        document.getElementById('get-ip').onclick = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();

                document.getElementById('ip-output').innerHTML = `
                    <div style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${data.ip}</div>
                    <div style="margin-bottom: 10px;"><strong>Your Public IP Address</strong></div>
                    <div style="font-size: 12px; color: #666;">
                        Note: Additional geolocation info requires paid API
                    </div>
                `;
            } catch (e) {
                document.getElementById('ip-output').innerHTML =
                    '<div style="color: #f00;">Error fetching IP information</div>';
            }
        };
    }

    renderUserAgent() {
        const content = document.getElementById('tool-content');
        const ua = navigator.userAgent;
        content.innerHTML = `
            <h2 class="tool-title">User Agent Parser</h2>
            <div class="result" style="text-align: left;">
                <div style="margin-bottom: 15px;">
                    <strong>Browser:</strong> ${navigator.appName}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Platform:</strong> ${navigator.platform}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Language:</strong> ${navigator.language}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Cookies Enabled:</strong> ${navigator.cookieEnabled ? 'Yes' : 'No'}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Online:</strong> ${navigator.onLine ? 'Yes' : 'No'}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Screen:</strong> ${screen.width}x${screen.height}
                </div>
                <div style="margin-top: 20px; padding: 15px; background: #1a1a1a; border-radius: 8px; word-break: break-all; font-family: monospace; font-size: 12px;">
                    ${ua}
                </div>
            </div>
        `;
    }

    renderDNSLookup() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">DNS Lookup</h2>
            <input type="text" id="domain-input" placeholder="Enter domain (e.g., google.com)">
            <button id="lookup-dns">Lookup</button>
            <div class="result" id="dns-output" style="text-align: left;">
                <div style="padding: 20px; color: #666;">
                    Note: Browser-based DNS lookup is limited. This tool shows basic domain info.
                    For full DNS records, use command-line tools like 'nslookup' or 'dig'.
                </div>
            </div>
        `;

        document.getElementById('lookup-dns').onclick = () => {
            const domain = document.getElementById('domain-input').value.trim();
            if (!domain) {
                alert('Please enter a domain');
                return;
            }

            document.getElementById('dns-output').innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>Domain:</strong> ${domain}
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Status:</strong> Checking...
                </div>
                <div style="font-size: 12px; color: #666; margin-top: 20px;">
                    Browser security restrictions limit DNS queries.<br>
                    Use server-side tools for complete DNS information.
                </div>
            `;
        };
    }

    renderPortChecker() {
        const content = document.getElementById('tool-content');
        const commonPorts = {
            20: 'FTP Data', 21: 'FTP Control', 22: 'SSH', 23: 'Telnet',
            25: 'SMTP', 53: 'DNS', 80: 'HTTP', 110: 'POP3', 143: 'IMAP',
            443: 'HTTPS', 465: 'SMTPS', 587: 'SMTP', 993: 'IMAPS',
            995: 'POP3S', 3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL',
            6379: 'Redis', 8080: 'HTTP Alt', 27017: 'MongoDB'
        };

        content.innerHTML = `
            <h2 class="tool-title">Common Port Reference</h2>
            <input type="number" id="port-search" placeholder="Search port number...">
            <div class="result" id="port-list" style="text-align: left; max-height: 400px; overflow-y: auto;">
                ${Object.entries(commonPorts).map(([port, service]) => `
                    <div style="padding: 10px; border-bottom: 1px solid #333;">
                        <strong>${port}</strong> - ${service}
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('port-search').addEventListener('input', (e) => {
            const search = e.target.value;
            if (search && commonPorts[search]) {
                document.getElementById('port-list').innerHTML = `
                    <div style="padding: 20px; font-size: 18px;">
                        <strong>Port ${search}:</strong> ${commonPorts[search]}
                    </div>
                `;
            } else if (search) {
                document.getElementById('port-list').innerHTML = `
                    <div style="padding: 20px; color: #666;">
                        Port ${search} not in common ports list
                    </div>
                `;
            } else {
                document.getElementById('port-list').innerHTML =
                    Object.entries(commonPorts).map(([port, service]) => `
                        <div style="padding: 10px; border-bottom: 1px solid #333;">
                            <strong>${port}</strong> - ${service}
                        </div>
                    `).join('');
            }
        });
    }

    renderHTTPStatus() {
        const content = document.getElementById('tool-content');
        const codes = {
            200: 'OK', 201: 'Created', 204: 'No Content',
            301: 'Moved Permanently', 302: 'Found', 304: 'Not Modified',
            400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
            404: 'Not Found', 405: 'Method Not Allowed', 429: 'Too Many Requests',
            500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable'
        };

        content.innerHTML = `
            <h2 class="tool-title">HTTP Status Codes</h2>
            <input type="number" id="status-search" placeholder="Search status code...">
            <div class="result" id="status-list" style="text-align: left; max-height: 400px; overflow-y: auto;">
                ${Object.entries(codes).map(([code, desc]) => `
                    <div style="padding: 10px; border-bottom: 1px solid #333;">
                        <strong>${code}</strong> - ${desc}
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('status-search').addEventListener('input', (e) => {
            const search = e.target.value;
            if (search && codes[search]) {
                document.getElementById('status-list').innerHTML = `
                    <div style="padding: 20px; font-size: 18px;">
                        <strong>${search}:</strong> ${codes[search]}
                    </div>
                `;
            } else if (search) {
                document.getElementById('status-list').innerHTML = `
                    <div style="padding: 20px; color: #666;">
                        Status code ${search} not in list
                    </div>
                `;
            } else {
                document.getElementById('status-list').innerHTML =
                    Object.entries(codes).map(([code, desc]) => `
                        <div style="padding: 10px; border-bottom: 1px solid #333;">
                            <strong>${code}</strong> - ${desc}
                        </div>
                    `).join('');
            }
        });
    }

    // === SPECIALIZED TOOL RENDERERS ===

    renderBinaryText() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Binary Text Converter</h2>
            <textarea id="binary-input" rows="6" placeholder="Enter text or binary..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="to-binary">Text to Binary</button>
                <button id="from-binary">Binary to Text</button>
            </div>
            <div class="result" id="binary-output" style="min-height: 100px; text-align: left; word-break: break-all; font-family: monospace;"></div>
        `;

        document.getElementById('to-binary').onclick = () => {
            const text = document.getElementById('binary-input').value;
            const binary = text.split('').map(char =>
                char.charCodeAt(0).toString(2).padStart(8, '0')
            ).join(' ');
            document.getElementById('binary-output').textContent = binary;
        };

        document.getElementById('from-binary').onclick = () => {
            try {
                const binary = document.getElementById('binary-input').value;
                const text = binary.split(' ').map(bin =>
                    String.fromCharCode(parseInt(bin, 2))
                ).join('');
                document.getElementById('binary-output').textContent = text;
            } catch (e) {
                document.getElementById('binary-output').textContent = 'Error: Invalid binary';
            }
        };
    }

    renderMorseCode() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Morse Code Translator</h2>
            <textarea id="morse-input" rows="6" placeholder="Enter text or morse code..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="to-morse">Text to Morse</button>
                <button id="from-morse">Morse to Text</button>
            </div>
            <div class="result" id="morse-output" style="min-height: 100px; text-align: left; font-family: monospace;"></div>
        `;

        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.', ' ': '/'
        };

        const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));

        document.getElementById('to-morse').onclick = () => {
            const text = document.getElementById('morse-input').value.toUpperCase();
            const morse = text.split('').map(char => morseCode[char] || char).join(' ');
            document.getElementById('morse-output').textContent = morse;
        };

        document.getElementById('from-morse').onclick = () => {
            const morse = document.getElementById('morse-input').value;
            const text = morse.split(' ').map(code => reverseMorse[code] || '').join('');
            document.getElementById('morse-output').textContent = text;
        };
    }

    renderRomanNumerals() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Roman Numerals Converter</h2>
            <input type="text" id="roman-input" placeholder="Enter number or Roman numeral">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="to-roman">Number to Roman</button>
                <button id="from-roman">Roman to Number</button>
            </div>
            <div class="result" id="roman-output"></div>
        `;

        const toRoman = (num) => {
            const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
            let result = '';
            for (let i = 0; i < values.length; i++) {
                while (num >= values[i]) {
                    result += symbols[i];
                    num -= values[i];
                }
            }
            return result;
        };

        const fromRoman = (str) => {
            const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
            let result = 0;
            for (let i = 0; i < str.length; i++) {
                const current = values[str[i]];
                const next = values[str[i + 1]];
                if (next && current < next) result -= current;
                else result += current;
            }
            return result;
        };

        document.getElementById('to-roman').onclick = () => {
            const num = parseInt(document.getElementById('roman-input').value);
            if (isNaN(num) || num < 1 || num > 3999) {
                alert('Please enter a number between 1 and 3999');
                return;
            }
            document.getElementById('roman-output').innerHTML =
                `<div style="font-size: 48px; font-weight: bold;">${toRoman(num)}</div>`;
        };

        document.getElementById('from-roman').onclick = () => {
            const roman = document.getElementById('roman-input').value.toUpperCase();
            try {
                const num = fromRoman(roman);
                document.getElementById('roman-output').innerHTML =
                    `<div style="font-size: 48px; font-weight: bold;">${num}</div>`;
            } catch (e) {
                alert('Invalid Roman numeral');
            }
        };
    }

    renderEmojiPicker() {
        const content = document.getElementById('tool-content');
        const emojis = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

        content.innerHTML = `
            <h2 class="tool-title">Emoji Picker</h2>
            <div class="result" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); gap: 10px; max-height: 400px; overflow-y: auto;">
                ${emojis.map(emoji => `
                    <div style="font-size: 32px; text-align: center; cursor: pointer; padding: 10px; border-radius: 8px; transition: background 0.2s;" 
                         onclick="navigator.clipboard.writeText('${emoji}'); this.style.background='#0f0'; setTimeout(() => this.style.background='', 500);"
                         title="Click to copy">
                        ${emoji}
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: 15px; font-size: 12px; color: #666;">Click any emoji to copy</div>
        `;
    }

    renderLetterCounter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Letter Frequency Analyzer</h2>
            <textarea id="freq-input" rows="8" placeholder="Enter text to analyze..."></textarea>
            <button id="analyze-freq">Analyze</button>
            <div class="result" id="freq-output" style="text-align: left;"></div>
        `;

        document.getElementById('analyze-freq').onclick = () => {
            const text = document.getElementById('freq-input').value.toLowerCase();
            const freq = {};

            for (const char of text) {
                if (char.match(/[a-z]/)) {
                    freq[char] = (freq[char] || 0) + 1;
                }
            }

            const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
            const total = sorted.reduce((sum, [, count]) => sum + count, 0);

            document.getElementById('freq-output').innerHTML = `
                <div style="margin-bottom: 20px;">
                    <strong>Total Letters:</strong> ${total}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                    ${sorted.map(([letter, count]) => `
                        <div style="padding: 10px; background: #1a1a1a; border-radius: 8px;">
                            <div style="font-size: 24px; font-weight: bold;">${letter.toUpperCase()}</div>
                            <div style="font-size: 14px;">${count} (${((count / total) * 100).toFixed(1)}%)</div>
                        </div>
                    `).join('')}
                </div>
            `;
        };
    }

    // === FINAL BATCH RENDERERS (15 TOOLS TO REACH 100!) ===

    renderPasswordStrength() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Password Strength Checker</h2>
            <input type="password" id="pwd-input" placeholder="Enter password to test">
            <button id="toggle-pwd" style="margin-top: 10px;">👁️ Show/Hide</button>
            <div class="result" id="pwd-strength" style="text-align: left;"></div>
        `;

        document.getElementById('toggle-pwd').onclick = () => {
            const input = document.getElementById('pwd-input');
            input.type = input.type === 'password' ? 'text' : 'password';
        };

        document.getElementById('pwd-input').addEventListener('input', (e) => {
            const pwd = e.target.value;
            let score = 0;
            const checks = {
                length: pwd.length >= 8,
                upper: /[A-Z]/.test(pwd),
                lower: /[a-z]/.test(pwd),
                number: /[0-9]/.test(pwd),
                special: /[^A-Za-z0-9]/.test(pwd)
            };

            score = Object.values(checks).filter(Boolean).length;
            const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][score];
            const colors = ['#f00', '#f60', '#fa0', '#9f0', '#0f0', '#0f0'];

            document.getElementById('pwd-strength').innerHTML = `
                <div style="font-size: 32px; font-weight: bold; color: ${colors[score]}; margin-bottom: 20px;">
                    ${strength}
                </div>
                <div style="margin-bottom: 10px;">
                    ${checks.length ? '✅' : '❌'} At least 8 characters
                </div>
                <div style="margin-bottom: 10px;">
                    ${checks.upper ? '✅' : '❌'} Uppercase letter
                </div>
                <div style="margin-bottom: 10px;">
                    ${checks.lower ? '✅' : '❌'} Lowercase letter
                </div>
                <div style="margin-bottom: 10px;">
                    ${checks.number ? '✅' : '❌'} Number
                </div>
                <div>
                    ${checks.special ? '✅' : '❌'} Special character
                </div>
            `;
        });
    }

    renderPasswordGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Password Generator</h2>
            <input type="number" id="pwd-length" placeholder="Length" value="16" min="4" max="64">
            <div style="margin: 15px 0;">
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="pwd-upper" checked> Uppercase (A-Z)
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="pwd-lower" checked> Lowercase (a-z)
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="pwd-numbers" checked> Numbers (0-9)
                </label>
                <label style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="pwd-special" checked> Special (!@#$%)
                </label>
            </div>
            <button id="gen-pwd">Generate Password</button>
            <div class="result" id="pwd-output" style="font-family: monospace; font-size: 20px; cursor: pointer; word-break: break-all;" title="Click to copy"></div>
        `;

        document.getElementById('gen-pwd').onclick = () => {
            const length = parseInt(document.getElementById('pwd-length').value);
            let chars = '';
            if (document.getElementById('pwd-upper').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (document.getElementById('pwd-lower').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
            if (document.getElementById('pwd-numbers').checked) chars += '0123456789';
            if (document.getElementById('pwd-special').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

            if (!chars) {
                alert('Select at least one character type');
                return;
            }

            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars[Math.floor(Math.random() * chars.length)];
            }

            const output = document.getElementById('pwd-output');
            output.textContent = password;
            output.onclick = () => {
                navigator.clipboard.writeText(password);
                output.style.borderColor = '#0f0';
                setTimeout(() => output.style.borderColor = '#333', 1000);
            };
        };
    }

    renderLoremIpsum() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Lorem Ipsum Generator</h2>
            <input type="number" id="lorem-count" placeholder="Number of paragraphs" value="3" min="1" max="20">
            <button id="gen-lorem">Generate</button>
            <div class="result" id="lorem-output" style="text-align: left; white-space: pre-wrap;"></div>
        `;

        const lorem = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
            "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
        ];

        document.getElementById('gen-lorem').onclick = () => {
            const count = parseInt(document.getElementById('lorem-count').value);
            let text = '';
            for (let i = 0; i < count; i++) {
                text += lorem[Math.floor(Math.random() * lorem.length)] + '\n\n';
            }
            document.getElementById('lorem-output').textContent = text.trim();
        };
    }

    renderCSVToJSON() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSV to JSON Converter</h2>
            <textarea id="csv-input" rows="8" placeholder="Paste CSV here (first row as headers)..."></textarea>
            <button id="convert-csv">Convert to JSON</button>
            <div class="result" id="json-output" style="text-align: left; font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto;"></div>
        `;

        document.getElementById('convert-csv').onclick = () => {
            const csv = document.getElementById('csv-input').value.trim();
            if (!csv) {
                alert('Please enter CSV data');
                return;
            }

            try {
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                const result = [];

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].trim()) continue;
                    const values = lines[i].split(',').map(v => v.trim());
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index] || '';
                    });
                    result.push(obj);
                }

                document.getElementById('json-output').textContent = JSON.stringify(result, null, 2);
            } catch (e) {
                document.getElementById('json-output').textContent = 'Error: ' + e.message;
            }
        };
    }

    renderJSONFormatter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JSON Formatter & Validator</h2>
            <textarea id="json-input" rows="10" placeholder="Paste JSON here..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="format-json">Format</button>
                <button id="minify-json">Minify</button>
            </div>
            <div class="result" id="json-result" style="text-align: left; font-family: monospace; font-size: 12px; white-space: pre-wrap; max-height: 400px; overflow-y: auto;"></div>
        `;

        document.getElementById('format-json').onclick = () => {
            try {
                const json = JSON.parse(document.getElementById('json-input').value);
                document.getElementById('json-result').textContent = JSON.stringify(json, null, 2);
                document.getElementById('json-result').style.color = '#0f0';
            } catch (e) {
                document.getElementById('json-result').textContent = 'Error: ' + e.message;
                document.getElementById('json-result').style.color = '#f00';
            }
        };

        document.getElementById('minify-json').onclick = () => {
            try {
                const json = JSON.parse(document.getElementById('json-input').value);
                document.getElementById('json-result').textContent = JSON.stringify(json);
                document.getElementById('json-result').style.color = '#0f0';
            } catch (e) {
                document.getElementById('json-result').textContent = 'Error: ' + e.message;
                document.getElementById('json-result').style.color = '#f00';
            }
        };
    }

    renderSlugGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">URL Slug Generator</h2>
            <input type="text" id="slug-input" placeholder="Enter text to slugify">
            <div class="result" id="slug-output" style="font-family: monospace; font-size: 20px; cursor: pointer;" title="Click to copy"></div>
        `;

        document.getElementById('slug-input').addEventListener('input', (e) => {
            const slug = e.target.value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const output = document.getElementById('slug-output');
            output.textContent = slug || 'your-slug-here';
            output.onclick = () => {
                if (slug) {
                    navigator.clipboard.writeText(slug);
                    output.style.borderColor = '#0f0';
                    setTimeout(() => output.style.borderColor = '#333', 1000);
                }
            };
        });
    }

    renderCreditCard() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Credit Card Validator (Luhn Algorithm)</h2>
            <input type="text" id="cc-input" placeholder="Enter card number" maxlength="19">
            <div class="result" id="cc-output"></div>
        `;

        document.getElementById('cc-input').addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');

            // Luhn algorithm
            let sum = 0;
            let isEven = false;
            for (let i = value.length - 1; i >= 0; i--) {
                let digit = parseInt(value[i]);
                if (isEven) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                sum += digit;
                isEven = !isEven;
            }

            const isValid = sum % 10 === 0 && value.length >= 13;
            const output = document.getElementById('cc-output');

            if (value.length === 0) {
                output.innerHTML = '';
            } else {
                output.innerHTML = `
                    <div style="font-size: 32px; font-weight: bold; color: ${isValid ? '#0f0' : '#f00'};">
                        ${isValid ? '✅ Valid' : '❌ Invalid'}
                    </div>
                    <div style="margin-top: 10px; font-size: 12px; color: #666;">
                        Note: This only validates the format, not if the card is active
                    </div>
                `;
            }
        });
    }

    renderIBANValidator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">IBAN Validator</h2>
            <input type="text" id="iban-input" placeholder="Enter IBAN (e.g., GB82WEST12345698765432)">
            <div class="result" id="iban-output"></div>
        `;

        document.getElementById('iban-input').addEventListener('input', (e) => {
            const iban = e.target.value.replace(/\s/g, '').toUpperCase();

            if (iban.length === 0) {
                document.getElementById('iban-output').innerHTML = '';
                return;
            }

            // Basic IBAN validation (simplified)
            const isValidLength = iban.length >= 15 && iban.length <= 34;
            const isValidFormat = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban);
            const isValid = isValidLength && isValidFormat;

            document.getElementById('iban-output').innerHTML = `
                <div style="font-size: 32px; font-weight: bold; color: ${isValid ? '#0f0' : '#f00'};">
                    ${isValid ? '✅ Valid Format' : '❌ Invalid Format'}
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #666;">
                    Country: ${iban.substring(0, 2)}<br>
                    Check Digits: ${iban.substring(2, 4)}
                </div>
            `;
        });
    }

    renderColorPalette() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Palette Generator</h2>
            <button id="gen-palette">Generate Random Palette</button>
            <div class="result" id="palette-output" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 20px;"></div>
        `;

        const generateColor = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        };

        document.getElementById('gen-palette').onclick = () => {
            let html = '';
            for (let i = 0; i < 5; i++) {
                const color = generateColor();
                html += `
                    <div style="background: ${color}; height: 120px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: end; padding: 10px; cursor: pointer;"
                         onclick="navigator.clipboard.writeText('${color}'); this.style.transform='scale(1.05)'; setTimeout(() => this.style.transform='scale(1)', 200);"
                         title="Click to copy">
                        <div style="background: rgba(0,0,0,0.7); padding: 5px 10px; border-radius: 4px; font-size: 12px;">
                            ${color}
                        </div>
                    </div>
                `;
            }
            document.getElementById('palette-output').innerHTML = html;
        };
    }

    renderImageToDataURL() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Image to Data URL</h2>
            <input type="file" id="img-upload" accept="image/*">
            <div class="result" id="dataurl-output" style="text-align: left; word-break: break-all; font-family: monospace; font-size: 10px; max-height: 300px; overflow-y: auto;"></div>
        `;

        document.getElementById('img-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const dataURL = event.target.result;
                document.getElementById('dataurl-output').innerHTML = `
                    <div style="margin-bottom: 10px;">
                        <button onclick="navigator.clipboard.writeText('${dataURL}')">Copy to Clipboard</button>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong>Size:</strong> ${(dataURL.length / 1024).toFixed(2)} KB
                    </div>
                    <div>${dataURL}</div>
                `;
            };
            reader.readAsDataURL(file);
        });
    }

    renderCronExpression() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Cron Expression Helper</h2>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">
                <input type="text" id="cron-min" placeholder="Min (0-59)" value="*">
                <input type="text" id="cron-hour" placeholder="Hour (0-23)" value="*">
                <input type="text" id="cron-day" placeholder="Day (1-31)" value="*">
                <input type="text" id="cron-month" placeholder="Month (1-12)" value="*">
                <input type="text" id="cron-dow" placeholder="DOW (0-6)" value="*">
            </div>
            <div class="result" id="cron-output" style="text-align: left;"></div>
        `;

        const update = () => {
            const min = document.getElementById('cron-min').value || '*';
            const hour = document.getElementById('cron-hour').value || '*';
            const day = document.getElementById('cron-day').value || '*';
            const month = document.getElementById('cron-month').value || '*';
            const dow = document.getElementById('cron-dow').value || '*';

            const expression = `${min} ${hour} ${day} ${month} ${dow}`;

            document.getElementById('cron-output').innerHTML = `
                <div style="font-size: 24px; font-weight: bold; font-family: monospace; margin-bottom: 20px;">
                    ${expression}
                </div>
                <div style="font-size: 12px; color: #666;">
                    <div>* = any value</div>
                    <div>, = value list separator</div>
                    <div>- = range of values</div>
                    <div>/ = step values</div>
                </div>
            `;
        };

        ['cron-min', 'cron-hour', 'cron-day', 'cron-month', 'cron-dow'].forEach(id => {
            document.getElementById(id).addEventListener('input', update);
        });

        update();
    }

    renderUnitConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Universal Unit Converter</h2>
            <select id="unit-category" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="speed">Speed</option>
            </select>
            <input type="number" id="unit-value" placeholder="Enter value" step="0.01">
            <select id="unit-from" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;"></select>
            <select id="unit-to" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;"></select>
            <div class="result" id="unit-result" style="font-size: 36px; font-weight: bold;"></div>
        `;

        const units = {
            length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084, in: 39.3701 },
            weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
            temperature: { c: 'c', f: 'f', k: 'k' },
            speed: { mps: 1, kph: 3.6, mph: 2.23694, knots: 1.94384 }
        };

        const updateUnits = () => {
            const category = document.getElementById('unit-category').value;
            const unitList = Object.keys(units[category]);

            const fromSelect = document.getElementById('unit-from');
            const toSelect = document.getElementById('unit-to');

            fromSelect.innerHTML = unitList.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join('');
            toSelect.innerHTML = unitList.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join('');
            toSelect.selectedIndex = 1;
        };

        const convert = () => {
            const value = parseFloat(document.getElementById('unit-value').value) || 0;
            const category = document.getElementById('unit-category').value;
            const from = document.getElementById('unit-from').value;
            const to = document.getElementById('unit-to').value;

            let result;
            if (category === 'temperature') {
                // Temperature conversion logic
                if (from === 'c' && to === 'f') result = (value * 9 / 5) + 32;
                else if (from === 'f' && to === 'c') result = (value - 32) * 5 / 9;
                else if (from === 'c' && to === 'k') result = value + 273.15;
                else if (from === 'k' && to === 'c') result = value - 273.15;
                else result = value;
            } else {
                const base = value / units[category][from];
                result = base * units[category][to];
            }

            document.getElementById('unit-result').textContent = result.toFixed(4);
        };

        document.getElementById('unit-category').addEventListener('change', () => {
            updateUnits();
            convert();
        });
        document.getElementById('unit-value').addEventListener('input', convert);
        document.getElementById('unit-from').addEventListener('change', convert);
        document.getElementById('unit-to').addEventListener('change', convert);

        updateUnits();
    }

    renderTextCase() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Case Converter</h2>
            <textarea id="case-input" rows="6" placeholder="Enter text..."></textarea>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <button id="case-upper">UPPER</button>
                <button id="case-lower">lower</button>
                <button id="case-title">Title Case</button>
                <button id="case-sentence">Sentence case</button>
                <button id="case-camel">camelCase</button>
                <button id="case-snake">snake_case</button>
            </div>
            <div class="result" id="case-output" style="min-height: 100px; text-align: left; white-space: pre-wrap;"></div>
        `;

        const input = document.getElementById('case-input');
        const output = document.getElementById('case-output');

        document.getElementById('case-upper').onclick = () => {
            output.textContent = input.value.toUpperCase();
        };

        document.getElementById('case-lower').onclick = () => {
            output.textContent = input.value.toLowerCase();
        };

        document.getElementById('case-title').onclick = () => {
            output.textContent = input.value.replace(/\w\S*/g, txt =>
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        };

        document.getElementById('case-sentence').onclick = () => {
            output.textContent = input.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        };

        document.getElementById('case-camel').onclick = () => {
            output.textContent = input.value
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        };

        document.getElementById('case-snake').onclick = () => {
            output.textContent = input.value
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]+/g, '_')
                .replace(/^_|_$/g, '');
        };
    }

    renderWordScrambler() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Word Scrambler</h2>
            <textarea id="scramble-input" rows="6" placeholder="Enter text to scramble..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="scramble-words">Scramble Words</button>
                <button id="scramble-letters">Scramble Letters</button>
            </div>
            <div class="result" id="scramble-output" style="min-height: 100px; text-align: left; white-space: pre-wrap;"></div>
        `;

        const shuffle = (str) => {
            const arr = str.split('');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.join('');
        };

        document.getElementById('scramble-words').onclick = () => {
            const text = document.getElementById('scramble-input').value;
            const words = text.split(/\s+/);
            const scrambled = words.map(word => shuffle(word)).join(' ');
            document.getElementById('scramble-output').textContent = scrambled;
        };

        document.getElementById('scramble-letters').onclick = () => {
            const text = document.getElementById('scramble-input').value;
            document.getElementById('scramble-output').textContent = shuffle(text);
        };
    }

    renderDiceRoller() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Dice Roller</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <button id="roll-d6">Roll D6</button>
                <button id="roll-d20">Roll D20</button>
                <button id="roll-d100">Roll D100</button>
            </div>
            <input type="number" id="dice-count" placeholder="Number of dice" value="1" min="1" max="10">
            <input type="number" id="dice-sides" placeholder="Sides per die" value="6" min="2" max="100">
            <button id="roll-custom">Roll Custom</button>
            <div class="result" id="dice-output" style="min-height: 150px;">
                <div style="font-size: 72px; font-weight: bold;" id="dice-result">🎲</div>
                <div id="dice-details" style="margin-top: 20px; font-size: 14px; color: #666;"></div>
            </div>
        `;

        const roll = (sides, count = 1) => {
            const results = [];
            for (let i = 0; i < count; i++) {
                results.push(Math.floor(Math.random() * sides) + 1);
            }
            const total = results.reduce((a, b) => a + b, 0);

            document.getElementById('dice-result').textContent = total;
            document.getElementById('dice-details').textContent =
                count > 1 ? `Rolls: ${results.join(', ')}` : `Rolled a ${total} on D${sides}`;
        };

        document.getElementById('roll-d6').onclick = () => roll(6);
        document.getElementById('roll-d20').onclick = () => roll(20);
        document.getElementById('roll-d100').onclick = () => roll(100);
        document.getElementById('roll-custom').onclick = () => {
            const count = parseInt(document.getElementById('dice-count').value);
            const sides = parseInt(document.getElementById('dice-sides').value);
            roll(sides, count);
        };
    }

    // === BATCH 6 - PREMIUM TOOL RENDERERS ===

    renderMarkdownPreview() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Markdown Preview</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h3 style="margin-bottom: 10px;">Markdown Input</h3>
                    <textarea id="md-input" rows="15" placeholder="# Enter Markdown here..." style="font-family: monospace;"></textarea>
                </div>
                <div>
                    <h3 style="margin-bottom: 10px;">Preview</h3>
                    <div id="md-preview" class="result" style="text-align: left; min-height: 300px; padding: 15px; overflow-y: auto;"></div>
                </div>
            </div>
        `;

        const simpleMarkdown = (text) => {
            return text
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code style="background: #333; padding: 2px 6px; border-radius: 3px;">$1</code>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
                .replace(/^- (.*$)/gim, '<li>$1</li>')
                .replace(/\n/g, '<br>');
        };

        document.getElementById('md-input').addEventListener('input', (e) => {
            document.getElementById('md-preview').innerHTML = simpleMarkdown(e.target.value);
        });
    }

    renderRegexTester() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Advanced Regex Tester</h2>
            <input type="text" id="regex-pattern" placeholder="Enter regex pattern (without slashes)">
            <input type="text" id="regex-flags" placeholder="Flags (g, i, m)" value="g">
            <textarea id="regex-test-text" rows="8" placeholder="Enter text to test..."></textarea>
            <button id="test-regex">Test Regex</button>
            <div class="result" id="regex-results" style="text-align: left;"></div>
        `;

        document.getElementById('test-regex').onclick = () => {
            try {
                const pattern = document.getElementById('regex-pattern').value;
                const flags = document.getElementById('regex-flags').value;
                const text = document.getElementById('regex-test-text').value;

                if (!pattern) {
                    alert('Please enter a regex pattern');
                    return;
                }

                const regex = new RegExp(pattern, flags);
                const matches = [...text.matchAll(regex)];

                if (matches.length === 0) {
                    document.getElementById('regex-results').innerHTML = '<div style="color: #f60;">No matches found</div>';
                    return;
                }

                let html = `<div style="margin-bottom: 15px;"><strong>${matches.length} match(es) found:</strong></div>`;
                matches.forEach((match, i) => {
                    html += `
                        <div style="padding: 10px; background: #1a1a1a; border-radius: 8px; margin-bottom: 10px;">
                            <div><strong>Match ${i + 1}:</strong> "${match[0]}"</div>
                            <div style="font-size: 12px; color: #666;">Index: ${match.index}</div>
                        </div>
                    `;
                });

                document.getElementById('regex-results').innerHTML = html;
            } catch (e) {
                document.getElementById('regex-results').innerHTML = `<div style="color: #f00;">Error: ${e.message}</div>`;
            }
        };
    }

    renderColorConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Format Converter</h2>
            <input type="color" id="color-picker" value="#3b82f6" style="width: 100%; height: 80px; margin-bottom: 20px;">
            <div class="result" style="text-align: left;">
                <div style="margin-bottom: 15px;">
                    <strong>HEX:</strong> <span id="hex-value" style="font-family: monospace;"></span>
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>RGB:</strong> <span id="rgb-value" style="font-family: monospace;"></span>
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>HSL:</strong> <span id="hsl-value" style="font-family: monospace;"></span>
                </div>
                <div>
                    <strong>RGBA:</strong> <span id="rgba-value" style="font-family: monospace;"></span>
                </div>
            </div>
        `;

        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        };

        const rgbToHsl = (r, g, b) => {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }

            return {
                h: Math.round(h * 360),
                s: Math.round(s * 100),
                l: Math.round(l * 100)
            };
        };

        const update = () => {
            const hex = document.getElementById('color-picker').value;
            const rgb = hexToRgb(hex);
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

            document.getElementById('hex-value').textContent = hex.toUpperCase();
            document.getElementById('rgb-value').textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            document.getElementById('hsl-value').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            document.getElementById('rgba-value').textContent = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
        };

        document.getElementById('color-picker').addEventListener('input', update);
        update();
    }

    renderSQLFormatter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">SQL Formatter</h2>
            <textarea id="sql-input" rows="10" placeholder="Paste SQL query here..." style="font-family: monospace;"></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="format-sql">Format SQL</button>
                <button id="minify-sql">Minify SQL</button>
            </div>
            <div class="result" id="sql-output" style="text-align: left; font-family: monospace; white-space: pre-wrap; font-size: 12px;"></div>
        `;

        const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE'];

        document.getElementById('format-sql').onclick = () => {
            let sql = document.getElementById('sql-input').value;

            keywords.forEach(keyword => {
                const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                sql = sql.replace(regex, `\n${keyword}`);
            });

            sql = sql.replace(/,/g, ',\n  ');
            sql = sql.trim();

            document.getElementById('sql-output').textContent = sql;
        };

        document.getElementById('minify-sql').onclick = () => {
            const sql = document.getElementById('sql-input').value
                .replace(/\s+/g, ' ')
                .trim();
            document.getElementById('sql-output').textContent = sql;
        };
    }

    renderImageCompressor() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Image Quality Adjuster</h2>
            <input type="file" id="img-compress-upload" accept="image/*">
            <div style="margin: 20px 0;">
                <label>Quality: <span id="quality-value">80</span>%</label>
                <input type="range" id="quality-slider" min="10" max="100" value="80" style="width: 100%;">
            </div>
            <button id="compress-img">Adjust Quality</button>
            <div class="result" id="compress-output" style="text-align: left;"></div>
        `;

        document.getElementById('quality-slider').addEventListener('input', (e) => {
            document.getElementById('quality-value').textContent = e.target.value;
        });

        document.getElementById('compress-img').onclick = () => {
            const file = document.getElementById('img-compress-upload').files[0];
            if (!file) {
                alert('Please select an image');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    const quality = parseInt(document.getElementById('quality-slider').value) / 100;
                    const compressed = canvas.toDataURL('image/jpeg', quality);

                    const originalSize = (e.target.result.length / 1024).toFixed(2);
                    const compressedSize = (compressed.length / 1024).toFixed(2);
                    const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);

                    document.getElementById('compress-output').innerHTML = `
                        <div style="margin-bottom: 15px;">
                            <strong>Original:</strong> ${originalSize} KB<br>
                            <strong>Compressed:</strong> ${compressedSize} KB<br>
                            <strong>Savings:</strong> ${savings}%
                        </div>
                        <button onclick="
                            const a = document.createElement('a');
                            a.href = '${compressed}';
                            a.download = 'compressed.jpg';
                            a.click();
                        ">Download Compressed Image</button>
                    `;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
    }

    renderStopwatch() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Stopwatch & Lap Timer</h2>
            <div style="font-size: 64px; font-weight: bold; font-family: monospace; margin: 30px 0;" id="stopwatch-display">00:00:00.00</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
                <button id="sw-start">Start</button>
                <button id="sw-lap">Lap</button>
                <button id="sw-reset">Reset</button>
            </div>
            <div class="result" id="laps-output" style="text-align: left; max-height: 300px; overflow-y: auto;"></div>
        `;

        let startTime = 0;
        let elapsedTime = 0;
        let interval = null;
        let laps = [];

        const updateDisplay = () => {
            const total = Date.now() - startTime + elapsedTime;
            const ms = Math.floor((total % 1000) / 10);
            const s = Math.floor((total / 1000) % 60);
            const m = Math.floor((total / (1000 * 60)) % 60);
            const h = Math.floor(total / (1000 * 60 * 60));

            document.getElementById('stopwatch-display').textContent =
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
        };

        document.getElementById('sw-start').onclick = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
                elapsedTime += Date.now() - startTime;
                document.getElementById('sw-start').textContent = 'Resume';
            } else {
                startTime = Date.now();
                interval = setInterval(updateDisplay, 10);
                document.getElementById('sw-start').textContent = 'Pause';
            }
        };

        document.getElementById('sw-lap').onclick = () => {
            if (interval) {
                const lapTime = document.getElementById('stopwatch-display').textContent;
                laps.push(lapTime);
                const lapsHtml = laps.map((lap, i) =>
                    `<div style="padding: 8px; border-bottom: 1px solid #333;">Lap ${i + 1}: ${lap}</div>`
                ).join('');
                document.getElementById('laps-output').innerHTML = lapsHtml;
            }
        };

        document.getElementById('sw-reset').onclick = () => {
            clearInterval(interval);
            interval = null;
            startTime = 0;
            elapsedTime = 0;
            laps = [];
            document.getElementById('stopwatch-display').textContent = '00:00:00.00';
            document.getElementById('laps-output').innerHTML = '';
            document.getElementById('sw-start').textContent = 'Start';
        };
    }

    renderBMICalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Advanced BMI Calculator</h2>
            <select id="bmi-unit" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="metric">Metric (kg, cm)</option>
                <option value="imperial">Imperial (lbs, inches)</option>
            </select>
            <input type="number" id="bmi-weight" placeholder="Weight" step="0.1">
            <input type="number" id="bmi-height" placeholder="Height" step="0.1">
            <button id="calc-bmi">Calculate BMI</button>
            <div class="result" id="bmi-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-bmi').onclick = () => {
            const unit = document.getElementById('bmi-unit').value;
            let weight = parseFloat(document.getElementById('bmi-weight').value);
            let height = parseFloat(document.getElementById('bmi-height').value);

            if (!weight || !height) {
                alert('Please enter both weight and height');
                return;
            }

            if (unit === 'imperial') {
                weight = weight * 0.453592; // lbs to kg
                height = height * 2.54; // inches to cm
            }

            const heightM = height / 100;
            const bmi = weight / (heightM * heightM);

            let category, color;
            if (bmi < 18.5) { category = 'Underweight'; color = '#60a5fa'; }
            else if (bmi < 25) { category = 'Normal weight'; color = '#0f0'; }
            else if (bmi < 30) { category = 'Overweight'; color = '#fa0'; }
            else { category = 'Obese'; color = '#f00'; }

            const output = document.getElementById('bmi-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 48px; font-weight: bold; color: ${color}; margin-bottom: 20px;">
                    ${bmi.toFixed(1)}
                </div>
                <div style="font-size: 24px; margin-bottom: 20px;">${category}</div>
                <div style="font-size: 14px; color: #666;">
                    <div>Underweight: &lt; 18.5</div>
                    <div>Normal: 18.5 - 24.9</div>
                    <div>Overweight: 25 - 29.9</div>
                    <div>Obese: ≥ 30</div>
                </div>
            `;
        };
    }

    renderCurrencyFormatter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Currency Formatter</h2>
            <input type="number" id="currency-amount" placeholder="Enter amount" step="0.01">
            <select id="currency-code" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 10px;">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CNY">CNY - Chinese Yuan</option>
            </select>
            <select id="currency-locale" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px; margin-bottom: 20px;">
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="de-DE">German</option>
                <option value="fr-FR">French</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese</option>
            </select>
            <div class="result" id="currency-formatted" style="font-size: 36px; font-weight: bold;"></div>
        `;

        const format = () => {
            const amount = parseFloat(document.getElementById('currency-amount').value) || 0;
            const currency = document.getElementById('currency-code').value;
            const locale = document.getElementById('currency-locale').value;

            const formatted = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency
            }).format(amount);

            document.getElementById('currency-formatted').textContent = formatted;
        };

        document.getElementById('currency-amount').addEventListener('input', format);
        document.getElementById('currency-code').addEventListener('change', format);
        document.getElementById('currency-locale').addEventListener('change', format);
        format();
    }

    renderTextDiff() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Advanced Text Diff</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div>
                    <h3 style="margin-bottom: 10px;">Original Text</h3>
                    <textarea id="diff-text1" rows="10" placeholder="Enter original text..."></textarea>
                </div>
                <div>
                    <h3 style="margin-bottom: 10px;">Modified Text</h3>
                    <textarea id="diff-text2" rows="10" placeholder="Enter modified text..."></textarea>
                </div>
            </div>
            <button id="compare-diff">Compare</button>
            <div class="result" id="diff-output" style="text-align: left; white-space: pre-wrap; font-family: monospace; font-size: 12px;"></div>
        `;

        document.getElementById('compare-diff').onclick = () => {
            const text1 = document.getElementById('diff-text1').value.split('\n');
            const text2 = document.getElementById('diff-text2').value.split('\n');

            let html = '';
            const maxLines = Math.max(text1.length, text2.length);

            for (let i = 0; i < maxLines; i++) {
                const line1 = text1[i] || '';
                const line2 = text2[i] || '';

                if (line1 === line2) {
                    html += `<div style="padding: 5px; background: #1a1a1a;">${line1 || '(empty)'}</div>`;
                } else {
                    if (line1) html += `<div style="padding: 5px; background: #4a1a1a; color: #faa;">- ${line1}</div>`;
                    if (line2) html += `<div style="padding: 5px; background: #1a4a1a; color: #afa;">+ ${line2}</div>`;
                }
            }

            document.getElementById('diff-output').innerHTML = html || 'No differences found';
        };
    }

    renderUnicodeExplorer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Unicode Character Explorer</h2>
            <input type="text" id="unicode-input" placeholder="Enter text or paste character" maxlength="10">
            <div class="result" id="unicode-output" style="text-align: left;"></div>
        `;

        document.getElementById('unicode-input').addEventListener('input', (e) => {
            const text = e.target.value;
            if (!text) {
                document.getElementById('unicode-output').innerHTML = '';
                return;
            }

            let html = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const code = char.charCodeAt(0);
                const hex = code.toString(16).toUpperCase().padStart(4, '0');

                html += `
                    <div style="padding: 15px; background: #1a1a1a; border-radius: 8px; margin-bottom: 10px;">
                        <div style="font-size: 48px; margin-bottom: 10px;">${char}</div>
                        <div><strong>Character:</strong> ${char}</div>
                        <div><strong>Decimal:</strong> ${code}</div>
                        <div><strong>Hex:</strong> U+${hex}</div>
                        <div><strong>HTML Entity:</strong> &amp;#${code};</div>
                        <div><strong>CSS:</strong> \\${hex}</div>
                    </div>
                `;
            }

            document.getElementById('unicode-output').innerHTML = html;
        });
    }

    // === BATCH 7 - ELITE TOOL RENDERERS ===

    renderBase64Tool() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Base64 Encoder/Decoder</h2>
            <textarea id="base64-input" rows="8" placeholder="Enter text or Base64..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="encode-base64">Encode to Base64</button>
                <button id="decode-base64">Decode from Base64</button>
            </div>
            <div class="result" id="base64-output" style="min-height: 100px; text-align: left; word-break: break-all; font-family: monospace;"></div>
        `;

        document.getElementById('encode-base64').onclick = () => {
            const text = document.getElementById('base64-input').value;
            const encoded = btoa(unescape(encodeURIComponent(text)));
            document.getElementById('base64-output').textContent = encoded;
        };

        document.getElementById('decode-base64').onclick = () => {
            try {
                const text = document.getElementById('base64-input').value;
                const decoded = decodeURIComponent(escape(atob(text)));
                document.getElementById('base64-output').textContent = decoded;
            } catch (e) {
                document.getElementById('base64-output').textContent = 'Error: Invalid Base64 string';
            }
        };
    }

    renderURLEncoder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">URL Encoder/Decoder</h2>
            <textarea id="url-input" rows="8" placeholder="Enter URL or encoded URL..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <button id="encode-url">Encode URL</button>
                <button id="decode-url">Decode URL</button>
            </div>
            <div class="result" id="url-output" style="min-height: 100px; text-align: left; word-break: break-all; font-family: monospace;"></div>
        `;

        document.getElementById('encode-url').onclick = () => {
            const text = document.getElementById('url-input').value;
            const encoded = encodeURIComponent(text);
            document.getElementById('url-output').textContent = encoded;
        };

        document.getElementById('decode-url').onclick = () => {
            try {
                const text = document.getElementById('url-input').value;
                const decoded = decodeURIComponent(text);
                document.getElementById('url-output').textContent = decoded;
            } catch (e) {
                document.getElementById('url-output').textContent = 'Error: Invalid URL encoding';
            }
        };
    }

    renderJWTDecoder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JWT Decoder</h2>
            <textarea id="jwt-input" rows="6" placeholder="Paste JWT token here..."></textarea>
            <button id="decode-jwt">Decode JWT</button>
            <div class="result" id="jwt-output" style="text-align: left;"></div>
        `;

        document.getElementById('decode-jwt').onclick = () => {
            try {
                const jwt = document.getElementById('jwt-input').value.trim();
                const parts = jwt.split('.');

                if (parts.length !== 3) {
                    throw new Error('Invalid JWT format');
                }

                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));

                document.getElementById('jwt-output').innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <h3>Header</h3>
                        <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto;">${JSON.stringify(header, null, 2)}</pre>
                    </div>
                    <div>
                        <h3>Payload</h3>
                        <pre style="background: #1a1a1a; padding: 15px; border-radius: 8px; overflow-x: auto;">${JSON.stringify(payload, null, 2)}</pre>
                    </div>
                    <div style="margin-top: 15px; font-size: 12px; color: #f60;">
                        ⚠️ Note: Signature verification not performed
                    </div>
                `;
            } catch (e) {
                document.getElementById('jwt-output').innerHTML = `<div style="color: #f00;">Error: ${e.message}</div>`;
            }
        };
    }

    renderColorBlindness() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Blindness Simulator</h2>
            <input type="color" id="cb-color" value="#ff5733" style="width: 100%; height: 80px; margin-bottom: 20px;">
            <div class="result" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div>
                    <div style="font-size: 14px; margin-bottom: 5px;">Normal</div>
                    <div id="cb-normal" style="height: 80px; border-radius: 8px;"></div>
                </div>
                <div>
                    <div style="font-size: 14px; margin-bottom: 5px;">Protanopia (Red-blind)</div>
                    <div id="cb-protanopia" style="height: 80px; border-radius: 8px;"></div>
                </div>
                <div>
                    <div style="font-size: 14px; margin-bottom: 5px;">Deuteranopia (Green-blind)</div>
                    <div id="cb-deuteranopia" style="height: 80px; border-radius: 8px;"></div>
                </div>
                <div>
                    <div style="font-size: 14px; margin-bottom: 5px;">Tritanopia (Blue-blind)</div>
                    <div id="cb-tritanopia" style="height: 80px; border-radius: 8px;"></div>
                </div>
            </div>
        `;

        const simulate = () => {
            const color = document.getElementById('cb-color').value;
            document.getElementById('cb-normal').style.background = color;

            // Simplified simulation (not medically accurate, just for demonstration)
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);

            // Protanopia (red-blind)
            const pR = Math.round(0.567 * r + 0.433 * g);
            const pG = Math.round(0.558 * r + 0.442 * g);
            const pB = b;
            document.getElementById('cb-protanopia').style.background =
                `rgb(${pR}, ${pG}, ${pB})`;

            // Deuteranopia (green-blind)
            const dR = Math.round(0.625 * r + 0.375 * g);
            const dG = Math.round(0.7 * r + 0.3 * g);
            const dB = b;
            document.getElementById('cb-deuteranopia').style.background =
                `rgb(${dR}, ${dG}, ${dB})`;

            // Tritanopia (blue-blind)
            const tR = r;
            const tG = Math.round(0.95 * g + 0.05 * b);
            const tB = Math.round(0.433 * g + 0.567 * b);
            document.getElementById('cb-tritanopia').style.background =
                `rgb(${tR}, ${tG}, ${tB})`;
        };

        document.getElementById('cb-color').addEventListener('input', simulate);
        simulate();
    }

    renderTextToSpeech() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text to Speech</h2>
            <textarea id="tts-text" rows="8" placeholder="Enter text to speak..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr auto auto; gap: 10px; margin-bottom: 20px;">
                <select id="tts-voice" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px;">
                    <option>Loading voices...</option>
                </select>
                <input type="range" id="tts-rate" min="0.5" max="2" step="0.1" value="1" style="width: 150px;">
                <span id="rate-value">1.0x</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button id="speak-btn">Speak</button>
                <button id="stop-btn">Stop</button>
            </div>
        `;

        const synth = window.speechSynthesis;
        const populateVoices = () => {
            const voices = synth.getVoices();
            const select = document.getElementById('tts-voice');
            select.innerHTML = voices.map((voice, i) =>
                `<option value="${i}">${voice.name} (${voice.lang})</option>`
            ).join('');
        };

        populateVoices();
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = populateVoices;
        }

        document.getElementById('tts-rate').addEventListener('input', (e) => {
            document.getElementById('rate-value').textContent = `${e.target.value}x`;
        });

        document.getElementById('speak-btn').onclick = () => {
            const text = document.getElementById('tts-text').value;
            if (!text) return;

            const utterance = new SpeechSynthesisUtterance(text);
            const voices = synth.getVoices();
            const selectedVoice = parseInt(document.getElementById('tts-voice').value);
            utterance.voice = voices[selectedVoice];
            utterance.rate = parseFloat(document.getElementById('tts-rate').value);

            synth.speak(utterance);
        };

        document.getElementById('stop-btn').onclick = () => {
            synth.cancel();
        };
    }

    renderInvoiceCalculator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Invoice Calculator</h2>
            <div id="invoice-items"></div>
            <button id="add-item" style="margin-bottom: 20px;">+ Add Item</button>
            <div style="margin-bottom: 20px;">
                <label>Tax Rate (%): </label>
                <input type="number" id="tax-rate" value="0" min="0" max="100" step="0.1" style="width: 100px;">
            </div>
            <div class="result" style="text-align: left;">
                <div style="margin-bottom: 10px;"><strong>Subtotal:</strong> $<span id="subtotal">0.00</span></div>
                <div style="margin-bottom: 10px;"><strong>Tax:</strong> $<span id="tax-amount">0.00</span></div>
                <div style="font-size: 24px; font-weight: bold;"><strong>Total:</strong> $<span id="total">0.00</span></div>
            </div>
        `;

        let itemCount = 0;

        const calculate = () => {
            let subtotal = 0;
            document.querySelectorAll('.invoice-item').forEach(item => {
                const qty = parseFloat(item.querySelector('.qty').value) || 0;
                const price = parseFloat(item.querySelector('.price').value) || 0;
                subtotal += qty * price;
            });

            const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const tax = subtotal * (taxRate / 100);
            const total = subtotal + tax;

            document.getElementById('subtotal').textContent = subtotal.toFixed(2);
            document.getElementById('tax-amount').textContent = tax.toFixed(2);
            document.getElementById('total').textContent = total.toFixed(2);
        };

        const addItem = () => {
            itemCount++;
            const itemsDiv = document.getElementById('invoice-items');
            const itemDiv = document.createElement('div');
            itemDiv.className = 'invoice-item';
            itemDiv.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px;';
            itemDiv.innerHTML = `
                <input type="text" placeholder="Item description" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px;">
                <input type="number" class="qty" placeholder="Qty" value="1" min="0" step="1" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px;">
                <input type="number" class="price" placeholder="Price" value="0" min="0" step="0.01" style="padding: 12px; border: 1px solid #333; background: #1a1a1a; color: #fff; border-radius: 8px;">
                <button onclick="this.parentElement.remove(); window.invoiceCalc();" style="padding: 12px;">✕</button>
            `;
            itemsDiv.appendChild(itemDiv);

            itemDiv.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', calculate);
            });

            calculate();
        };

        window.invoiceCalc = calculate;

        document.getElementById('add-item').onclick = addItem;
        document.getElementById('tax-rate').addEventListener('input', calculate);

        addItem(); // Add first item
    }

    renderAgeInDays() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Age in Days Calculator</h2>
            <input type="date" id="birth-date">
            <button id="calc-age-days">Calculate</button>
            <div class="result" id="age-days-output" style="display: none; text-align: left;"></div>
        `;

        document.getElementById('calc-age-days').onclick = () => {
            const birthDate = new Date(document.getElementById('birth-date').value);
            const now = new Date();

            if (!birthDate || isNaN(birthDate)) {
                alert('Please select a valid date');
                return;
            }

            const diff = now - birthDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor(diff / (1000 * 60));
            const seconds = Math.floor(diff / 1000);

            const years = Math.floor(days / 365.25);
            const months = Math.floor((days % 365.25) / 30.44);
            const remainingDays = Math.floor((days % 365.25) % 30.44);

            const output = document.getElementById('age-days-output');
            output.style.display = 'block';
            output.innerHTML = `
                <div style="font-size: 48px; font-weight: bold; margin-bottom: 20px;">${days.toLocaleString()} days</div>
                <div style="margin-bottom: 10px;"><strong>Years:</strong> ${years}</div>
                <div style="margin-bottom: 10px;"><strong>Months:</strong> ${months}</div>
                <div style="margin-bottom: 10px;"><strong>Days:</strong> ${remainingDays}</div>
                <div style="margin-bottom: 10px;"><strong>Hours:</strong> ${hours.toLocaleString()}</div>
                <div style="margin-bottom: 10px;"><strong>Minutes:</strong> ${minutes.toLocaleString()}</div>
                <div><strong>Seconds:</strong> ${seconds.toLocaleString()}</div>
            `;
        };
    }

    renderFileHashGenerator() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">File Hash Generator</h2>
            <input type="file" id="hash-file">
            <button id="generate-hash">Generate Hash</button>
            <div class="result" id="hash-output" style="text-align: left; font-family: monospace; word-break: break-all;"></div>
        `;

        document.getElementById('generate-hash').onclick = async () => {
            const file = document.getElementById('hash-file').files[0];
            if (!file) {
                alert('Please select a file');
                return;
            }

            const arrayBuffer = await file.arrayBuffer();
            const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            document.getElementById('hash-output').innerHTML = `
                <div style="margin-bottom: 15px;">
                    <strong>File:</strong> ${file.name}<br>
                    <strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>SHA-256:</strong><br>
                    <div style="background: #1a1a1a; padding: 10px; border-radius: 8px; margin-top: 5px;">
                        ${hashHex}
                    </div>
                </div>
                <button onclick="navigator.clipboard.writeText('${hashHex}')">Copy Hash</button>
            `;
        };
    }

    renderSpeedTest() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Typing Speed Test</h2>
            <div class="result" id="test-text" style="font-size: 18px; line-height: 1.8; margin-bottom: 20px; padding: 20px; background: #1a1a1a; border-radius: 8px;"></div>
            <textarea id="typing-input" rows="5" placeholder="Start typing here..." disabled></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
                <button id="start-test">Start Test</button>
                <button id="reset-test">Reset</button>
            </div>
            <div class="result" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="wpm">0</div>
                    <div style="font-size: 12px; color: #666;">WPM</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="accuracy">100</div>
                    <div style="font-size: 12px; color: #666;">% Accuracy</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold;" id="time-left">60</div>
                    <div style="font-size: 12px; color: #666;">Seconds</div>
                </div>
            </div>
        `;

        const testTexts = [
            "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
            "A journey of a thousand miles begins with a single step. The only way to do great work is to love what you do.",
            "In the middle of difficulty lies opportunity. Success is not final, failure is not fatal: it is the courage to continue that counts."
        ];

        let startTime, interval, testText;

        document.getElementById('start-test').onclick = () => {
            testText = testTexts[Math.floor(Math.random() * testTexts.length)];
            document.getElementById('test-text').textContent = testText;
            document.getElementById('typing-input').value = '';
            document.getElementById('typing-input').disabled = false;
            document.getElementById('typing-input').focus();

            let timeLeft = 60;
            startTime = Date.now();

            interval = setInterval(() => {
                timeLeft--;
                document.getElementById('time-left').textContent = timeLeft;

                const typed = document.getElementById('typing-input').value;
                const words = typed.trim().split(/\s+/).length;
                const elapsed = (Date.now() - startTime) / 1000 / 60;
                const wpm = Math.round(words / elapsed);

                let correct = 0;
                for (let i = 0; i < Math.min(typed.length, testText.length); i++) {
                    if (typed[i] === testText[i]) correct++;
                }
                const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;

                document.getElementById('wpm').textContent = wpm;
                document.getElementById('accuracy').textContent = accuracy;

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    document.getElementById('typing-input').disabled = true;
                }
            }, 1000);
        };

        document.getElementById('reset-test').onclick = () => {
            clearInterval(interval);
            document.getElementById('test-text').textContent = '';
            document.getElementById('typing-input').value = '';
            document.getElementById('typing-input').disabled = true;
            document.getElementById('wpm').textContent = '0';
            document.getElementById('accuracy').textContent = '100';
            document.getElementById('time-left').textContent = '60';
        };
    }

    renderGradientText() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Gradient Text Generator</h2>
            <input type="text" id="gradient-text-input" placeholder="Enter text" value="Gradient Text">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                <input type="color" id="grad-text-color1" value="#667eea">
                <input type="color" id="grad-text-color2" value="#764ba2">
            </div>
            <div class="result" id="gradient-text-preview" style="font-size: 48px; font-weight: bold; min-height: 100px; display: flex; align-items: center; justify-content: center;"></div>
            <div class="result" style="text-align: left; font-family: monospace; font-size: 12px; word-break: break-all;" id="gradient-css-code"></div>
        `;

        const update = () => {
            const text = document.getElementById('gradient-text-input').value || 'Gradient Text';
            const color1 = document.getElementById('grad-text-color1').value;
            const color2 = document.getElementById('grad-text-color2').value;

            const preview = document.getElementById('gradient-text-preview');
            preview.textContent = text;
            preview.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
            preview.style.webkitBackgroundClip = 'text';
            preview.style.webkitTextFillColor = 'transparent';
            preview.style.backgroundClip = 'text';

            document.getElementById('gradient-css-code').textContent = `background: linear-gradient(90deg, ${color1}, ${color2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;`;
        };

        document.getElementById('gradient-text-input').addEventListener('input', update);
        document.getElementById('grad-text-color1').addEventListener('input', update);
        document.getElementById('grad-text-color2').addEventListener('input', update);
        update();
    }
}

// Initialize
new OmniTools();
