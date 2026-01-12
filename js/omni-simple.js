/**
 * 💎 Omni Tools - 210 ELITE TOOLS! 💎
 * 
 * BATCH 1-14: 190 tools across all categories
 * BATCH 15: ROI + BreakEven + Markup + Margin + VAT + Discount + CPM + Loan + CompoundInt + SalaryConv
 * BATCH 16: Circle + Sphere + Cylinder + Cone + Pythagorean + Triangle + Slope + Midpoint + Distance + Cube
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

        // Privacy Logic
        const privacyView = document.getElementById('privacy-view');
        if (privacyView) {
            const link = document.querySelector('a[href="#privacy"]');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    privacyView.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            }
            document.getElementById('close-privacy-btn').addEventListener('click', () => {
                privacyView.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
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
            },
            // === BATCH 8 - 130 TOOLS ===
            aspectRatio: {
                name: "Aspect Ratio Calculator",
                searchTerms: "aspect ratio screen dimensions calculator",
                description: "Calculate aspect ratios",
                icon: "🖥️",
                category: "Design",
                render: () => this.renderAspectRatio()
            },
            pixelRem: {
                name: "Pixels ↔ REM Converter",
                searchTerms: "pixels rem converter css units web",
                description: "Convert px to rem and vice versa",
                icon: "📏",
                category: "Developer",
                render: () => this.renderPixelRem()
            },
            chmod: {
                name: "Chmod Generator",
                searchTerms: "chmod permissions unix linux calculator",
                description: "Linux file permissions generator",
                icon: "🐧",
                category: "Developer",
                render: () => this.renderChmod()
            },
            csvMarkdown: {
                name: "CSV to Markdown",
                searchTerms: "csv markdown table converter",
                description: "Convert CSV to Markdown table",
                icon: "📋",
                category: "Developer",
                render: () => this.renderCsvMarkdown()
            },
            urlParser: {
                name: "URL Parser",
                searchTerms: "url parser query params hostname",
                description: "Parse URL components",
                icon: "🔗",
                category: "Developer",
                render: () => this.renderUrlParser()
            },
            gcdLcm: {
                name: "GCD & LCM Calculator",
                searchTerms: "gcd lcm math common divisor multiple",
                description: "Calculate GCD and LCM",
                icon: "🔢",
                category: "Math",
                render: () => this.renderGcdLcm()
            },
            primeFactors: {
                name: "Prime Factorization",
                searchTerms: "prime factors math factorization number",
                description: "Find prime factors of a number",
                icon: "🔢",
                category: "Math",
                render: () => this.renderPrimeFactors()
            },
            vigenere: {
                name: "Vigenère Cipher",
                searchTerms: "vigenere cipher encrypt decrypt secret",
                description: "Vigenère Polyalphabetic Cipher",
                icon: "🔐",
                category: "Security",
                render: () => this.renderVigenere()
            },
            rot13: {
                name: "ROT13 Cipher",
                searchTerms: "rot13 cipher secret text encrypt",
                description: "Simple ROT13 substitution",
                icon: "🔄",
                category: "Text",
                render: () => this.renderRot13()
            },
            palindrome: {
                name: "Palindrome Checker",
                searchTerms: "palindrome check text reverse word",
                description: "Check if text is palindrome",
                icon: "🔁",
                category: "Text",
                render: () => this.renderPalindrome()
            },
            // === BATCH 9 - 140 TOOLS (SCIENCE) ===
            ohmsLaw: {
                name: "Ohm's Law Calculator",
                searchTerms: "ohms law voltage current resistance power",
                description: "Calculate V, I, R, P",
                icon: "⚡",
                category: "Science",
                render: () => this.renderOhmsLaw()
            },
            resistorColor: {
                name: "Resistor Color Codes",
                searchTerms: "resistor color code calculator bands",
                description: "4-band resistor calculator",
                icon: "🌈",
                category: "Science",
                render: () => this.renderResistorColor()
            },
            kineticEnergy: {
                name: "Kinetic Energy",
                searchTerms: "kinetic energy physics joules mass velocity",
                description: "Calculate kinetic energy",
                icon: "⚛️",
                category: "Science",
                render: () => this.renderKineticEnergy()
            },
            powerConverter: {
                name: "Power Converter",
                searchTerms: "power watts hp horsepower kw convert",
                description: "Convert power units",
                icon: "🔋",
                category: "Converter",
                render: () => this.renderPowerConverter()
            },
            freqPeriod: {
                name: "Freq ↔ Period",
                searchTerms: "frequency period hertz seconds convert",
                description: "Convert frequency and period",
                icon: "〰️",
                category: "Science",
                render: () => this.renderFreqPeriod()
            },
            forceConverter: {
                name: "Force Converter",
                searchTerms: "force newtons dynes pound-force convert",
                description: "Convert force units",
                icon: "💪",
                category: "Converter",
                render: () => this.renderForceConverter()
            },
            torqueConverter: {
                name: "Torque Converter",
                searchTerms: "torque newton meter foot pound convert",
                description: "Convert torque units",
                icon: "🔧",
                category: "Converter",
                render: () => this.renderTorqueConverter()
            },
            densityCalc: {
                name: "Density Calculator",
                searchTerms: "density mass volume calculator physics",
                description: "Calculate density/mass/volume",
                icon: "🧱",
                category: "Science",
                render: () => this.renderDensityCalc()
            },
            accelerationCalc: {
                name: "Acceleration Calculator",
                searchTerms: "acceleration velocity time physics",
                description: "Calculate acceleration",
                icon: "🚀",
                category: "Science",
                render: () => this.renderAccelerationCalc()
            },
            velocityConverter: {
                name: "Velocity Converter",
                searchTerms: "velocity speed km/h mph m/s knots",
                description: "Convert velocity units",
                icon: "🏎️",
                category: "Converter",
                render: () => this.renderVelocityConverter()
            },
            // === BATCH 10 - 150 TOOLS (WEB/DEV) ===
            metaTags: {
                name: "Meta Tag Generator",
                searchTerms: "meta tags seo title description generator",
                description: "Generate SEO meta tags",
                icon: "🏷️",
                category: "Web",
                render: () => this.renderMetaTags()
            },
            htaccessGen: {
                name: ".htaccess Redirect",
                searchTerms: "htaccess redirect 301 generator apache",
                description: "Generate 301 redirects",
                icon: "⚙️",
                category: "Web",
                render: () => this.renderHtaccessGen()
            },
            robotsGen: {
                name: "Robots.txt Generator",
                searchTerms: "robots txt generator seo crawler",
                description: "Create robots.txt file",
                icon: "🤖",
                category: "Web",
                render: () => this.renderRobotsGen()
            },
            openGraph: {
                name: "Open Graph Generator",
                searchTerms: "open graph og meta tags social media",
                description: "Generate Open Graph tags",
                icon: "👍",
                category: "Web",
                render: () => this.renderOpenGraph()
            },
            twitterCard: {
                name: "Twitter Card Generator",
                searchTerms: "twitter card meta tags generator social",
                description: "Generate Twitter Cards",
                icon: "🐦",
                category: "Web",
                render: () => this.renderTwitterCard()
            },
            curlBuilder: {
                name: "Curl Command Builder",
                searchTerms: "curl command builder http request cli",
                description: "Build curl commands",
                icon: "💻",
                category: "Developer",
                render: () => this.renderCurlBuilder()
            },
            chmodSym: {
                name: "Symbolic Chmod",
                searchTerms: "chmod symbolic numeric converter permissions",
                description: "Convert rwx to 755",
                icon: "🐧",
                category: "Developer",
                render: () => this.renderChmodSym()
            },
            boxShadow: {
                name: "CSS Box Shadow",
                searchTerms: "css box shadow generator design",
                description: "Generate box-shadow CSS",
                icon: "👻",
                category: "Design",
                render: () => this.renderBoxShadow()
            },
            borderRadius: {
                name: "CSS Border Radius",
                searchTerms: "css border radius generator design rounded",
                description: "Generate border-radius CSS",
                icon: "⭕",
                category: "Design",
                render: () => this.renderBorderRadius()
            },
            cssFilter: {
                name: "CSS Filter Generator",
                searchTerms: "css filter blur contrast brightness saturate",
                description: "Generate CSS filters",
                icon: "📷",
                category: "Design",
                render: () => this.renderCssFilter()
            },
            // === BATCH 11 - 160 TOOLS (COLOR/DESIGN) ===
            colorMixer: {
                name: "Color Mixer",
                searchTerms: "color mixer mix hex blend rgb",
                description: "Mix two colors together",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorMixer()
            },
            colorHarmonies: {
                name: "Color Harmonies",
                searchTerms: "color harmony complementary analogous triad",
                description: "Generate color schemes",
                icon: "🎎",
                category: "Design",
                render: () => this.renderColorHarmonies()
            },
            contrastChecker: {
                name: "Contrast Checker",
                searchTerms: "contrast ratio a11y wcag accessibility",
                description: "Check text contrast ratio",
                icon: "🌗",
                category: "Design",
                render: () => this.renderContrastChecker()
            },
            gradientGen: {
                name: "Gradient Generator",
                searchTerms: "gradient generator css linear color",
                description: "Create CSS gradients",
                icon: "🌈",
                category: "Design",
                render: () => this.renderGradientGen()
            },
            shadeGen: {
                name: "Shade Generator",
                searchTerms: "shades tints generator color lighter darker",
                description: "Generate tints and shades",
                icon: "🌘",
                category: "Design",
                render: () => this.renderShadeGen()
            },
            imgColor: {
                name: "Image Color Picker",
                searchTerms: "image average dominant color picker",
                description: "Get dominant color from image",
                icon: "🖼️",
                category: "Design",
                render: () => this.renderImgColor()
            },
            hexToPms: {
                name: "Hex to PMS",
                searchTerms: "pantone pms hex converter match",
                description: "Approximate Pantone match",
                icon: "📒",
                category: "Converter",
                render: () => this.renderHexToPms()
            },
            cmykConv: {
                name: "CMYK Converter",
                searchTerms: "cmyk rgb hex converter print",
                description: "RGB/Hex to CMYK",
                icon: "🖨️",
                category: "Converter",
                render: () => this.renderCmykConv()
            },
            hslConv: {
                name: "HSL Converter",
                searchTerms: "hsl rgb hex converter color",
                description: "RGB/Hex to HSL",
                icon: "🎐",
                category: "Converter",
                render: () => this.renderHslConv()
            },
            colorBlind: {
                name: "Color Blindness Sim",
                searchTerms: "color blindness simulator protanopia deuteranopia",
                description: "Simulate color blindness",
                icon: "👁️",
                category: "Design",
                render: () => this.renderColorBlind()
            },
            // === BATCH 12 - 170 TOOLS (DEV/DATA) ===
            jsonVal: {
                name: "JSON Validator",
                searchTerms: "json validator format lint",
                description: "Validate and format JSON",
                icon: "✅",
                category: "Developer",
                render: () => this.renderJsonVal()
            },
            xmlFmt: {
                name: "XML Formatter",
                searchTerms: "xml formatter beautify pretty",
                description: "Beautify XML data",
                icon: "📰",
                category: "Developer",
                render: () => this.renderXmlFmt()
            },
            sqlMin: {
                name: "SQL Minifier",
                searchTerms: "sql minifier compress query database",
                description: "Minify SQL queries",
                icon: "🗄️",
                category: "Developer",
                render: () => this.renderSqlMin()
            },
            jsMin: {
                name: "JS Minifier",
                searchTerms: "javascript js minifier compress code",
                description: "Simple JS minifier",
                icon: "📜",
                category: "Developer",
                render: () => this.renderJsMin()
            },
            cssMin: {
                name: "CSS Minifier",
                searchTerms: "css minifier compress style",
                description: "Simple CSS minifier",
                icon: "🎨",
                category: "Developer",
                render: () => this.renderCssMin()
            },
            loremGen: {
                name: "Lorem Ipsum",
                searchTerms: "lorem ipsum generator text dummy placeholder",
                description: "Generate placeholder text",
                icon: "📝",
                category: "Text",
                render: () => this.renderLoremGen()
            },
            slugGen: {
                name: "Slug Generator",
                searchTerms: "slug url generator seo friendly",
                description: "Convert text to URL slug",
                icon: "🐌",
                category: "Web",
                render: () => this.renderSlugGen()
            },
            textDiff: {
                name: "Text Diff Checker",
                searchTerms: "text diff checker compare difference",
                description: "Compare two texts",
                icon: "⚖️",
                category: "Text",
                render: () => this.renderTextDiff()
            },
            emailObf: {
                name: "Email Obfuscator",
                searchTerms: "email obfuscate html entity spam protect",
                description: "Protect email from spambots",
                icon: "🛡️",
                category: "Web",
                render: () => this.renderEmailObf()
            },
            uuidGen: {
                name: "UUID Generator",
                searchTerms: "uuid guid generator v4 unique id",
                description: "Generate UUIDs (v4)",
                icon: "🆔",
                category: "Developer",
                render: () => this.renderUuidGen()
            },
            // === BATCH 13 - 180 TOOLS (STATISTICS) ===
            meanMedMode: {
                name: "Mean/Median/Mode",
                searchTerms: "mean median mode average statistics",
                description: "Calc central tendencies",
                icon: "📊",
                category: "Math",
                render: () => this.renderMeanMedMode()
            },
            stdDev: {
                name: "Standard Deviation",
                searchTerms: "standard deviation variance statistics population sample",
                description: "Calc SD and Variance",
                icon: "📉",
                category: "Math",
                render: () => this.renderStdDev()
            },
            permCalc: {
                name: "Permutations (nPr)",
                searchTerms: "permutations npr combinatorics math",
                description: "Calculate ordered subsets",
                icon: "🔢",
                category: "Math",
                render: () => this.renderPermCalc()
            },
            combCalc: {
                name: "Combinations (nCr)",
                searchTerms: "combinations ncr combinatorics math",
                description: "Calculate unordered subsets",
                icon: "🎱",
                category: "Math",
                render: () => this.renderCombCalc()
            },
            zScore: {
                name: "Z-Score Calculator",
                searchTerms: "z-score statistics probability normal distribution",
                description: "Calculate standard score",
                icon: "📐",
                category: "Math",
                render: () => this.renderZScore()
            },
            confInt: {
                name: "Confidence Interval",
                searchTerms: "confidence interval statistics mean sample",
                description: "Calc means confidence info",
                icon: "🖇️",
                category: "Math",
                render: () => this.renderConfInt()
            },
            marginErr: {
                name: "Margin of Error",
                searchTerms: "margin of error survey statistics",
                description: "Calculate survey error",
                icon: "🎯",
                category: "Math",
                render: () => this.renderMarginErr()
            },
            poissonDist: {
                name: "Poisson Distribution",
                searchTerms: "poisson distribution probability statistics",
                description: "Calc Poisson probability",
                icon: "🐟",
                category: "Math",
                render: () => this.renderPoissonDist()
            },
            geoMean: {
                name: "Geometric Mean",
                searchTerms: "geometric mean average growth rates",
                description: "Calculate geometric mean",
                icon: "✖️",
                category: "Math",
                render: () => this.renderGeoMean()
            },
            harMean: {
                name: "Harmonic Mean",
                searchTerms: "harmonic mean average rates",
                description: "Calculate harmonic mean",
                icon: "🎵",
                category: "Math",
                render: () => this.renderHarMean()
            },
            // === BATCH 14 - 190 TOOLS (RANDOM/STRING) ===
            listPicker: {
                name: "Random Picker",
                searchTerms: "random list picker choice generator",
                description: "Pick item from list",
                icon: "🎲",
                category: "Random",
                render: () => this.renderListPicker()
            },
            listShuffle: {
                name: "List Shuffler",
                searchTerms: "list shuffler random sort order",
                description: "Randomize list order",
                icon: "🔀",
                category: "Random",
                render: () => this.renderListShuffle()
            },
            randDate: {
                name: "Random Date",
                searchTerms: "random date generator time",
                description: "Generate random dates",
                icon: "📅",
                category: "Random",
                render: () => this.renderRandDate()
            },
            randTime: {
                name: "Random Time",
                searchTerms: "random time generator clock",
                description: "Generate random times",
                icon: "⌚",
                category: "Random",
                render: () => this.renderRandTime()
            },
            randMac: {
                name: "Random MAC",
                searchTerms: "random mac address generator network",
                description: "Generate MAC addresses",
                icon: "💻",
                category: "Random",
                render: () => this.renderRandMac()
            },
            randIp: {
                name: "Random IP",
                searchTerms: "random ip address generator network",
                description: "Generate IP addresses",
                icon: "🌐",
                category: "Random",
                render: () => this.renderRandIp()
            },
            strRev: {
                name: "String Reverser",
                searchTerms: "string reverse text backwards",
                description: "Reverse text characters",
                icon: "🔙",
                category: "Text",
                render: () => this.renderStrRev()
            },
            textRepeat: {
                name: "Text Repeater",
                searchTerms: "text repeater multiplier spam",
                description: "Repeat text N times",
                icon: "🔁",
                category: "Text",
                render: () => this.renderTextRepeat()
            },
            textTrunc: {
                name: "Text Truncator",
                searchTerms: "text truncator limit crop shorten",
                description: "Truncate text length",
                icon: "✂️",
                category: "Text",
                render: () => this.renderTextTrunc()
            },
            lineEnum: {
                name: "Line Numberer",
                searchTerms: "line number add text list",
                description: "Add line numbers to text",
                icon: "🔢",
                category: "Text",
                render: () => this.renderLineEnum()
            },
            // === BATCH 15 - 200 TOOLS (FINANCIAL) ===
            roiCalc: {
                name: "ROI Calculator",
                searchTerms: "roi return on investment finance money",
                description: "Calculate Return on Investment",
                icon: "💰",
                category: "Finance",
                render: () => this.renderRoiCalc()
            },
            breakEven: {
                name: "Break-Even Point",
                searchTerms: "break even point finance business cost revenue",
                description: "Calculate break-even units",
                icon: "⚖️",
                category: "Finance",
                render: () => this.renderBreakEven()
            },
            marginCalc: {
                name: "Margin Calculator",
                searchTerms: "margin profit gross revenue cost",
                description: "Calculate profit margin",
                icon: "📈",
                category: "Finance",
                render: () => this.renderMarginCalc()
            },
            markupCalc: {
                name: "Markup Calculator",
                searchTerms: "markup cost price profit",
                description: "Calculate price markup",
                icon: "🏷️",
                category: "Finance",
                render: () => this.renderMarkupCalc()
            },
            vatCalc: {
                name: "VAT/Sales Tax",
                searchTerms: "vat sales tax gst calculator",
                description: "Add or remove tax",
                icon: "🧾",
                category: "Finance",
                render: () => this.renderVatCalc()
            },
            discountCalc: {
                name: "Discount Calculator",
                searchTerms: "discount sale price off percent",
                description: "Calculate sale price",
                icon: "🛍️",
                category: "Finance",
                render: () => this.renderDiscountCalc()
            },
            cpmCalc: {
                name: "CPM Calculator",
                searchTerms: "cpm cost per mille advertising marketing",
                description: "Calculate Ad Cost Per 1000",
                icon: "📢",
                category: "Finance",
                render: () => this.renderCpmCalc()
            },
            loanCalc: {
                name: "Use Loan Calculator",
                searchTerms: "loan mortgage payment interest",
                description: "Calculate simple loan payment",
                icon: "🏦",
                category: "Finance",
                render: () => this.renderLoanCalc()
            },
            compInt: {
                name: "Compound Interest",
                searchTerms: "compound interest savings investment growth",
                description: "Calculate compound growth",
                icon: "🌲",
                category: "Finance",
                render: () => this.renderCompInt()
            },
            salaryConv: {
                name: "Salary to Hourly",
                searchTerms: "salary hourly wage pay converter",
                description: "Convert annual salary to hourly",
                icon: "💵",
                category: "Finance",
                render: () => this.renderSalaryConv()
            },
            // === BATCH 16 - 210 TOOLS (GEOMETRY) ===
            circleCalc: {
                name: "Circle Calculator",
                searchTerms: "circle area circumference radius diameter geometry",
                description: "Calc area and circumference",
                icon: "⭕",
                category: "Math",
                render: () => this.renderCircleCalc()
            },
            sphereCalc: {
                name: "Sphere Calculator",
                searchTerms: "sphere volume surface area radius geometry",
                description: "Calc volume and surface",
                icon: "🔮",
                category: "Math",
                render: () => this.renderSphereCalc()
            },
            cylinderCalc: {
                name: "Cylinder Calculator",
                searchTerms: "cylinder volume surface area height radius geometry",
                description: "Calc volume and surface",
                icon: "🛢️",
                category: "Math",
                render: () => this.renderCylinderCalc()
            },
            coneCalc: {
                name: "Cone Calculator",
                searchTerms: "cone volume surface area height radius geometry",
                description: "Calc volume and surface",
                icon: "🍦",
                category: "Math",
                render: () => this.renderConeCalc()
            },
            pythagorean: {
                name: "Pythagorean Calc",
                searchTerms: "pythagorean theorem triangle hypotenuse leg geometry",
                description: "Calculate right triangle side",
                icon: "📐",
                category: "Math",
                render: () => this.renderPythagorean()
            },
            triangleArea: {
                name: "Triangle Area",
                searchTerms: "triangle area herons formula side geometry",
                description: "Calc area from 3 sides",
                icon: "🔺",
                category: "Math",
                render: () => this.renderTriangleArea()
            },
            slopeCalc: {
                name: "Slope Calculator",
                searchTerms: "slope gradient line points geometry",
                description: "Calc slope between points",
                icon: "🏔️",
                category: "Math",
                render: () => this.renderSlopeCalc()
            },
            midpointCalc: {
                name: "Midpoint Calculator",
                searchTerms: "midpoint middle line points geometry",
                description: "Calc midpoint of line",
                icon: "📍",
                category: "Math",
                render: () => this.renderMidpointCalc()
            },
            distCalc: {
                name: "Distance Calculator",
                searchTerms: "distance points 2d geometry length",
                description: "Calc distance between points",
                icon: "📏",
                category: "Math",
                render: () => this.renderDistCalc()
            },
            cubeCalc: {
                name: "Cube Calculator",
                searchTerms: "cube volume surface area side geometry",
                description: "Calc volume and surface",
                icon: "🧊",
                category: "Math",
                render: () => this.renderCubeCalc()
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

    renderAspectRatio() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Aspect Ratio Calculator</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label>Width</label>
                    <input type="number" id="ar-w" placeholder="1920">
                </div>
                <div>
                    <label>Height</label>
                    <input type="number" id="ar-h" placeholder="1080">
                </div>
            </div>
            <button id="ar-calc">Calculate Ratio</button>
            <div class="result" id="ar-result"></div>
        `;
        document.getElementById('ar-calc').onclick = () => {
            const w = parseInt(document.getElementById('ar-w').value);
            const h = parseInt(document.getElementById('ar-h').value);
            if (!w || !h) return;
            const gcd = (a, b) => b ? gcd(b, a % b) : a;
            const d = gcd(w, h);
            const ratio = `${w / d}:${h / d}`;
            document.getElementById('ar-result').innerHTML = `
                <div style="font-size: 32px; font-weight: bold;">${ratio}</div>
                <div style="color: #888;">Decimal: ${(w / h).toFixed(2)}</div>
            `;
        };
    }

    renderPixelRem() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Pixels ↔ REM Converter</h2>
            <div style="margin-bottom: 20px;">Base Size: <input type="number" id="base-size" value="16" style="width: 80px; display: inline-block;"> px</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label>Pixels (px)</label>
                    <input type="number" id="px-input" placeholder="16">
                </div>
                <div>
                    <label>REM</label>
                    <input type="number" id="rem-input" placeholder="1">
                </div>
            </div>
        `;
        const base = document.getElementById('base-size');
        const px = document.getElementById('px-input');
        const rem = document.getElementById('rem-input');
        const update = (source) => {
            const b = parseFloat(base.value) || 16;
            if (source === 'px') {
                rem.value = (parseFloat(px.value) / b).toFixed(4).replace(/\.0+$/, '');
            } else {
                px.value = (parseFloat(rem.value) * b).toFixed(0);
            }
        };
        px.addEventListener('input', () => update('px'));
        rem.addEventListener('input', () => update('rem'));
        base.addEventListener('input', () => update('px'));
    }

    renderChmod() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Chmod Generator</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <th></th>
                    <th>Read (4)</th>
                    <th>Write (2)</th>
                    <th>Execute (1)</th>
                </tr>
                ${['Owner', 'Group', 'Public'].map(t => `
                    <tr>
                        <td style="padding: 10px;">${t}</td>
                        <td style="text-align: center;"><input type="checkbox" data-type="${t}" value="4"></td>
                        <td style="text-align: center;"><input type="checkbox" data-type="${t}" value="2"></td>
                        <td style="text-align: center;"><input type="checkbox" data-type="${t}" value="1"></td>
                    </tr>
                `).join('')}
            </table>
            <div class="result" id="chmod-result" style="font-family: monospace; font-size: 32px;">000</div>
            <div style="text-align: center; color: #888; font-family: monospace;" id="chmod-text">---------</div>
        `;
        const update = () => {
            let code = '';
            let text = '';
            ['Owner', 'Group', 'Public'].forEach(t => {
                let sum = 0;
                let r = '-', w = '-', x = '-';
                document.querySelectorAll(`input[data-type="${t}"]:checked`).forEach(chk => {
                    const v = parseInt(chk.value);
                    sum += v;
                    if (v === 4) r = 'r';
                    if (v === 2) w = 'w';
                    if (v === 1) x = 'x';
                });
                code += sum;
                text += r + w + x;
            });
            document.getElementById('chmod-result').textContent = code;
            document.getElementById('chmod-text').textContent = text;
        };
        document.querySelectorAll('input[type="checkbox"]').forEach(c => c.addEventListener('change', update));
    }

    renderCsvMarkdown() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSV to Markdown Table</h2>
            <textarea id="csv-input" rows="6" placeholder="Paste CSV here..."></textarea>
            <button id="csv-conv">Convert</button>
            <textarea id="md-output" rows="6" placeholder="Markdown will appear here..." readonly></textarea>
        `;
        document.getElementById('csv-conv').onclick = () => {
            const csv = document.getElementById('csv-input').value.trim();
            if (!csv) return;
            const rows = csv.split('\n');
            if (rows.length === 0) return;
            const header = rows[0].split(',').map(c => c.trim());
            let md = '| ' + header.join(' | ') + ' |\n';
            md += '| ' + header.map(() => '---').join(' | ') + ' |\n';
            for (let i = 1; i < rows.length; i++) {
                md += '| ' + rows[i].split(',').map(c => c.trim()).join(' | ') + ' |\n';
            }
            document.getElementById('md-output').value = md;
        };
    }

    renderUrlParser() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">URL Parser</h2>
            <input type="text" id="url-input" placeholder="https://example.com/path?query=1">
            <div class="result" id="url-result" style="text-align: left; display: none;"></div>
        `;
        document.getElementById('url-input').addEventListener('input', (e) => {
            try {
                const url = new URL(e.target.value);
                const result = document.getElementById('url-result');
                result.style.display = 'block';
                let params = '';
                url.searchParams.forEach((v, k) => params += `<div><span style="color: #888;">${k}:</span> ${v}</div>`);
                result.innerHTML = `
                    <div style="margin-bottom: 5px;"><strong>Protocol:</strong> ${url.protocol}</div>
                    <div style="margin-bottom: 5px;"><strong>Host:</strong> ${url.hostname}</div>
                    <div style="margin-bottom: 5px;"><strong>Path:</strong> ${url.pathname}</div>
                    ${params ? `<div style="margin-top: 10px; border-top: 1px solid #333; paddingTop: 10px;"><strong>Params:</strong>${params}</div>` : ''}
                `;
            } catch {
                document.getElementById('url-result').style.display = 'none';
            }
        });
    }

    renderGcdLcm() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">GCD & LCM Calculator</h2>
            <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
                <input type="number" id="gcd-a" placeholder="Number A">
                <input type="number" id="gcd-b" placeholder="Number B">
            </div>
            <div class="result">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <div style="font-size: 12px; color: #666;">GCD (Greatest Common Divisor)</div>
                        <div style="font-size: 24px; font-weight: bold;" id="res-gcd">-</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: #666;">LCM (Least Common Multiple)</div>
                        <div style="font-size: 24px; font-weight: bold;" id="res-lcm">-</div>
                    </div>
                </div>
            </div>
        `;
        const calc = () => {
            const a = parseInt(document.getElementById('gcd-a').value);
            const b = parseInt(document.getElementById('gcd-b').value);
            if (!a || !b) return;
            const gcd = (x, y) => y ? gcd(y, x % y) : x;
            const g = gcd(a, b);
            const l = (a * b) / g;
            document.getElementById('res-gcd').textContent = g;
            document.getElementById('res-lcm').textContent = l;
        };
        document.getElementById('gcd-a').addEventListener('input', calc);
        document.getElementById('gcd-b').addEventListener('input', calc);
    }

    renderPrimeFactors() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Prime Factorization</h2>
            <input type="number" id="prime-input" placeholder="Enter a number (e.g., 100)">
            <div class="result" id="prime-result"></div>
        `;
        document.getElementById('prime-input').addEventListener('input', (e) => {
            const n = parseInt(e.target.value);
            if (!n || n < 2) {
                document.getElementById('prime-result').textContent = 'Enter number > 1';
                return;
            }
            let d = 2;
            let temp = n;
            const factors = [];
            while (d * d <= temp) {
                while (temp % d === 0) {
                    factors.push(d);
                    temp /= d;
                }
                d++;
            }
            if (temp > 1) factors.push(temp);
            document.getElementById('prime-result').textContent = factors.join(' × ');
        });
    }

    renderVigenere() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Vigenère Cipher</h2>
            <textarea id="vig-text" rows="4" placeholder="Message"></textarea>
            <input type="text" id="vig-key" placeholder="Key (e.g., SECRET)">
            <div style="margin: 10px 0;">
                <button id="vig-enc">Encrypt</button>
                <button id="vig-dec">Decrypt</button>
            </div>
            <textarea id="vig-out" rows="4" readonly placeholder="Result"></textarea>
        `;
        const crypt = (enc) => {
            const text = document.getElementById('vig-text').value.toUpperCase().replace(/[^A-Z]/g, '');
            const key = document.getElementById('vig-key').value.toUpperCase().replace(/[^A-Z]/g, '');
            if (!text || !key) return;
            let res = '';
            for (let i = 0, j = 0; i < text.length; i++) {
                const c = text.charCodeAt(i);
                const k = key.charCodeAt(j % key.length);
                const shift = enc ? (c + k - 130) % 26 : (c - k + 26) % 26;
                res += String.fromCharCode(shift + 65);
                j++;
            }
            document.getElementById('vig-out').value = res;
        };
        document.getElementById('vig-enc').onclick = () => crypt(true);
        document.getElementById('vig-dec').onclick = () => crypt(false);
    }

    renderRot13() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">ROT13 Cipher</h2>
            <textarea id="rot-in" rows="5" placeholder="Type text here..."></textarea>
            <div class="result" id="rot-out" style="text-align: left; white-space: pre-wrap;"></div>
        `;
        document.getElementById('rot-in').addEventListener('input', (e) => {
            document.getElementById('rot-out').textContent = e.target.value.replace(/[a-zA-Z]/g, (c) => {
                const base = c <= 'Z' ? 65 : 97;
                return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
            });
        });
    }

    renderPalindrome() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Palindrome Checker</h2>
            <input type="text" id="pal-in" placeholder="racecar">
            <div class="result" id="pal-res"></div>
        `;
        document.getElementById('pal-in').addEventListener('input', (e) => {
            const raw = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!raw) {
                document.getElementById('pal-res').textContent = '...';
                return;
            }
            const rev = raw.split('').reverse().join('');
            const isPal = raw === rev;
            document.getElementById('pal-res').innerHTML = `
                <div style="font-size: 24px;">${isPal ? '✅ YES' : '❌ NO'}</div>
                <div style="color: #888; margin-top: 10px;">${rev}</div>
            `;
        });
    }

    renderOhmsLaw() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Ohm's Law Calculator</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 20px;">
                <input type="number" id="ohm-v" placeholder="Voltage (V)">
                <input type="number" id="ohm-i" placeholder="Current (A)">
                <input type="number" id="ohm-r" placeholder="Resistance (Ω)">
                <input type="number" id="ohm-p" placeholder="Power (W)">
            </div>
            <button id="ohm-calc" style="margin-top: 20px; width: 100%;">Calculate</button>
            <div style="margin-top: 20px; color: #888; font-size: 14px;">Enter any two values to calculate the others.</div>
        `;

        document.getElementById('ohm-calc').onclick = () => {
            const vIn = document.getElementById('ohm-v');
            const iIn = document.getElementById('ohm-i');
            const rIn = document.getElementById('ohm-r');
            const pIn = document.getElementById('ohm-p');

            let v = parseFloat(vIn.value);
            let i = parseFloat(iIn.value);
            let r = parseFloat(rIn.value);
            let p = parseFloat(pIn.value);

            if (!isNaN(v) && !isNaN(i)) { r = v / i; p = v * i; }
            else if (!isNaN(v) && !isNaN(r)) { i = v / r; p = (v * v) / r; }
            else if (!isNaN(v) && !isNaN(p)) { i = p / v; r = (v * v) / p; }
            else if (!isNaN(i) && !isNaN(r)) { v = i * r; p = i * i * r; }
            else if (!isNaN(i) && !isNaN(p)) { v = p / i; r = p / (i * i); }
            else if (!isNaN(p) && !isNaN(r)) { v = Math.sqrt(p * r); i = Math.sqrt(p / r); }

            if (!isNaN(v)) vIn.value = v.toFixed(4);
            if (!isNaN(i)) iIn.value = i.toFixed(4);
            if (!isNaN(r)) rIn.value = r.toFixed(4);
            if (!isNaN(p)) pIn.value = p.toFixed(4);
        };
    }

    renderResistorColor() {
        const content = document.getElementById('tool-content');
        const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
        content.innerHTML = `
            <h2 class="tool-title">Resistor Color Code (4-Band)</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                ${[1, 2, 3, 4].map(i => `
                    <select id="res-b${i}" style="flex: 1; background: #222;">
                        ${colors.map((c, idx) => `<option value="${idx}" style="background:${c};color:${c === 'black' ? 'white' : 'black'}">${c.toUpperCase()}</option>`).join('')}
                        ${i === 3 ? `<option value="-1" style="background:gold;color:black">GOLD (0.1)</option><option value="-2" style="background:silver;color:black">SILVER (0.01)</option>` : ''}
                        ${i === 4 ? `<option value="5" style="background:gold;color:black">GOLD 5%</option><option value="10" style="background:silver;color:black">SILVER 10%</option>` : ''}
                    </select>
                `).join('')}
            </div>
            <div class="result" id="res-val"></div>
        `;
        const calc = () => {
            const b1 = parseInt(document.getElementById('res-b1').value);
            const b2 = parseInt(document.getElementById('res-b2').value);
            const b3 = parseFloat(document.getElementById('res-b3').value);
            const b4 = document.getElementById('res-b4').value;

            let mult = Math.pow(10, b3);
            if (b3 === -1) mult = 0.1;
            if (b3 === -2) mult = 0.01;

            const base = (b1 * 10) + b2;
            const res = base * mult;

            let tol = '20%';
            if (b4 === '5') tol = '5%';
            if (b4 === '10') tol = '10%';

            let format = res + ' Ω';
            if (res >= 1000) format = (res / 1000).toFixed(2) + ' kΩ';
            if (res >= 1000000) format = (res / 1000000).toFixed(2) + ' MΩ';

            document.getElementById('res-val').innerHTML = `
                <div style="font-size: 32px; font-weight: bold;">${format}</div>
                <div style="color: #888;">Tolerance: ±${tol}</div>
            `;
        };
        [1, 2, 3, 4].forEach(i => document.getElementById(`res-b${i}`).addEventListener('change', calc));
        calc();
    }

    renderKineticEnergy() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Kinetic Energy Calculator</h2>
            <label>Mass (kg)</label>
            <input type="number" id="ke-m" placeholder="Mass">
            <label>Velocity (m/s)</label>
            <input type="number" id="ke-v" placeholder="Velocity">
            <div class="result" id="ke-res">0 Joules</div>
        `;
        const calc = () => {
            const m = parseFloat(document.getElementById('ke-m').value) || 0;
            const v = parseFloat(document.getElementById('ke-v').value) || 0;
            const ke = 0.5 * m * v * v;
            document.getElementById('ke-res').textContent = ke.toFixed(2) + ' Joules';
        };
        document.getElementById('ke-m').addEventListener('input', calc);
        document.getElementById('ke-v').addEventListener('input', calc);
    }

    renderPowerConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Power Converter</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div><label>Watts (W)</label><input type="number" id="p-w"></div>
                <div><label>Kilowatts (kW)</label><input type="number" id="p-kw"></div>
                <div><label>Horsepower (hp)</label><input type="number" id="p-hp"></div>
            </div>
        `;
        const w = document.getElementById('p-w');
        const kw = document.getElementById('p-kw');
        const hp = document.getElementById('p-hp');

        const update = (src) => {
            let val = 0;
            if (src === w) val = parseFloat(w.value);
            if (src === kw) val = parseFloat(kw.value) * 1000;
            if (src === hp) val = parseFloat(hp.value) * 745.7;

            if (isNaN(val)) return;

            if (src !== w) w.value = val.toFixed(2);
            if (src !== kw) kw.value = (val / 1000).toFixed(4);
            if (src !== hp) hp.value = (val / 745.7).toFixed(4);
        };

        w.addEventListener('input', () => update(w));
        kw.addEventListener('input', () => update(kw));
        hp.addEventListener('input', () => update(hp));
    }

    renderFreqPeriod() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Frequency ↔ Period</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div><label>Frequency (Hz)</label><input type="number" id="fp-f"></div>
                <div><label>Period (ms)</label><input type="number" id="fp-p"></div>
            </div>
        `;
        const f = document.getElementById('fp-f');
        const p = document.getElementById('fp-p');
        f.addEventListener('input', () => {
            const v = parseFloat(f.value);
            if (v) p.value = (1000 / v).toFixed(4);
        });
        p.addEventListener('input', () => {
            const v = parseFloat(p.value);
            if (v) f.value = (1000 / v).toFixed(4);
        });
    }

    renderForceConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
             <h2 class="tool-title">Force Converter</h2>
             <div style="margin-bottom: 10px"><label>Newtons (N)</label><input type="number" id="fc-n"></div>
             <div style="margin-bottom: 10px"><label>Pound-force (lbf)</label><input type="number" id="fc-lb"></div>
        `;
        const n = document.getElementById('fc-n');
        const lb = document.getElementById('fc-lb');
        n.addEventListener('input', () => lb.value = (parseFloat(n.value) * 0.224809).toFixed(4));
        lb.addEventListener('input', () => n.value = (parseFloat(lb.value) / 0.224809).toFixed(4));
    }

    renderTorqueConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
             <h2 class="tool-title">Torque Converter</h2>
             <div style="margin-bottom: 10px"><label>Newton Meter (Nm)</label><input type="number" id="tc-nm"></div>
             <div style="margin-bottom: 10px"><label>Foot Pound (ft-lb)</label><input type="number" id="tc-ft"></div>
        `;
        const nm = document.getElementById('tc-nm');
        const ft = document.getElementById('tc-ft');
        nm.addEventListener('input', () => ft.value = (parseFloat(nm.value) * 0.737562).toFixed(4));
        ft.addEventListener('input', () => nm.value = (parseFloat(ft.value) / 0.737562).toFixed(4));
    }

    renderDensityCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Density Calculator (ρ = m/V)</h2>
            <input type="number" id="dc-m" placeholder="Mass (kg)">
            <input type="number" id="dc-v" placeholder="Volume (m³)">
            <button id="dc-calc">Calculate Density</button>
            <div class="result" id="dc-res"></div>
        `;
        document.getElementById('dc-calc').onclick = () => {
            const m = parseFloat(document.getElementById('dc-m').value);
            const v = parseFloat(document.getElementById('dc-v').value);
            if (m && v) document.getElementById('dc-res').textContent = (m / v).toFixed(4) + ' kg/m³';
        };
    }

    renderAccelerationCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Acceleration (a = Δv/t)</h2>
            <input type="number" id="ac-v1" placeholder="Initial Velocity (m/s)">
            <input type="number" id="ac-v2" placeholder="Final Velocity (m/s)">
            <input type="number" id="ac-t" placeholder="Time (s)">
            <button id="ac-calc">Calculate</button>
            <div class="result" id="ac-res"></div>
        `;
        document.getElementById('ac-calc').onclick = () => {
            const v1 = parseFloat(document.getElementById('ac-v1').value);
            const v2 = parseFloat(document.getElementById('ac-v2').value);
            const t = parseFloat(document.getElementById('ac-t').value);
            if (!isNaN(v1) && !isNaN(v2) && t) {
                document.getElementById('ac-res').textContent = ((v2 - v1) / t).toFixed(4) + ' m/s²';
            }
        };
    }

    renderVelocityConverter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Velocity Converter</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div><label>m/s</label><input type="number" id="vc-ms"></div>
                <div><label>km/h</label><input type="number" id="vc-kmh"></div>
                <div><label>mph</label><input type="number" id="vc-mph"></div>
                <div><label>knots</label><input type="number" id="vc-kn"></div>
            </div>
        `;
        const ms = document.getElementById('vc-ms');
        const kmh = document.getElementById('vc-kmh');
        const mph = document.getElementById('vc-mph');
        const kn = document.getElementById('vc-kn');

        const upd = (val) => {
            if (isNaN(val)) return;
            ms.value = val;
            kmh.value = (val * 3.6).toFixed(2);
            mph.value = (val * 2.23694).toFixed(2);
            kn.value = (val * 1.94384).toFixed(2);
        };

        ms.addEventListener('input', () => upd(parseFloat(ms.value)));
        kmh.addEventListener('input', () => upd(parseFloat(kmh.value) / 3.6));
        mph.addEventListener('input', () => upd(parseFloat(mph.value) / 2.23694));
        kn.addEventListener('input', () => upd(parseFloat(kn.value) / 1.94384));
    }

    renderMetaTags() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Meta Tag Generator</h2>
            <input type="text" id="mt-title" placeholder="Site Title">
            <input type="text" id="mt-desc" placeholder="Site Description">
            <input type="text" id="mt-keys" placeholder="Keywords (comma separated)">
            <input type="text" id="mt-auth" placeholder="Author">
            <button id="mt-gen">Generate</button>
            <textarea id="mt-out" rows="6" readonly></textarea>
        `;
        document.getElementById('mt-gen').onclick = () => {
            const t = document.getElementById('mt-title').value;
            const d = document.getElementById('mt-desc').value;
            const k = document.getElementById('mt-keys').value;
            const a = document.getElementById('mt-auth').value;
            document.getElementById('mt-out').value =
                `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t}</title>
<meta name="description" content="${d}">
<meta name="keywords" content="${k}">
<meta name="author" content="${a}">`;
        };
    }

    renderHtaccessGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">.htaccess Redirect Generator</h2>
            <input type="text" id="ht-old" placeholder="Old Path (e.g., /old-page.html)">
            <input type="text" id="ht-new" placeholder="New URL (e.g., https://site.com/new)">
            <button id="ht-gen">Generate 301</button>
            <div class="result" id="ht-out" style="font-family:monospace; text-align:left;"></div>
        `;
        document.getElementById('ht-gen').onclick = () => {
            const o = document.getElementById('ht-old').value;
            const n = document.getElementById('ht-new').value;
            document.getElementById('ht-out').textContent = `Redirect 301 ${o} ${n}`;
        };
    }

    renderRobotsGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Robots.txt Generator</h2>
            <div style="margin-bottom: 10px;">
                <label>Default Access:</label>
                <select id="rb-acc"><option value="Allow">Allow All</option><option value="Disallow">Disallow All</option></select>
            </div>
            <textarea id="rb-dis" rows="4" placeholder="Disallowed paths (one per line)"></textarea>
            <button id="rb-gen">Generate</button>
            <textarea id="rb-out" rows="6" readonly style="margin-top: 20px;"></textarea>
        `;
        document.getElementById('rb-gen').onclick = () => {
            let out = 'User-agent: *\n';
            const acc = document.getElementById('rb-acc').value;
            if (acc === 'Disallow') out += 'Disallow: /\n';
            else {
                const lines = document.getElementById('rb-dis').value.split('\n');
                lines.forEach(l => { if (l.trim()) out += `Disallow: ${l.trim()}\n`; });
            }
            document.getElementById('rb-out').value = out;
        };
    }

    renderOpenGraph() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Open Graph Generator</h2>
            <input type="text" id="og-title" placeholder="Title">
            <input type="text" id="og-type" placeholder="Type (e.g., website)">
            <input type="text" id="og-url" placeholder="URL">
            <input type="text" id="og-img" placeholder="Image URL">
            <input type="text" id="og-desc" placeholder="Description">
            <button id="og-gen">Generate</button>
            <textarea id="og-out" rows="6" readonly></textarea>
        `;
        document.getElementById('og-gen').onclick = () => {
            const t = document.getElementById('og-title').value;
            const type = document.getElementById('og-type').value;
            const u = document.getElementById('og-url').value;
            const i = document.getElementById('og-img').value;
            const d = document.getElementById('og-desc').value;
            document.getElementById('og-out').value =
                `<meta property="og:title" content="${t}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${u}" />
<meta property="og:image" content="${i}" />
<meta property="og:description" content="${d}" />`;
        };
    }

    renderTwitterCard() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Twitter Card Generator</h2>
            <input type="text" id="tw-title" placeholder="Title">
            <input type="text" id="tw-desc" placeholder="Description">
            <input type="text" id="tw-img" placeholder="Image URL">
            <button id="tw-gen">Generate</button>
            <textarea id="tw-out" rows="6" readonly></textarea>
        `;
        document.getElementById('tw-gen').onclick = () => {
            const t = document.getElementById('tw-title').value;
            const d = document.getElementById('tw-desc').value;
            const i = document.getElementById('tw-img').value;
            document.getElementById('tw-out').value =
                `<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${i}">`;
        };
    }

    renderCurlBuilder() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Curl Command Builder</h2>
            <input type="text" id="cl-url" placeholder="URL">
            <select id="cl-method" style="margin-bottom: 10px;">
                <option value="GET">GET</option><option value="POST">POST</option><option value="PUT">PUT</option><option value="DELETE">DELETE</option>
            </select>
            <textarea id="cl-data" rows="3" placeholder="JSON Data (for POST/PUT)"></textarea>
            <input type="text" id="cl-auth" placeholder="Bearer Token (optional)">
            <button id="cl-gen">Build Command</button>
            <textarea id="cl-out" rows="4" readonly></textarea>
        `;
        document.getElementById('cl-gen').onclick = () => {
            const u = document.getElementById('cl-url').value;
            const m = document.getElementById('cl-method').value;
            const d = document.getElementById('cl-data').value;
            const a = document.getElementById('cl-auth').value;
            let cmd = `curl -X ${m} "${u}"`;
            if (a) cmd += ` -H "Authorization: Bearer ${a}"`;
            if (d && (m === 'POST' || m === 'PUT')) {
                cmd += ` -H "Content-Type: application/json" -d '${d}'`;
            }
            document.getElementById('cl-out').value = cmd;
        };
    }

    renderChmodSym() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Symbolic Chmod Converter</h2>
            <input type="text" id="sy-in" placeholder="e.g. rwxr-xr-x">
            <div class="result" id="sy-out"></div>
        `;
        document.getElementById('sy-in').addEventListener('input', (e) => {
            const s = e.target.value;
            if (s.length !== 9) {
                document.getElementById('sy-out').textContent = 'Invalid length';
                return;
            }
            const map = { 'r': 4, 'w': 2, 'x': 1, '-': 0 };
            let res = '';
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += map[s[i * 3 + j]] || 0;
                }
                res += sum;
            }
            document.getElementById('sy-out').textContent = res;
        });
    }

    renderBoxShadow() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSS Box Shadow</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label>H-Offset <input type="range" id="bs-h" min="-50" max="50" value="10"></label>
                <label>V-Offset <input type="range" id="bs-v" min="-50" max="50" value="10"></label>
                <label>Blur <input type="range" id="bs-b" min="0" max="100" value="5"></label>
                <label>Spread <input type="range" id="bs-s" min="-50" max="50" value="0"></label>
                <label>Color <input type="color" id="bs-c" value="#000000"></label>
            </div>
            <div id="bs-preview" style="width: 100px; height: 100px; background: white; margin: 20px auto; border: 1px solid #333;"></div>
            <div class="result" id="bs-code"></div>
        `;
        const update = () => {
            const h = document.getElementById('bs-h').value + 'px';
            const v = document.getElementById('bs-v').value + 'px';
            const b = document.getElementById('bs-b').value + 'px';
            const s = document.getElementById('bs-s').value + 'px';
            const c = document.getElementById('bs-c').value;
            const css = `${h} ${v} ${b} ${s} ${c}`;
            document.getElementById('bs-preview').style.boxShadow = css;
            document.getElementById('bs-code').textContent = `box-shadow: ${css};`;
        };
        ['bs-h', 'bs-v', 'bs-b', 'bs-s', 'bs-c'].forEach(id => document.getElementById(id).addEventListener('input', update));
        update();
    }

    renderBorderRadius() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSS Border Radius</h2>
            <input type="range" id="br-r" min="0" max="50" value="10" style="width: 100%;">
            <div id="br-preview" style="width: 100px; height: 100px; background: white; margin: 20px auto; border: 1px solid #333;"></div>
            <div class="result" id="br-code"></div>
        `;
        document.getElementById('br-r').addEventListener('input', (e) => {
            const v = e.target.value + 'px';
            document.getElementById('br-preview').style.borderRadius = v;
            document.getElementById('br-code').textContent = `border-radius: ${v};`;
        });
    }

    renderCssFilter() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSS Filter Generator</h2>
            <label>Blur <input type="range" id="cf-b" min="0" max="20" value="0"></label>
            <label>Grayscale <input type="range" id="cf-g" min="0" max="100" value="0"></label>
            <div id="cf-preview" style="width: 100px; height: 100px; background: linear-gradient(45deg, red, blue); margin: 20px auto;"></div>
            <div class="result" id="cf-code"></div>
        `;
        const upd = () => {
            const b = document.getElementById('cf-b').value + 'px';
            const g = document.getElementById('cf-g').value + '%';
            const val = `blur(${b}) grayscale(${g})`;
            document.getElementById('cf-preview').style.filter = val;
            document.getElementById('cf-code').textContent = `filter: ${val};`;
        };
        ['cf-b', 'cf-g'].forEach(id => document.getElementById(id).addEventListener('input', upd));
        upd();
    }

    renderColorMixer() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Mixer</h2>
            <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 20px;">
                <input type="color" id="cm-c1" value="#ff0000">
                <input type="color" id="cm-c2" value="#0000ff">
            </div>
            <div style="margin-bottom: 20px;">
                <label>Mix Ratio: <span id="cm-val">50%</span></label>
                <input type="range" id="cm-ratio" min="0" max="100" value="50">
            </div>
            <div id="cm-res" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; border: 2px solid #fff;"></div>
            <div class="result" id="cm-hex"></div>
        `;
        const hex = (x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        const mix = () => {
            const c1 = document.getElementById('cm-c1').value;
            const c2 = document.getElementById('cm-c2').value;
            const r = parseInt(document.getElementById('cm-ratio').value) / 100;
            document.getElementById('cm-val').textContent = Math.round(r * 100) + '%';

            const r1 = parseInt(c1.substring(1, 3), 16);
            const g1 = parseInt(c1.substring(3, 5), 16);
            const b1 = parseInt(c1.substring(5, 7), 16);

            const r2 = parseInt(c2.substring(1, 3), 16);
            const g2 = parseInt(c2.substring(3, 5), 16);
            const b2 = parseInt(c2.substring(5, 7), 16);

            const r3 = Math.round(r1 * (1 - r) + r2 * r);
            const g3 = Math.round(g1 * (1 - r) + g2 * r);
            const b3 = Math.round(b1 * (1 - r) + b2 * r);

            const res = `#${hex(r3)}${hex(g3)}${hex(b3)}`;
            document.getElementById('cm-res').style.backgroundColor = res;
            document.getElementById('cm-hex').textContent = res.toUpperCase();
        };
        ['cm-c1', 'cm-c2', 'cm-ratio'].forEach(id => document.getElementById(id).addEventListener('input', mix));
        mix();
    }

    renderColorHarmonies() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Harmonies</h2>
            <input type="color" id="ch-base" value="#3498db" style="width: 100px; height: 50px;">
            <div style="margin-top: 20px;">
                <h3>Complementary</h3>
                <div id="ch-comp" style="display: flex; height: 50px; margin-top: 10px;"></div>
                <h3 style="margin-top: 20px;">Analogous</h3>
                <div id="ch-ana" style="display: flex; height: 50px; margin-top: 10px;"></div>
                <h3 style="margin-top: 20px;">Triadic</h3>
                <div id="ch-tri" style="display: flex; height: 50px; margin-top: 10px;"></div>
            </div>
        `;
        const hslToHex = (h, s, l) => {
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        };
        const hexToHsl = (H) => {
            let r = 0, g = 0, b = 0;
            if (H.length == 4) {
                r = "0x" + H[1] + H[1];
                g = "0x" + H[2] + H[2];
                b = "0x" + H[3] + H[3];
            } else if (H.length == 7) {
                r = "0x" + H[1] + H[2];
                g = "0x" + H[3] + H[4];
                b = "0x" + H[5] + H[6];
            }
            r /= 255; g /= 255; b /= 255;
            let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
            if (delta == 0) h = 0;
            else if (cmax == r) h = ((g - b) / delta) % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);
            return { h, s, l };
        };
        const gen = () => {
            const base = document.getElementById('ch-base').value;
            const { h, s, l } = hexToHsl(base);

            // Comp
            const comp = hslToHex((h + 180) % 360, s, l);
            document.getElementById('ch-comp').innerHTML = `<div style="flex:1;bg:${base};background:${base}"></div><div style="flex:1;bg:${comp};background:${comp}"></div>`;

            // Ana
            const a1 = hslToHex((h + 30) % 360, s, l);
            const a2 = hslToHex((h - 30 + 360) % 360, s, l);
            document.getElementById('ch-ana').innerHTML = `<div style="flex:1;background:${a2}"></div><div style="flex:1;background:${base}"></div><div style="flex:1;background:${a1}"></div>`;

            // Tri
            const t1 = hslToHex((h + 120) % 360, s, l);
            const t2 = hslToHex((h + 240) % 360, s, l);
            document.getElementById('ch-tri').innerHTML = `<div style="flex:1;background:${base}"></div><div style="flex:1;background:${t1}"></div><div style="flex:1;background:${t2}"></div>`;
        };
        document.getElementById('ch-base').addEventListener('input', gen);
        gen();
    }

    renderContrastChecker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Contrast Checker</h2>
            <div style="display: flex; gap: 20px; justify-content: center; margin-bottom: 20px;">
                <div><label>Background</label><input type="color" id="cc-bg" value="#ffffff"></div>
                <div><label>Text Color</label><input type="color" id="cc-fg" value="#000000"></div>
            </div>
            <div id="cc-preview" style="padding: 20px; border: 1px solid #333; text-align: center; font-size: 24px;">
                Sample Text
            </div>
            <div class="result" id="cc-res"></div>
        `;
        const getLum = (hex) => {
            const rgb = parseInt(hex.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            const a = [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        };
        const calc = () => {
            const bg = document.getElementById('cc-bg').value;
            const fg = document.getElementById('cc-fg').value;
            const lum1 = getLum(bg);
            const lum2 = getLum(fg);
            const bright = Math.max(lum1, lum2);
            const dark = Math.min(lum1, lum2);
            const ratio = (bright + 0.05) / (dark + 0.05);

            const p = document.getElementById('cc-preview');
            p.style.backgroundColor = bg;
            p.style.color = fg;

            let grade = 'Fail';
            if (ratio >= 4.5) grade = 'AA (Pass)';
            if (ratio >= 7) grade = 'AAA (Perfect)';

            document.getElementById('cc-res').innerHTML = `
                <div style="font-size: 32px; font-weight: bold;">${ratio.toFixed(2)}:1</div>
                <div>${grade}</div>
            `;
        };
        document.getElementById('cc-bg').addEventListener('input', calc);
        document.getElementById('cc-fg').addEventListener('input', calc);
        calc();
    }

    renderGradientGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Gradient Generator</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="color" id="gg-c1" value="#ff0000">
                <input type="color" id="gg-c2" value="#0000ff">
            </div>
            <input type="range" id="gg-deg" min="0" max="360" value="90">
            <div id="gg-preview" style="height: 150px; margin: 20px 0; border: 1px solid #333;"></div>
            <div class="result" id="gg-code"></div>
        `;
        const upd = () => {
            const c1 = document.getElementById('gg-c1').value;
            const c2 = document.getElementById('gg-c2').value;
            const deg = document.getElementById('gg-deg').value;
            const css = `linear-gradient(${deg}deg, ${c1}, ${c2})`;
            document.getElementById('gg-preview').style.background = css;
            document.getElementById('gg-code').textContent = `background: ${css};`;
        };
        ['gg-c1', 'gg-c2', 'gg-deg'].forEach(id => document.getElementById(id).addEventListener('input', upd));
        upd();
    }

    renderShadeGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Shade & Tint Generator</h2>
            <input type="color" id="sg-c" value="#2ecc71">
            <div id="sg-res" style="display: flex; flex-wrap: wrap; margin-top: 20px;"></div>
        `;
        const shade = (col, amt) => {
            let usePound = false;
            if (col[0] == "#") {
                col = col.slice(1);
                usePound = true;
            }
            let num = parseInt(col, 16);
            let r = (num >> 16) + amt;
            if (r > 255) r = 255; else if (r < 0) r = 0;
            let b = ((num >> 8) & 0x00FF) + amt;
            if (b > 255) b = 255; else if (b < 0) b = 0;
            let g = (num & 0x0000FF) + amt;
            if (g > 255) g = 255; else if (g < 0) g = 0;
            return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
        }
        const gen = () => {
            const c = document.getElementById('sg-c').value;
            let html = '';
            for (let i = -100; i <= 100; i += 20) {
                try {
                    const s = shade(c, i);
                    html += `<div style="width: 50px; height: 50px; background: ${s};" title="${s}"></div>`;
                } catch (e) { }
            }
            document.getElementById('sg-res').innerHTML = html;
        };
        document.getElementById('sg-c').addEventListener('input', gen);
        gen();
    }

    renderImgColor() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Image Color Picker</h2>
            <input type="file" id="ic-file" accept="image/*">
            <canvas id="ic-canvas" style="max-width: 100%; display: none; margin-top: 20px; cursor: crosshair;"></canvas>
            <div class="result" id="ic-res">Upload an image</div>
        `;
        const cnv = document.getElementById('ic-canvas');
        const file = document.getElementById('ic-file');
        const ctx = cnv.getContext('2d');

        file.addEventListener('change', (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    cnv.width = img.width;
                    cnv.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    cnv.style.display = 'block';
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        cnv.addEventListener('mousemove', (e) => {
            const rect = cnv.getBoundingClientRect();
            const x = (e.clientX - rect.left) * (cnv.width / rect.width);
            const y = (e.clientY - rect.top) * (cnv.height / rect.height);
            const p = ctx.getImageData(x, y, 1, 1).data;
            const hex = "#" + ("000000" + ((p[0] << 16) | (p[1] << 8) | p[2]).toString(16)).slice(-6);
            document.getElementById('ic-res').innerHTML = `<div style="width:30px;height:30px;background:${hex};display:inline-block;vertical-align:middle;margin-right:10px;"></div>${hex.toUpperCase()} RGB(${p[0]},${p[1]},${p[2]})`;
        });
    }

    renderHexToPms() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Hex to PMS (Approx)</h2>
            <input type="color" id="hp-c" value="#ff0000">
            <div class="result" id="hp-res">Select a color</div>
        `;
        // Tiny subset of Pantone for demo
        const pms = {
            '#FF0000': 'PMS 485 C', '#0000FF': 'PMS Blue 072 C', '#00FF00': 'PMS 354 C',
            '#FFFF00': 'PMS 102 C', '#000000': 'PMS Black 6 C', '#FFFFFF': 'PMS White'
        };
        document.getElementById('hp-c').addEventListener('input', (e) => {
            const v = e.target.value.toUpperCase();
            // In a real app we'd find nearest color distance
            document.getElementById('hp-res').textContent = pms[v] || "PMS Approx: Close Match Finder Not Loaded (Demo)";
        });
    }

    renderCmykConv() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">RGB to CMYK</h2>
            <div style="display:flex; gap:10px">
                <input type="number" id="rc-r" placeholder="R" max="255">
                <input type="number" id="rc-g" placeholder="G" max="255">
                <input type="number" id="rc-b" placeholder="B" max="255">
            </div>
            <button id="rc-calc">Convert</button>
            <div class="result" id="rc-res"></div>
        `;
        document.getElementById('rc-calc').onclick = () => {
            let r = document.getElementById('rc-r').value / 255;
            let g = document.getElementById('rc-g').value / 255;
            let b = document.getElementById('rc-b').value / 255;
            let k = 1 - Math.max(r, g, b);
            let c = (1 - r - k) / (1 - k) || 0;
            let m = (1 - g - k) / (1 - k) || 0;
            let y = (1 - b - k) / (1 - k) || 0;
            document.getElementById('rc-res').textContent = `C:${(c * 100).toFixed(0)}% M:${(m * 100).toFixed(0)}% Y:${(y * 100).toFixed(0)}% K:${(k * 100).toFixed(0)}%`;
        };
    }

    renderHslConv() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">RGB to HSL</h2>
            <div style="display:flex; gap:10px">
                <input type="number" id="hc-r" placeholder="R" max="255">
                <input type="number" id="hc-g" placeholder="G" max="255">
                <input type="number" id="hc-b" placeholder="B" max="255">
            </div>
            <button id="hc-calc">Convert</button>
            <div class="result" id="hc-res"></div>
        `;
        document.getElementById('hc-calc').onclick = () => {
            let r = document.getElementById('hc-r').value / 255;
            let g = document.getElementById('hc-g').value / 255;
            let b = document.getElementById('hc-b').value / 255;
            let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
            let h = 0, s = 0, l = 0;
            if (delta == 0) h = 0;
            else if (cmax == r) h = ((g - b) / delta) % 6;
            else if (cmax == g) h = (b - r) / delta + 2;
            else h = (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0) h += 360;
            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            document.getElementById('hc-res').textContent = `H:${h}° S:${(s * 100).toFixed(1)}% L:${(l * 100).toFixed(1)}%`;
        };
    }

    renderColorBlind() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Color Blindness Simulator</h2>
            <p>Upload an image to simulate.</p>
            <input type="file" id="cb-file" accept="image/*">
            <select id="cb-type" style="margin-top: 10px;">
                <option value="protanopia">Protanopia (No Red)</option>
                <option value="deuteranopia">Deuteranopia (No Green)</option>
                <option value="tritanopia">Tritanopia (No Blue)</option>
                <option value="achromatopsia">Achromatopsia (No Color)</option>
            </select>
            <div id="cb-img-container" style="margin-top:20px; filter: grayscale(1);"></div>
        `;
        const f = document.getElementById('cb-file');
        const t = document.getElementById('cb-type');
        const c = document.getElementById('cb-img-container');

        f.addEventListener('change', (e) => {
            const img = document.createElement('img');
            img.style.maxWidth = '100%';
            img.src = URL.createObjectURL(e.target.files[0]);
            c.innerHTML = '';
            c.appendChild(img);
            upd();
        });

        const upd = () => {
            // Basic CSS filter approx
            const v = t.value;
            // Note: CSS filters for color blindness are SVG based usually. 
            // We will use basic filters for demo.
            if (v === 'achromatopsia') c.style.filter = 'grayscale(100%)';
            else if (v === 'protanopia') c.style.filter = 'sepia(80%) hue-rotate(-10deg)';
            else if (v === 'deuteranopia') c.style.filter = 'sepia(60%) hue-rotate(10deg)';
            else if (v === 'tritanopia') c.style.filter = 'sepia(40%) hue-rotate(180deg)';
            else c.style.filter = 'none';
        };
        t.addEventListener('change', upd);
    }

    renderJsonVal() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JSON Validator</h2>
            <textarea id="jv-in" rows="10" placeholder="Paste JSON here"></textarea>
            <button id="jv-btn">Validate & Format</button>
            <div id="jv-res" style="margin-top: 20px; white-space: pre-wrap; font-family: monospace;"></div>
        `;
        document.getElementById('jv-btn').onclick = () => {
            const v = document.getElementById('jv-in').value;
            try {
                const o = JSON.parse(v);
                document.getElementById('jv-in').value = JSON.stringify(o, null, 4);
                document.getElementById('jv-res').textContent = "Valid JSON";
                document.getElementById('jv-res').style.color = "#2ecc71";
            } catch (e) {
                document.getElementById('jv-res').textContent = "Invalid JSON: " + e.message;
                document.getElementById('jv-res').style.color = "#e74c3c";
            }
        };
    }

    renderXmlFmt() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">XML Formatter</h2>
            <textarea id="xf-in" rows="10" placeholder="Paste XML here"></textarea>
            <button id="xf-btn">Format</button>
        `;
        document.getElementById('xf-btn').onclick = () => {
            let xml = document.getElementById('xf-in').value;
            let formatted = '', indent = '';
            xml.split(/>\s*</).forEach(node => {
                if (node.match(/^\/\w/)) indent = indent.substring(2);
                formatted += indent + '<' + node + '>\r\n';
                if (node.match(/^<?\w[^>]*[^\/]$/)) indent += '  ';
            });
            document.getElementById('xf-in').value = formatted.substring(1, formatted.length - 3);
        };
    }

    renderSqlMin() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">SQL Minifier</h2>
            <textarea id="sm-in" rows="10" placeholder="Paste SQL query here"></textarea>
            <button id="sm-btn">Minify</button>
        `;
        document.getElementById('sm-btn').onclick = () => {
            let v = document.getElementById('sm-in').value;
            v = v.replace(/\s{2,}/g, ' ').replace(/\n/g, ' ').trim();
            document.getElementById('sm-in').value = v;
        };
    }

    renderJsMin() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">JS Minifier</h2>
            <textarea id="jm-in" rows="10" placeholder="Paste JS Code"></textarea>
            <button id="jm-btn">Minify (Simple)</button>
        `;
        document.getElementById('jm-btn').onclick = () => {
            // Very basic minification for client-side safety
            let v = document.getElementById('jm-in').value;
            v = v.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // comments
                .replace(/\s+/g, ' ')
                .replace(/\s*([=,:{};])\s*/g, '$1')
                .trim();
            document.getElementById('jm-in').value = v;
        };
    }

    renderCssMin() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CSS Minifier</h2>
            <textarea id="cm-in" rows="10" placeholder="Paste CSS Code"></textarea>
            <button id="cm-btn">Minify</button>
        `;
        document.getElementById('cm-btn').onclick = () => {
            let v = document.getElementById('cm-in').value;
            v = v.replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\s+/g, ' ')
                .replace(/\s*([:;{}])\s*/g, '$1')
                .replace(/;}/g, '}')
                .trim();
            document.getElementById('cm-in').value = v;
        };
    }

    renderLoremGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Lorem Ipsum Generator</h2>
            <input type="number" id="li-num" value="5" min="1" max="50" placeholder="Paragraphs">
            <button id="li-btn">Generate</button>
            <textarea id="li-out" rows="10" readonly></textarea>
        `;
        document.getElementById('li-btn').onclick = () => {
            const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            const n = document.getElementById('li-num').value;
            document.getElementById('li-out').value = Array(parseInt(n)).fill(lorem).join('\n\n');
        };
    }

    renderSlugGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Slug Generator</h2>
            <input type="text" id="sg-in" placeholder="Enter title e.g. Hello World">
            <div class="result" id="sg-out"></div>
        `;
        document.getElementById('sg-in').addEventListener('input', (e) => {
            const v = e.target.value.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');
            document.getElementById('sg-out').textContent = v;
        });
    }

    renderTextDiff() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Diff Checker (Simple)</h2>
            <textarea id="td-1" rows="5" placeholder="Original Text"></textarea>
            <textarea id="td-2" rows="5" placeholder="Changed Text"></textarea>
            <button id="td-btn">Compare</button>
            <div id="td-res" style="margin-top:20px; white-space: pre-wrap;"></div>
        `;
        document.getElementById('td-btn').onclick = () => {
            const t1 = document.getElementById('td-1').value;
            const t2 = document.getElementById('td-2').value;
            if (t1 === t2) document.getElementById('td-res').innerHTML = '<span style="color:#2ecc71">Texts are identical</span>';
            else document.getElementById('td-res').innerHTML = '<span style="color:#e74c3c">Texts differ</span>';
        };
    }

    renderEmailObf() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Email Obfuscator</h2>
            <input type="email" id="eo-in" placeholder="email@example.com">
            <div class="result" id="eo-out" style="word-break: break-all; font-size: 14px;"></div>
        `;
        document.getElementById('eo-in').addEventListener('input', (e) => {
            const v = e.target.value;
            let res = '';
            for (let i = 0; i < v.length; i++) {
                res += '&#' + v.charCodeAt(i) + ';';
            }
            document.getElementById('eo-out').textContent = res;
        });
    }

    renderUuidGen() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">UUID Generator (v4)</h2>
            <button id="ug-btn">Box Generate</button>
            <div class="result" id="ug-res"></div>
        `;
        const gen = () => {
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            document.getElementById('ug-res').textContent = uuid;
        };
        document.getElementById('ug-btn').onclick = gen;
        gen();
    }

    renderMeanMedMode() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Mean / Median / Mode</h2>
            <input type="text" id="mmm-in" placeholder="Enter numbers separated by commas (e.g. 1, 2, 3, 4, 5)">
            <button id="mmm-btn">Calculate</button>
            <div class="result" id="mmm-res"></div>
        `;
        document.getElementById('mmm-btn').onclick = () => {
            const v = document.getElementById('mmm-in').value;
            const arr = v.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
            if (!arr.length) return;

            // Mean
            const sum = arr.reduce((a, b) => a + b, 0);
            const mean = sum / arr.length;

            // Median
            const mid = Math.floor(arr.length / 2);
            const med = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;

            // Mode
            const modeMap = {};
            let maxEl = arr[0], maxCount = 1;
            for (let i = 0; i < arr.length; i++) {
                let el = arr[i];
                if (modeMap[el] == null) modeMap[el] = 1; else modeMap[el]++;
                if (modeMap[el] > maxCount) { maxEl = el; maxCount = modeMap[el]; }
            }

            document.getElementById('mmm-res').innerHTML = `
                 <div><strong>Mean:</strong> ${mean.toFixed(2)}</div>
                 <div><strong>Median:</strong> ${med}</div>
                 <div><strong>Mode:</strong> ${maxCount > 1 ? maxEl : 'None'}</div>
                 <div><strong>Min:</strong> ${arr[0]}</div>
                 <div><strong>Max:</strong> ${arr[arr.length - 1]}</div>
                 <div><strong>Count:</strong> ${arr.length}</div>
             `;
        };
    }

    renderStdDev() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Standard Deviation & Variance</h2>
            <input type="text" id="sd-in" placeholder="Enter numbers separated by commas">
            <button id="sd-btn">Calculate</button>
            <div class="result" id="sd-res"></div>
        `;
        document.getElementById('sd-btn').onclick = () => {
            const arr = document.getElementById('sd-in').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            if (arr.length < 2) return;
            const n = arr.length;
            const mean = arr.reduce((a, b) => a + b) / n;
            const dev = arr.map(k => (k - mean) ** 2);
            const sumDev = dev.reduce((a, b) => a + b);

            const popVar = sumDev / n;
            const sampVar = sumDev / (n - 1);
            const popStd = Math.sqrt(popVar);
            const sampStd = Math.sqrt(sampVar);

            document.getElementById('sd-res').innerHTML = `
                <div><strong>Sample Std Dev:</strong> ${sampStd.toFixed(4)}</div>
                <div><strong>Pop. Std Dev:</strong> ${popStd.toFixed(4)}</div>
                <div><strong>Sample Variance:</strong> ${sampVar.toFixed(4)}</div>
                <div><strong>Pop. Variance:</strong> ${popVar.toFixed(4)}</div>
            `;
        };
    }

    renderPermCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Permutations (nPr)</h2>
            <div style="display:flex;gap:10px;justify-content:center;">
                <input type="number" id="pc-n" placeholder="n (total)" style="width:100px;">
                <input type="number" id="pc-r" placeholder="r (subset)" style="width:100px;">
            </div>
            <button id="pc-btn">Calculate</button>
            <div class="result" id="pc-res"></div>
        `;
        const fact = n => n <= 1 ? 1 : n * fact(n - 1);
        document.getElementById('pc-btn').onclick = () => {
            const n = parseInt(document.getElementById('pc-n').value);
            const r = parseInt(document.getElementById('pc-r').value);
            if (isNaN(n) || isNaN(r) || r > n) { document.getElementById('pc-res').innerHTML = "Invalid input"; return; }
            const res = fact(n) / fact(n - r);
            document.getElementById('pc-res').textContent = res.toLocaleString();
        };
    }

    renderCombCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Combinations (nCr)</h2>
             <div style="display:flex;gap:10px;justify-content:center;">
                <input type="number" id="cc-n" placeholder="n (total)" style="width:100px;">
                <input type="number" id="cc-r" placeholder="r (subset)" style="width:100px;">
            </div>
            <button id="cc-btn">Calculate</button>
            <div class="result" id="cc-res"></div>
        `;
        const fact = n => n <= 1 ? 1 : n * fact(n - 1);
        document.getElementById('cc-btn').onclick = () => {
            const n = parseInt(document.getElementById('cc-n').value);
            const r = parseInt(document.getElementById('cc-r').value);
            if (isNaN(n) || isNaN(r) || r > n) { document.getElementById('cc-res').innerHTML = "Invalid input"; return; }
            const res = fact(n) / (fact(r) * fact(n - r));
            document.getElementById('cc-res').textContent = res.toLocaleString();
        };
    }

    renderZScore() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Z-Score Calculator</h2>
            <input type="number" id="zs-x" placeholder="Raw Score (x)">
            <input type="number" id="zs-m" placeholder="Mean (μ)">
            <input type="number" id="zs-s" placeholder="Std Dev (σ)">
            <button id="zs-btn">Calculate</button>
            <div class="result" id="zs-res"></div>
        `;
        document.getElementById('zs-btn').onclick = () => {
            const x = parseFloat(document.getElementById('zs-x').value);
            const m = parseFloat(document.getElementById('zs-m').value);
            const s = parseFloat(document.getElementById('zs-s').value);
            const z = (x - m) / s;
            document.getElementById('zs-res').textContent = "Z-Score: " + z.toFixed(4);
        };
    }

    renderConfInt() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Confidence Interval (Mean)</h2>
            <input type="number" id="ci-m" placeholder="Sample Mean">
            <input type="number" id="ci-s" placeholder="Sample Std Dev">
            <input type="number" id="ci-n" placeholder="Sample Size">
            <select id="ci-l" style="margin-bottom:10px;">
                <option value="1.645">90%</option>
                <option value="1.96" selected>95%</option>
                <option value="2.576">99%</option>
            </select>
            <button id="ci-btn">Calculate</button>
            <div class="result" id="ci-res"></div>
        `;
        document.getElementById('ci-btn').onclick = () => {
            const m = parseFloat(document.getElementById('ci-m').value);
            const s = parseFloat(document.getElementById('ci-s').value);
            const n = parseFloat(document.getElementById('ci-n').value);
            const z = parseFloat(document.getElementById('ci-l').value);
            const err = z * (s / Math.sqrt(n));
            document.getElementById('ci-res').innerHTML = `
                <div><strong>Margin of Error:</strong> ±${err.toFixed(4)}</div>
                <div><strong>Interval:</strong> [${(m - err).toFixed(4)}, ${(m + err).toFixed(4)}]</div>
             `;
        };
    }

    renderMarginErr() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Margin of Error</h2>
            <input type="number" id="me-n" placeholder="Sample Size (n)">
            <input type="number" id="me-p" placeholder="Percentage % (optional, def 50)">
            <select id="me-c" style="margin-bottom:10px;">
                <option value="1.645">90% Confidence</option>
                <option value="1.96" selected>95% Confidence</option>
                <option value="2.576">99% Confidence</option>
            </select>
            <button id="me-btn">Calculate</button>
            <div class="result" id="me-res"></div>
        `;
        document.getElementById('me-btn').onclick = () => {
            const n = parseFloat(document.getElementById('me-n').value);
            const p = (document.getElementById('me-p').value || 50) / 100;
            const z = parseFloat(document.getElementById('me-c').value);
            const mo = z * Math.sqrt((p * (1 - p)) / n);
            document.getElementById('me-res').innerHTML = `Margin of Error: ±${(mo * 100).toFixed(2)}%`;
        };
    }

    renderPoissonDist() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Poisson Probability</h2>
            <input type="number" id="pd-k" placeholder="Number of occurrences (k)">
            <input type="number" id="pd-l" placeholder="Average Rate (λ)">
            <button id="pd-btn">Calculate</button>
            <div class="result" id="pd-res"></div>
        `;
        const fact = n => n <= 1 ? 1 : n * fact(n - 1);
        document.getElementById('pd-btn').onclick = () => {
            const k = parseInt(document.getElementById('pd-k').value);
            const l = parseFloat(document.getElementById('pd-l').value);
            const p = (Math.pow(l, k) * Math.exp(-l)) / fact(k);
            document.getElementById('pd-res').textContent = "P(x=k): " + p.toFixed(6);
        };
    }

    renderGeoMean() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Geometric Mean</h2>
            <input type="text" id="gm-in" placeholder="Enter numbers separated by commas">
            <button id="gm-btn">Calculate</button>
            <div class="result" id="gm-res"></div>
        `;
        document.getElementById('gm-btn').onclick = () => {
            const arr = document.getElementById('gm-in').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            const prod = arr.reduce((a, b) => a * b, 1);
            const res = Math.pow(prod, 1 / arr.length);
            document.getElementById('gm-res').textContent = res.toFixed(4);
        };
    }

    renderHarMean() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Harmonic Mean</h2>
            <input type="text" id="hm-in" placeholder="Enter numbers separated by commas">
            <button id="hm-btn">Calculate</button>
            <div class="result" id="hm-res"></div>
        `;
        document.getElementById('hm-btn').onclick = () => {
            const arr = document.getElementById('hm-in').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
            const sumRec = arr.reduce((a, b) => a + (1 / b), 0);
            const res = arr.length / sumRec;
            document.getElementById('hm-res').textContent = res.toFixed(4);
        };
    }

    renderListPicker() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random List Picker</h2>
            <textarea id="lp-in" rows="10" placeholder="Enter items (one per line)"></textarea>
            <button id="lp-btn">Pick Item</button>
            <div class="result" id="lp-res"></div>
        `;
        document.getElementById('lp-btn').onclick = () => {
            const items = document.getElementById('lp-in').value.split('\n').filter(i => i.trim());
            if (!items.length) { document.getElementById('lp-res').textContent = "List empty"; return; }
            const picked = items[Math.floor(Math.random() * items.length)];
            document.getElementById('lp-res').textContent = picked;
        };
    }

    renderListShuffle() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">List Shuffler</h2>
            <textarea id="ls-in" rows="10" placeholder="Enter items (one per line)"></textarea>
            <button id="ls-btn">Shuffle</button>
            <textarea id="ls-out" rows="10" readonly style="margin-top:20px"></textarea>
        `;
        document.getElementById('ls-btn').onclick = () => {
            const items = document.getElementById('ls-in').value.split('\n').filter(i => i.trim());
            for (let i = items.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [items[i], items[j]] = [items[j], items[i]];
            }
            document.getElementById('ls-out').value = items.join('\n');
        };
    }

    renderRandDate() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random Date Generator</h2>
            <div style="display:flex; gap:10px;">
                <input type="date" id="rd-s" value="2000-01-01">
                <input type="date" id="rd-e" value="2030-12-31">
            </div>
            <button id="rd-btn">Generate</button>
            <div class="result" id="rd-res"></div>
        `;
        document.getElementById('rd-btn').onclick = () => {
            const s = new Date(document.getElementById('rd-s').value).getTime();
            const e = new Date(document.getElementById('rd-e').value).getTime();
            const r = new Date(s + Math.random() * (e - s));
            document.getElementById('rd-res').textContent = r.toDateString();
        };
    }

    renderRandTime() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random Time Generator</h2>
            <button id="rt-btn">Generate</button>
            <div class="result" id="rt-res"></div>
        `;
        document.getElementById('rt-btn').onclick = () => {
            const h = Math.floor(Math.random() * 24).toString().padStart(2, '0');
            const m = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            const s = Math.floor(Math.random() * 60).toString().padStart(2, '0');
            document.getElementById('rt-res').textContent = `${h}:${m}:${s}`;
        };
    }

    renderRandMac() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random MAC Address</h2>
            <button id="rm-btn">Generate</button>
            <div class="result" id="rm-res"></div>
        `;
        document.getElementById('rm-btn').onclick = () => {
            const hex = "0123456789ABCDEF";
            let mac = "";
            for (let i = 0; i < 6; i++) {
                mac += hex.charAt(Math.floor(Math.random() * 16));
                mac += hex.charAt(Math.floor(Math.random() * 16));
                if (i < 5) mac += ":";
            }
            document.getElementById('rm-res').textContent = mac;
        };
    }

    renderRandIp() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Random IPv4 Address</h2>
            <button id="ri-btn">Generate</button>
            <div class="result" id="ri-res"></div>
        `;
        document.getElementById('ri-btn').onclick = () => {
            const ip = Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
            document.getElementById('ri-res').textContent = ip;
        };
    }

    renderStrRev() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">String Reverser</h2>
            <input type="text" id="sr-in" placeholder="Enter text">
            <div class="result" id="sr-res"></div>
        `;
        document.getElementById('sr-in').addEventListener('input', (e) => {
            document.getElementById('sr-res').textContent = e.target.value.split('').reverse().join('');
        });
    }

    renderTextRepeat() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Repeater</h2>
            <input type="text" id="tr-in" placeholder="Text to repeat">
            <input type="number" id="tr-n" min="1" max="1000" value="5">
            <button id="tr-btn">Repeat</button>
            <textarea id="tr-out" rows="10" readonly style="margin-top:20px;"></textarea>
        `;
        document.getElementById('tr-btn').onclick = () => {
            const t = document.getElementById('tr-in').value;
            const n = parseInt(document.getElementById('tr-n').value);
            document.getElementById('tr-out').value = t.repeat(n);
        };
    }

    renderTextTrunc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Text Truncator</h2>
            <input type="text" id="tt-in" placeholder="Long text here">
            <input type="number" id="tt-n" min="1" value="20">
            <div class="result" id="tt-res"></div>
        `;
        const upd = () => {
            const t = document.getElementById('tt-in').value;
            const n = parseInt(document.getElementById('tt-n').value);
            if (t.length > n) document.getElementById('tt-res').textContent = t.substring(0, n) + '...';
            else document.getElementById('tt-res').textContent = t;
        };
        ['tt-in', 'tt-n'].forEach(id => document.getElementById(id).addEventListener('input', upd));
    }

    renderLineEnum() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Line Numberer</h2>
            <textarea id="le-in" rows="10" placeholder="Paste text here"></textarea>
            <button id="le-btn">Add Numbers</button>
            <textarea id="le-out" rows="10" readonly style="margin-top:20px;"></textarea>
        `;
        document.getElementById('le-btn').onclick = () => {
            const lines = document.getElementById('le-in').value.split('\n');
            document.getElementById('le-out').value = lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
        };
    }

    renderRoiCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">ROI Calculator</h2>
            <input type="number" id="roi-inv" placeholder="Invested Amount">
            <input type="number" id="roi-ret" placeholder="Returned Amount">
            <button id="roi-btn">Calculate</button>
            <div class="result" id="roi-res"></div>
        `;
        document.getElementById('roi-btn').onclick = () => {
            const i = parseFloat(document.getElementById('roi-inv').value);
            const r = parseFloat(document.getElementById('roi-ret').value);
            const roi = ((r - i) / i) * 100;
            document.getElementById('roi-res').innerHTML = `
                <div>Gain/Loss: ${r - i}</div>
                <div style="font-weight:bold; color:${roi >= 0 ? 'lime' : 'red'}">ROI: ${roi.toFixed(2)}%</div>
             `;
        };
    }

    renderBreakEven() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Break-Even Point</h2>
            <input type="number" id="be-fc" placeholder="Fixed Costs">
            <input type="number" id="be-vc" placeholder="Variable Cost per Unit">
            <input type="number" id="be-p" placeholder="Price per Unit">
            <button id="be-btn">Calculate</button>
            <div class="result" id="be-res"></div>
        `;
        document.getElementById('be-btn').onclick = () => {
            const fc = parseFloat(document.getElementById('be-fc').value);
            const vc = parseFloat(document.getElementById('be-vc').value);
            const p = parseFloat(document.getElementById('be-p').value);
            const units = fc / (p - vc);
            const rev = units * p;
            document.getElementById('be-res').innerHTML = `
                <div>Break-Even Units: ${Math.ceil(units)}</div>
                <div>Break-Even Revenue: $${rev.toFixed(2)}</div>
             `;
        };
    }

    renderMarginCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Profit Margin Calculator</h2>
            <input type="number" id="mc-c" placeholder="Cost">
            <input type="number" id="mc-r" placeholder="Revenue">
            <button id="mc-btn">Calculate</button>
            <div class="result" id="mc-res"></div>
        `;
        document.getElementById('mc-btn').onclick = () => {
            const c = parseFloat(document.getElementById('mc-c').value);
            const r = parseFloat(document.getElementById('mc-r').value);
            const m = ((r - c) / r) * 100;
            const p = r - c;
            document.getElementById('mc-res').innerHTML = `
                 <div>Profit: $${p.toFixed(2)}</div>
                 <div>Margin: ${m.toFixed(2)}%</div>
             `;
        };
    }

    renderMarkupCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Markup Calculator</h2>
            <input type="number" id="mu-c" placeholder="Cost">
            <input type="number" id="mu-m" placeholder="Markup %">
            <button id="mu-btn">Calculate</button>
            <div class="result" id="mu-res"></div>
        `;
        document.getElementById('mu-btn').onclick = () => {
            const c = parseFloat(document.getElementById('mu-c').value);
            const m = parseFloat(document.getElementById('mu-m').value);
            const p = c * (1 + m / 100);
            const prof = p - c;
            document.getElementById('mu-res').innerHTML = `
                 <div>Sales Price: $${p.toFixed(2)}</div>
                 <div>Profit: $${prof.toFixed(2)}</div>
             `;
        };
    }

    renderVatCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">VAT / Sales Tax</h2>
            <input type="number" id="vc-a" placeholder="Amount">
            <input type="number" id="vc-r" placeholder="Tax Rate %">
            <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
                <button id="vc-add">Add Tax</button>
                <button id="vc-sub">Remove Tax</button>
            </div>
            <div class="result" id="vc-res"></div>
        `;
        const calc = (mode) => {
            const a = parseFloat(document.getElementById('vc-a').value);
            const r = parseFloat(document.getElementById('vc-r').value);
            let net, tax, gross;
            if (mode === 'add') {
                net = a;
                tax = a * (r / 100);
                gross = a + tax;
            } else {
                gross = a;
                net = a / (1 + r / 100);
                tax = gross - net;
            }
            document.getElementById('vc-res').innerHTML = `
                 <div>Net: ${net.toFixed(2)}</div>
                 <div>Tax: ${tax.toFixed(2)}</div>
                 <div>Gross: ${gross.toFixed(2)}</div>
             `;
        };
        document.getElementById('vc-add').onclick = () => calc('add');
        document.getElementById('vc-sub').onclick = () => calc('sub');
    }

    renderDiscountCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Discount Calculator</h2>
            <input type="number" id="dc-p" placeholder="Original Price">
            <input type="number" id="dc-d" placeholder="Discount %">
            <button id="dc-btn">Calculate</button>
            <div class="result" id="dc-res"></div>
        `;
        document.getElementById('dc-btn').onclick = () => {
            const p = parseFloat(document.getElementById('dc-p').value);
            const d = parseFloat(document.getElementById('dc-d').value);
            const saved = p * (d / 100);
            const final = p - saved;
            document.getElementById('dc-res').innerHTML = `
                 <div>You Save: $${saved.toFixed(2)}</div>
                 <div>Final Price: $${final.toFixed(2)}</div>
             `;
        };
    }

    renderCpmCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">CPM Calculator</h2>
            <input type="number" id="cm-c" placeholder="Total Cost">
            <input type="number" id="cm-i" placeholder="Impressions">
            <button id="cm-btn">Calculate CPM</button>
            <div class="result" id="cm-res"></div>
        `;
        document.getElementById('cm-btn').onclick = () => {
            const c = parseFloat(document.getElementById('cm-c').value);
            const i = parseFloat(document.getElementById('cm-i').value);
            const cpm = (c / i) * 1000;
            document.getElementById('cm-res').textContent = `CPM: $${cpm.toFixed(2)}`;
        };
    }

    renderLoanCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Simple Loan Calculator</h2>
            <input type="number" id="lc-a" placeholder="Loan Amount">
            <input type="number" id="lc-r" placeholder="Interest Rate % (Annual)">
            <input type="number" id="lc-t" placeholder="Term (Years)">
            <button id="lc-btn">Calculate</button>
            <div class="result" id="lc-res"></div>
        `;
        document.getElementById('lc-btn').onclick = () => {
            const p = parseFloat(document.getElementById('lc-a').value);
            const r = parseFloat(document.getElementById('lc-r').value) / 100 / 12;
            const n = parseFloat(document.getElementById('lc-t').value) * 12;
            const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            const total = m * n;
            document.getElementById('lc-res').innerHTML = `
                 <div>Monthly Pay: $${m.toFixed(2)}</div>
                 <div>Total Cost: $${total.toFixed(2)}</div>
                 <div>Interest: $${(total - p).toFixed(2)}</div>
             `;
        };
    }

    renderCompInt() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Compound Interest</h2>
            <input type="number" id="ci-p" placeholder="Principal Amount">
            <input type="number" id="ci-r" placeholder="Interest Rate %">
            <input type="number" id="ci-t" placeholder="Time (Years)">
            <input type="number" id="ci-n" placeholder="Compounding/Year (12=monthly)" value="12">
            <button id="ci-btn">Calculate</button>
            <div class="result" id="ci-res"></div>
        `;
        document.getElementById('ci-btn').onclick = () => {
            const p = parseFloat(document.getElementById('ci-p').value);
            const r = parseFloat(document.getElementById('ci-r').value) / 100;
            const t = parseFloat(document.getElementById('ci-t').value);
            const n = parseFloat(document.getElementById('ci-n').value);
            const a = p * Math.pow((1 + r / n), n * t);
            document.getElementById('ci-res').innerHTML = `
                 <div>Future Value: $${a.toFixed(2)}</div>
                 <div>Interest Earned: $${(a - p).toFixed(2)}</div>
             `;
        };
    }

    renderSalaryConv() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Salary to Hourly</h2>
            <input type="number" id="sc-s" placeholder="Annual Salary">
            <input type="number" id="sc-h" placeholder="Hours/Week (def 40)" value="40">
            <button id="sc-btn">Convert</button>
            <div class="result" id="sc-res"></div>
        `;
        document.getElementById('sc-btn').onclick = () => {
            const s = parseFloat(document.getElementById('sc-s').value);
            const h = parseFloat(document.getElementById('sc-h').value) || 40;
            const hourly = s / (52 * h);
            document.getElementById('sc-res').innerHTML = `
                <div>Hourly: $${hourly.toFixed(2)}</div>
                <div>Weekly: $${(s / 52).toFixed(2)}</div>
                <div>Monthly: $${(s / 12).toFixed(2)}</div>
            `;
        };
    }

    renderCircleCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Circle Calculator</h2>
            <input type="number" id="cc-r" placeholder="Radius">
            <button id="cc-btn">Calculate</button>
            <div class="result" id="cc-res"></div>
        `;
        document.getElementById('cc-btn').onclick = () => {
            const r = parseFloat(document.getElementById('cc-r').value);
            document.getElementById('cc-res').innerHTML = `
                 <div>Area: ${(Math.PI * r * r).toFixed(2)}</div>
                 <div>Circumference: ${(2 * Math.PI * r).toFixed(2)}</div>
                 <div>Diameter: ${(2 * r).toFixed(2)}</div>
             `;
        };
    }

    renderSphereCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Sphere Calculator</h2>
            <input type="number" id="sp-r" placeholder="Radius">
            <button id="sp-btn">Calculate</button>
            <div class="result" id="sp-res"></div>
        `;
        document.getElementById('sp-btn').onclick = () => {
            const r = parseFloat(document.getElementById('sp-r').value);
            document.getElementById('sp-res').innerHTML = `
                 <div>Volume: ${((4 / 3) * Math.PI * Math.pow(r, 3)).toFixed(2)}</div>
                 <div>Surface Area: ${(4 * Math.PI * r * r).toFixed(2)}</div>
             `;
        };
    }

    renderCylinderCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Cylinder Calculator</h2>
            <input type="number" id="cy-r" placeholder="Radius">
            <input type="number" id="cy-h" placeholder="Height">
            <button id="cy-btn">Calculate</button>
            <div class="result" id="cy-res"></div>
        `;
        document.getElementById('cy-btn').onclick = () => {
            const r = parseFloat(document.getElementById('cy-r').value);
            const h = parseFloat(document.getElementById('cy-h').value);
            const vol = Math.PI * r * r * h;
            const area = 2 * Math.PI * r * (r + h);
            document.getElementById('cy-res').innerHTML = `
                 <div>Volume: ${vol.toFixed(2)}</div>
                 <div>Surface Area: ${area.toFixed(2)}</div>
             `;
        };
    }

    renderConeCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Cone Calculator</h2>
            <input type="number" id="co-r" placeholder="Radius">
            <input type="number" id="co-h" placeholder="Height">
            <button id="co-btn">Calculate</button>
            <div class="result" id="co-res"></div>
        `;
        document.getElementById('co-btn').onclick = () => {
            const r = parseFloat(document.getElementById('co-r').value);
            const h = parseFloat(document.getElementById('co-h').value);
            const s = Math.sqrt(r * r + h * h);
            const vol = Math.PI * r * r * (h / 3);
            const area = Math.PI * r * (r + s);
            document.getElementById('co-res').innerHTML = `
                 <div>Volume: ${vol.toFixed(2)}</div>
                 <div>Surface Area: ${area.toFixed(2)}</div>
                 <div>Slant Height: ${s.toFixed(2)}</div>
             `;
        };
    }

    renderPythagorean() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Pythagorean Calculator</h2>
            <input type="number" id="pt-a" placeholder="Leg A">
            <input type="number" id="pt-b" placeholder="Leg B">
            <button id="pt-btn">Calculate Hypotenuse</button>
            <div class="result" id="pt-res"></div>
        `;
        document.getElementById('pt-btn').onclick = () => {
            const a = parseFloat(document.getElementById('pt-a').value);
            const b = parseFloat(document.getElementById('pt-b').value);
            const c = Math.sqrt(a * a + b * b);
            document.getElementById('pt-res').textContent = `Hypotenuse (c): ${c.toFixed(2)}`;
        };
    }

    renderTriangleArea() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Triangle Area (Heron's)</h2>
            <input type="number" id="ta-a" placeholder="Side A">
            <input type="number" id="ta-b" placeholder="Side B">
            <input type="number" id="ta-c" placeholder="Side C">
            <button id="ta-btn">Calculate</button>
            <div class="result" id="ta-res"></div>
        `;
        document.getElementById('ta-btn').onclick = () => {
            const a = parseFloat(document.getElementById('ta-a').value);
            const b = parseFloat(document.getElementById('ta-b').value);
            const c = parseFloat(document.getElementById('ta-c').value);
            const s = (a + b + c) / 2;
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            document.getElementById('ta-res').textContent = isNaN(area) ? "Invalid Triangle" : `Area: ${area.toFixed(2)}`;
        };
    }

    renderSlopeCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Slope Calculator</h2>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="sl-x1" placeholder="X1">
                <input type="number" id="sl-y1" placeholder="Y1">
            </div>
            <div style="display:flex; gap:10px;">
                <input type="number" id="sl-x2" placeholder="X2">
                <input type="number" id="sl-y2" placeholder="Y2">
            </div>
            <button id="sl-btn">Calculate</button>
            <div class="result" id="sl-res"></div>
        `;
        document.getElementById('sl-btn').onclick = () => {
            const x1 = parseFloat(document.getElementById('sl-x1').value);
            const y1 = parseFloat(document.getElementById('sl-y1').value);
            const x2 = parseFloat(document.getElementById('sl-x2').value);
            const y2 = parseFloat(document.getElementById('sl-y2').value);
            const m = (y2 - y1) / (x2 - x1);
            document.getElementById('sl-res').textContent = `Slope (m): ${m.toFixed(4)}`;
        };
    }

    renderMidpointCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Midpoint Calculator</h2>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="mp-x1" placeholder="X1">
                <input type="number" id="mp-y1" placeholder="Y1">
            </div>
            <div style="display:flex; gap:10px;">
                <input type="number" id="mp-x2" placeholder="X2">
                <input type="number" id="mp-y2" placeholder="Y2">
            </div>
            <button id="mp-btn">Calculate</button>
            <div class="result" id="mp-res"></div>
        `;
        document.getElementById('mp-btn').onclick = () => {
            const x1 = parseFloat(document.getElementById('mp-x1').value);
            const y1 = parseFloat(document.getElementById('mp-y1').value);
            const x2 = parseFloat(document.getElementById('mp-x2').value);
            const y2 = parseFloat(document.getElementById('mp-y2').value);
            const xm = (x1 + x2) / 2;
            const ym = (y1 + y2) / 2;
            document.getElementById('mp-res').textContent = `Midpoint: (${xm}, ${ym})`;
        };
    }

    renderDistCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Distance Calculator (2D)</h2>
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <input type="number" id="dst-x1" placeholder="X1">
                <input type="number" id="dst-y1" placeholder="Y1">
            </div>
            <div style="display:flex; gap:10px;">
                <input type="number" id="dst-x2" placeholder="X2">
                <input type="number" id="dst-y2" placeholder="Y2">
            </div>
            <button id="dst-btn">Calculate</button>
            <div class="result" id="dst-res"></div>
        `;
        document.getElementById('dst-btn').onclick = () => {
            const x1 = parseFloat(document.getElementById('dst-x1').value);
            const y1 = parseFloat(document.getElementById('dst-y1').value);
            const x2 = parseFloat(document.getElementById('dst-x2').value);
            const y2 = parseFloat(document.getElementById('dst-y2').value);
            const d = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            document.getElementById('dst-res').textContent = `Distance: ${d.toFixed(4)}`;
        };
    }

    renderCubeCalc() {
        const content = document.getElementById('tool-content');
        content.innerHTML = `
            <h2 class="tool-title">Cube Calculator</h2>
            <input type="number" id="cb-s" placeholder="Side Length">
            <button id="cb-btn">Calculate</button>
            <div class="result" id="cb-res"></div>
        `;
        document.getElementById('cb-btn').onclick = () => {
            const s = parseFloat(document.getElementById('cb-s').value);
            document.getElementById('cb-res').innerHTML = `
                 <div>Volume: ${(s * s * s).toFixed(2)}</div>
                 <div>Surface Area: ${(6 * s * s).toFixed(2)}</div>
             `;
        };
    }
}

// Initialize
new OmniTools();
