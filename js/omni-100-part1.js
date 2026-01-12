/**
 * Omni Tools - 100 Working Tools
 * Phase 1 Complete
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
            // === TEXT TOOLS (15) ===
            wordCounter: {
                name: "Word Counter",
                searchTerms: "word count character letter text",
                description: "Count words, characters, and reading time",
                icon: "📝",
                category: "Text",
                render: () => this.renderWordCounter()
            },
            caseConverter: {
                name: "Case Converter",
                searchTerms: "uppercase lowercase title case text transform",
                description: "Convert text between different cases",
                icon: "🔠",
                category: "Text",
                render: () => this.renderCaseConverter()
            },
            markdown: {
                name: "Markdown Preview",
                searchTerms: "markdown preview md",
                description: "Preview markdown formatting",
                icon: "📄",
                category: "Text",
                render: () => this.renderMarkdown()
            },
            textReverse: {
                name: "Text Reverser",
                searchTerms: "reverse text backwards flip",
                description: "Reverse text character by character",
                icon: "🔄",
                category: "Text",
                render: () => this.renderTextReverse()
            },
            textSorter: {
                name: "Text Sorter",
                searchTerms: "sort text alphabetical order",
                description: "Sort lines of text alphabetically",
                icon: "🔤",
                category: "Text",
                render: () => this.renderTextSorter()
            },
            duplicateRemover: {
                name: "Duplicate Line Remover",
                searchTerms: "remove duplicate lines unique",
                description: "Remove duplicate lines from text",
                icon: "🗑️",
                category: "Text",
                render: () => this.renderDuplicateRemover()
            },
            loremIpsum: {
                name: "Lorem Ipsum Generator",
                searchTerms: "lorem ipsum placeholder dummy text",
                description: "Generate placeholder text",
                icon: "📋",
                category: "Text",
                render: () => this.renderLoremIpsum()
            },
            textToSpeech: {
                name: "Text to Speech",
                searchTerms: "text speech audio voice read",
                description: "Convert text to speech",
                icon: "🔊",
                category: "Text",
                render: () => this.renderTextToSpeech()
            },
            findReplace: {
                name: "Find and Replace",
                searchTerms: "find replace search text",
                description: "Find and replace text",
                icon: "🔍",
                category: "Text",
                render: () => this.renderFindReplace()
            },
            lineCounter: {
                name: "Line Counter",
                searchTerms: "line count number lines",
                description: "Count number of lines in text",
                icon: "📊",
                category: "Text",
                render: () => this.renderLineCounter()
            },
            textDiff: {
                name: "Text Diff Checker",
                searchTerms: "text diff compare difference",
                description: "Compare two texts",
                icon: "⚖️",
                category: "Text",
                render: () => this.renderTextDiff()
            },
            slugGenerator: {
                name: "URL Slug Generator",
                searchTerms: "slug url seo permalink",
                description: "Generate URL-friendly slugs",
                icon: "🔗",
                category: "Text",
                render: () => this.renderSlugGenerator()
            },
            textCleaner: {
                name: "Text Cleaner",
                searchTerms: "clean text whitespace trim",
                description: "Remove extra whitespace from text",
                icon: "🧹",
                category: "Text",
                render: () => this.renderTextCleaner()
            },
            csvSplitter: {
                name: "CSV Column Extractor",
                searchTerms: "csv column extract split",
                description: "Extract columns from CSV",
                icon: "📑",
                category: "Text",
                render: () => this.renderCSVSplitter()
            },
            textEncrypt: {
                name: "Simple Text Encryptor",
                searchTerms: "encrypt decrypt text cipher",
                description: "Simple text encryption/decryption",
                icon: "🔐",
                category: "Text",
                render: () => this.renderTextEncrypt()
            },

            // === CALCULATORS (20) ===
            calculator: {
                name: "Calculator",
                searchTerms: "calc math calculate percentage percent",
                description: "Basic calculator and percentage calculations",
                icon: "🔢",
                category: "Math",
                render: () => this.renderCalculator()
            },
            tipCalculator: {
                name: "Tip Calculator",
                searchTerms: "tip gratuity restaurant bill split",
                description: "Calculate tips and split bills",
                icon: "💰",
                category: "Finance",
                render: () => this.renderTipCalculator()
            },
            loanCalculator: {
                name: "Loan Calculator",
                searchTerms: "loan mortgage emi payment interest",
                description: "Calculate loan payments",
                icon: "🏦",
                category: "Finance",
                render: () => this.renderLoanCalculator()
            },
            ageCalculator: {
                name: "Age Calculator",
                searchTerms: "age birthday years old calculate",
                description: "Calculate age from date of birth",
                icon: "🎂",
                category: "Utility",
                render: () => this.renderAgeCalculator()
            },
            dateCalculator: {
                name: "Date Calculator",
                searchTerms: "date days between difference calculate",
                description: "Calculate days between dates",
                icon: "📅",
                category: "Utility",
                render: () => this.renderDateCalculator()
            },
            discountCalculator: {
                name: "Discount Calculator",
                searchTerms: "discount sale price percentage off",
                description: "Calculate discounted prices",
                icon: "🏷️",
                category: "Finance",
                render: () => this.renderDiscountCalculator()
            },
            compoundInterest: {
                name: "Compound Interest Calculator",
                searchTerms: "compound interest investment savings",
                description: "Calculate compound interest",
                icon: "📈",
                category: "Finance",
                render: () => this.renderCompoundInterest()
            },
            gpaCalculator: {
                name: "GPA Calculator",
                searchTerms: "gpa grade point average calculator",
                description: "Calculate GPA from grades",
                icon: "🎓",
                category: "Education",
                render: () => this.renderGPACalculator()
            },
            gradeCalculator: {
                name: "Grade Calculator",
                searchTerms: "grade percentage marks score",
                description: "Calculate grades and percentages",
                icon: "📝",
                category: "Education",
                render: () => this.renderGradeCalculator()
            },
            fuelCostCalculator: {
                name: "Fuel Cost Calculator",
                searchTerms: "fuel gas petrol cost trip",
                description: "Calculate fuel costs for trips",
                icon: "⛽",
                category: "Utility",
                render: () => this.renderFuelCostCalculator()
            },
            salaryCalculator: {
                name: "Salary Calculator",
                searchTerms: "salary hourly annual wage",
                description: "Convert between hourly and annual salary",
                icon: "💵",
                category: "Finance",
                render: () => this.renderSalaryCalculator()
            },
            taxCalculator: {
                name: "Tax Calculator",
                searchTerms: "tax income calculate percentage",
                description: "Calculate tax on income",
                icon: "🧾",
                category: "Finance",
                render: () => this.renderTaxCalculator()
            },
            profitMargin: {
                name: "Profit Margin Calculator",
                searchTerms: "profit margin markup revenue",
                description: "Calculate profit margins",
                icon: "📊",
                category: "Finance",
                render: () => this.renderProfitMargin()
            },
            currencyConverter: {
                name: "Currency Converter",
                searchTerms: "currency money exchange rate convert",
                description: "Convert between currencies (static rates)",
                icon: "💱",
                category: "Converter",
                render: () => this.renderCurrencyConverter()
            },
            romanNumerals: {
                name: "Roman Numeral Converter",
                searchTerms: "roman numeral convert number",
                description: "Convert to/from Roman numerals",
                icon: "🏛️",
                category: "Converter",
                render: () => this.renderRomanNumerals()
            },
            fractionCalculator: {
                name: "Fraction Calculator",
                searchTerms: "fraction add subtract multiply divide",
                description: "Calculate with fractions",
                icon: "➗",
                category: "Math",
                render: () => this.renderFractionCalculator()
            },
            scientificCalculator: {
                name: "Scientific Calculator",
                searchTerms: "scientific calculator sin cos tan log",
                description: "Scientific calculations",
                icon: "🔬",
                category: "Math",
                render: () => this.renderScientificCalculator()
            },
            averageCalculator: {
                name: "Average Calculator",
                searchTerms: "average mean median mode",
                description: "Calculate average, median, mode",
                icon: "📉",
                category: "Math",
                render: () => this.renderAverageCalculator()
            },
            ratioCalculator: {
                name: "Ratio Calculator",
                searchTerms: "ratio proportion scale",
                description: "Calculate ratios and proportions",
                icon: "⚖️",
                category: "Math",
                render: () => this.renderRatioCalculator()
            },
            randomNumber: {
                name: "Random Number Generator",
                searchTerms: "random number generator dice",
                description: "Generate random numbers",
                icon: "🎲",
                category: "Generator",
                render: () => this.renderRandomNumber()
            },

            // === HEALTH & FITNESS (10) ===
            bmi: {
                name: "BMI Calculator",
                searchTerms: "bmi body mass index health weight",
                description: "Calculate your Body Mass Index",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderBMI()
            },
            calorieCalculator: {
                name: "Calorie Calculator",
                searchTerms: "calorie tdee bmr metabolism daily",
                description: "Calculate daily calorie needs",
                icon: "🍎",
                category: "Health",
                render: () => this.renderCalorieCalculator()
            },
            waterIntake: {
                name: "Water Intake Calculator",
                searchTerms: "water intake hydration daily",
                description: "Calculate daily water needs",
                icon: "💧",
                category: "Health",
                render: () => this.renderWaterIntake()
            },
            pregnancyCalculator: {
                name: "Pregnancy Due Date Calculator",
                searchTerms: "pregnancy due date baby calculator",
                description: "Calculate pregnancy due date",
                icon: "🤰",
                category: "Health",
                render: () => this.renderPregnancyCalculator()
            },
            sleepCalculator: {
                name: "Sleep Calculator",
                searchTerms: "sleep cycle wake up time",
                description: "Calculate optimal wake-up time",
                icon: "😴",
                category: "Health",
                render: () => this.renderSleepCalculator()
            },
            heartRate: {
                name: "Heart Rate Zone Calculator",
                searchTerms: "heart rate zone training cardio",
                description: "Calculate heart rate training zones",
                icon: "❤️",
                category: "Health",
                render: () => this.renderHeartRate()
            },
            macroCalculator: {
                name: "Macro Calculator",
                searchTerms: "macro protein carbs fat calculator",
                description: "Calculate macronutrient needs",
                icon: "🥗",
                category: "Health",
                render: () => this.renderMacroCalculator()
            },
            paceCalculator: {
                name: "Running Pace Calculator",
                searchTerms: "running pace speed distance time",
                description: "Calculate running pace",
                icon: "🏃",
                category: "Health",
                render: () => this.renderPaceCalculator()
            },
            bodyFat: {
                name: "Body Fat Calculator",
                searchTerms: "body fat percentage calculator",
                description: "Estimate body fat percentage",
                icon: "📏",
                category: "Health",
                render: () => this.renderBodyFat()
            },
            idealWeight: {
                name: "Ideal Weight Calculator",
                searchTerms: "ideal weight height calculator",
                description: "Calculate ideal body weight",
                icon: "⚖️",
                category: "Health",
                render: () => this.renderIdealWeight()
            },

            // === CONVERTERS (20) ===
            unitConverter: {
                name: "Unit Converter",
                searchTerms: "unit convert length weight volume",
                description: "Convert between units",
                icon: "📏",
                category: "Converter",
                render: () => this.renderUnitConverter()
            },
            temperatureConverter: {
                name: "Temperature Converter",
                searchTerms: "temperature celsius fahrenheit kelvin",
                description: "Convert temperature units",
                icon: "🌡️",
                category: "Converter",
                render: () => this.renderTemperatureConverter()
            },
            timeConverter: {
                name: "Time Converter",
                searchTerms: "time hours minutes seconds convert",
                description: "Convert time units",
                icon: "⏰",
                category: "Converter",
                render: () => this.renderTimeConverter()
            },
            speedConverter: {
                name: "Speed Converter",
                searchTerms: "speed mph kmh convert",
                description: "Convert speed units",
                icon: "🚗",
                category: "Converter",
                render: () => this.renderSpeedConverter()
            },
            dataConverter: {
                name: "Data Size Converter",
                searchTerms: "data size bytes kb mb gb convert",
                description: "Convert data storage units",
                icon: "💾",
                category: "Converter",
                render: () => this.renderDataConverter()
            },
            numberBase: {
                name: "Number Base Converter",
                searchTerms: "binary hex decimal octal convert",
                description: "Convert between number bases",
                icon: "🔢",
                category: "Converter",
                render: () => this.renderNumberBase()
            },
            rgbToHex: {
                name: "RGB to HEX Converter",
                searchTerms: "rgb hex color convert",
                description: "Convert RGB to HEX and vice versa",
                icon: "🎨",
                category: "Converter",
                render: () => this.renderRGBToHex()
            },
            timeZoneConverter: {
                name: "Time Zone Converter",
                searchTerms: "timezone time zone convert",
                description: "Convert time between zones",
                icon: "🌍",
                category: "Converter",
                render: () => this.renderTimeZoneConverter()
            },
            lengthConverter: {
                name: "Length Converter",
                searchTerms: "length distance meter feet inch convert",
                description: "Convert length units",
                icon: "📐",
                category: "Converter",
                render: () => this.renderLengthConverter()
            },
            weightConverter: {
                name: "Weight Converter",
                searchTerms: "weight mass kg pound convert",
                description: "Convert weight units",
                icon: "⚖️",
                category: "Converter",
                render: () => this.renderWeightConverter()
            },
            areaConverter: {
                name: "Area Converter",
                searchTerms: "area square meter feet convert",
                description: "Convert area units",
                icon: "📐",
                category: "Converter",
                render: () => this.renderAreaConverter()
            },
            volumeConverter: {
                name: "Volume Converter",
                searchTerms: "volume liter gallon convert",
                description: "Convert volume units",
                icon: "🥤",
                category: "Converter",
                render: () => this.renderVolumeConverter()
            },
            pressureConverter: {
                name: "Pressure Converter",
                searchTerms: "pressure psi bar pascal convert",
                description: "Convert pressure units",
                icon: "🌡️",
                category: "Converter",
                render: () => this.renderPressureConverter()
            },
            energyConverter: {
                name: "Energy Converter",
                searchTerms: "energy joule calorie convert",
                description: "Convert energy units",
                icon: "⚡",
                category: "Converter",
                render: () => this.renderEnergyConverter()
            },
            powerConverter: {
                name: "Power Converter",
                searchTerms: "power watt horsepower convert",
                description: "Convert power units",
                icon: "💡",
                category: "Converter",
                render: () => this.renderPowerConverter()
            },
            angleConverter: {
                name: "Angle Converter",
                searchTerms: "angle degree radian convert",
                description: "Convert angle units",
                icon: "📐",
                category: "Converter",
                render: () => this.renderAngleConverter()
            },
            fuelConverter: {
                name: "Fuel Economy Converter",
                searchTerms: "fuel economy mpg kmpl convert",
                description: "Convert fuel economy units",
                icon: "⛽",
                category: "Converter",
                render: () => this.renderFuelConverter()
            },
            cookingConverter: {
                name: "Cooking Measurement Converter",
                searchTerms: "cooking cup tablespoon teaspoon convert",
                description: "Convert cooking measurements",
                icon: "🍳",
                category: "Converter",
                render: () => this.renderCookingConverter()
            },
            shoeSize: {
                name: "Shoe Size Converter",
                searchTerms: "shoe size us uk eu convert",
                description: "Convert shoe sizes",
                icon: "👟",
                category: "Converter",
                render: () => this.renderShoeSize()
            },
            clothingSize: {
                name: "Clothing Size Converter",
                searchTerms: "clothing size us uk eu convert",
                description: "Convert clothing sizes",
                icon: "👕",
                category: "Converter",
                render: () => this.renderClothingSize()
            },

            // === DEVELOPER TOOLS (15) ===
            base64: {
                name: "Base64 Encoder",
                searchTerms: "base64 encode decode convert",
                description: "Encode and decode Base64",
                icon: "💾",
                category: "Developer",
                render: () => this.renderBase64()
            },
            jsonFormatter: {
                name: "JSON Formatter",
                searchTerms: "json format validate pretty print",
                description: "Format and validate JSON",
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
            htmlEncoder: {
                name: "HTML Encoder",
                searchTerms: "html encode decode entities",
                description: "Encode/decode HTML entities",
                icon: "📰",
                category: "Developer",
                render: () => this.renderHTMLEncoder()
            },
            regexTester: {
                name: "Regex Tester",
                searchTerms: "regex regular expression test",
                description: "Test regular expressions",
                icon: "🔤",
                category: "Developer",
                render: () => this.renderRegexTester()
            },
            uuidGenerator: {
                name: "UUID Generator",
                searchTerms: "uuid guid generator unique id",
                description: "Generate UUIDs",
                icon: "🆔",
                category: "Developer",
                render: () => this.renderUUIDGenerator()
            },
            hashGenerator: {
                name: "Hash Generator",
                searchTerms: "hash md5 sha256 checksum",
                description: "Generate text hashes",
                icon: "🔒",
                category: "Developer",
                render: () => this.renderHashGenerator()
            },
            jwtDecoder: {
                name: "JWT Decoder",
                searchTerms: "jwt token decode json web",
                description: "Decode JWT tokens",
                icon: "🔓",
                category: "Developer",
                render: () => this.renderJWTDecoder()
            },
            cssMinifier: {
                name: "CSS Minifier",
                searchTerms: "css minify compress",
                description: "Minify CSS code",
                icon: "🎨",
                category: "Developer",
                render: () => this.renderCSSMinifier()
            },
            jsMinifier: {
                name: "JavaScript Minifier",
                searchTerms: "javascript js minify compress",
                description: "Minify JavaScript code",
                icon: "📜",
                category: "Developer",
                render: () => this.renderJSMinifier()
            },
            sqlFormatter: {
                name: "SQL Formatter",
                searchTerms: "sql format query database",
                description: "Format SQL queries",
                icon: "🗄️",
                category: "Developer",
                render: () => this.renderSQLFormatter()
            },
            xmlFormatter: {
                name: "XML Formatter",
                searchTerms: "xml format validate",
                description: "Format and validate XML",
                icon: "📄",
                category: "Developer",
                render: () => this.renderXMLFormatter()
            },
            csvToJson: {
                name: "CSV to JSON Converter",
                searchTerms: "csv json convert data",
                description: "Convert CSV to JSON",
                icon: "📊",
                category: "Developer",
                render: () => this.renderCSVToJSON()
            },
            jsonToCsv: {
                name: "JSON to CSV Converter",
                searchTerms: "json csv convert data",
                description: "Convert JSON to CSV",
                icon: "📊",
                category: "Developer",
                render: () => this.renderJSONToCSV()
            },
            codeBeautifier: {
                name: "Code Beautifier",
                searchTerms: "code beautify format pretty",
                description: "Beautify code (HTML/CSS/JS)",
                icon: "✨",
                category: "Developer",
                render: () => this.renderCodeBeautifier()
            },

            // === SECURITY & GENERATORS (10) ===
            passwordGenerator: {
                name: "Password Generator",
                searchTerms: "password generator random secure",
                description: "Generate secure passwords",
                icon: "🔐",
                category: "Security",
                render: () => this.renderPasswordGenerator()
            },
            passwordStrength: {
                name: "Password Strength Checker",
                searchTerms: "password strength security check",
                description: "Check password strength",
                icon: "🛡️",
                category: "Security",
                render: () => this.renderPasswordStrength()
            },
            qrCode: {
                name: "QR Code Generator",
                searchTerms: "qr code generator barcode",
                description: "Generate QR codes",
                icon: "📱",
                category: "Generator",
                render: () => this.renderQRCode()
            },
            randomName: {
                name: "Random Name Generator",
                searchTerms: "random name generator fake person",
                description: "Generate random names",
                icon: "👤",
                category: "Generator",
                render: () => this.renderRandomName()
            },
            randomEmail: {
                name: "Random Email Generator",
                searchTerms: "random email generator fake",
                description: "Generate random email addresses",
                icon: "📧",
                category: "Generator",
                render: () => this.renderRandomEmail()
            },
            randomAddress: {
                name: "Random Address Generator",
                searchTerms: "random address generator fake",
                description: "Generate random addresses",
                icon: "🏠",
                category: "Generator",
                render: () => this.renderRandomAddress()
            },
            randomColor: {
                name: "Random Color Generator",
                searchTerms: "random color generator palette",
                description: "Generate random colors",
                icon: "🎨",
                category: "Generator",
                render: () => this.renderRandomColor()
            },
            randomDate: {
                name: "Random Date Generator",
                searchTerms: "random date generator",
                description: "Generate random dates",
                icon: "📅",
                category: "Generator",
                render: () => this.renderRandomDate()
            },
            randomList: {
                name: "Random List Picker",
                searchTerms: "random pick choose list",
                description: "Pick random items from list",
                icon: "🎯",
                category: "Generator",
                render: () => this.renderRandomList()
            },
            diceRoller: {
                name: "Dice Roller",
                searchTerms: "dice roll random d6 d20",
                description: "Roll virtual dice",
                icon: "🎲",
                category: "Generator",
                render: () => this.renderDiceRoller()
            },

            // === DESIGN TOOLS (10) ===
            colorPicker: {
                name: "Color Picker",
                searchTerms: "color picker hex rgb palette",
                description: "Pick and convert colors",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorPicker()
            },
            gradientGenerator: {
                name: "Gradient Generator",
                searchTerms: "gradient css color linear",
                description: "Generate CSS gradients",
                icon: "🌈",
                category: "Design",
                render: () => this.renderGradientGenerator()
            },
            shadowGenerator: {
                name: "Box Shadow Generator",
                searchTerms: "box shadow css generator",
                description: "Generate CSS box shadows",
                icon: "📦",
                category: "Design",
                render: () => this.renderShadowGenerator()
            },
            borderRadius: {
                name: "Border Radius Generator",
                searchTerms: "border radius css generator",
                description: "Generate CSS border radius",
                icon: "⬜",
                category: "Design",
                render: () => this.renderBorderRadius()
            },
            colorPalette: {
                name: "Color Palette Generator",
                searchTerms: "color palette scheme generator",
                description: "Generate color palettes",
                icon: "🎨",
                category: "Design",
                render: () => this.renderColorPalette()
            },
            imageResizer: {
                name: "Image Resizer",
                searchTerms: "image resize scale compress",
                description: "Resize images",
                icon: "🖼️",
                category: "Design",
                render: () => this.renderImageResizer()
            },
            imageToBase64: {
                name: "Image to Base64",
                searchTerms: "image base64 convert encode",
                description: "Convert image to Base64",
                icon: "🖼️",
                category: "Design",
                render: () => this.renderImageToBase64()
            },
            svgOptimizer: {
                name: "SVG Optimizer",
                searchTerms: "svg optimize compress minify",
                description: "Optimize SVG files",
                icon: "🎨",
                category: "Design",
                render: () => this.renderSVGOptimizer()
            },
            fontPairGenerator: {
                name: "Font Pair Generator",
                searchTerms: "font pair typography google fonts",
                description: "Generate font pairings",
                icon: "🔤",
                category: "Design",
                render: () => this.renderFontPairGenerator()
            },
            contrastChecker: {
                name: "Color Contrast Checker",
                searchTerms: "color contrast accessibility wcag",
                description: "Check color contrast ratios",
                icon: "👁️",
                category: "Design",
                render: () => this.renderContrastChecker()
            },

            // === UTILITY TOOLS (5) ===
            stopwatch: {
                name: "Stopwatch",
                searchTerms: "stopwatch timer time",
                description: "Simple stopwatch",
                icon: "⏱️",
                category: "Utility",
                render: () => this.renderStopwatch()
            },
            countdown: {
                name: "Countdown Timer",
                searchTerms: "countdown timer alarm",
                description: "Set a countdown timer",
                icon: "⏰",
                category: "Utility",
                render: () => this.renderCountdown()
            },
            notepad: {
                name: "Quick Notepad",
                searchTerms: "notepad notes text editor",
                description: "Quick notepad with auto-save",
                icon: "📓",
                category: "Utility",
                render: () => this.renderNotepad()
            },
            todoList: {
                name: "Todo List",
                searchTerms: "todo list tasks checklist",
                description: "Simple todo list",
                icon: "✅",
                category: "Utility",
                render: () => this.renderTodoList()
            },
            worldClock: {
                name: "World Clock",
                searchTerms: "world clock time zones",
                description: "View time in different zones",
                icon: "🌍",
                category: "Utility",
                render: () => this.renderWorldClock()
            }
        };
    }
