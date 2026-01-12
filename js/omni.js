/**
 * The Omni-Protocol Manager
 * Handles the logic for various browser-based utilities
 * 100% Client-Side, 0% Server.
 */

export class OmniProtocol {
    constructor(app) {
        this.app = app;
        this.tools = {
            wordCounter: {
                name: "Lexicon Auditor",
                description: "Real-time word and character frequency analysis.",
                icon: "🖋️",
                category: "Utility",
                volume: "High",
                render: () => this.renderWordCounter()
            },
            percentageCalc: {
                name: "Ratio Engine",
                description: "Solve any percentage relationship instantly.",
                icon: "📊",
                category: "Math",
                volume: "Extreme",
                render: () => this.renderPercentageCalc()
            },
            bmiCalc: {
                name: "Bio-Mass Index",
                description: "Actuarial health assessment based on WHO standards.",
                icon: "⚖️",
                category: "Health",
                volume: "Very High",
                render: () => this.renderBMICalc()
            },
            emiCalc: {
                name: "Debt Horizon",
                description: "Visualize loan interest and repayment timelines.",
                icon: "🏦",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderEMICalc()
            },
            caseConverter: {
                name: "Syntax Shifter",
                description: "Uppercase, lowercase, titlecase, and camelCase conversion.",
                icon: "🔠",
                category: "Utility",
                volume: "High",
                render: () => this.renderCaseConverter()
            },
            passwordGen: {
                name: "Entropy Forge",
                description: "Cryptographically secure password generation protocol.",
                icon: "🔐",
                category: "Security",
                volume: "High",
                render: () => this.renderPasswordGen()
            },
            countdownTimer: {
                name: "Temporal Anchor",
                description: "Precise countdown for mission-critical tasks.",
                icon: "⏱️",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderTimer()
            },
            inflationAuditor: {
                name: "Purchasing Power",
                description: "Visualize the decay of currency over time.",
                icon: "📉",
                category: "Finance",
                volume: "High",
                render: () => this.renderInflation()
            },
            creatorYield: {
                name: "Engagement Yield",
                description: "Estimate social media revenue potential.",
                icon: "📸",
                category: "Creator",
                volume: "Very High",
                render: () => this.renderCreatorYield()
            },
            chromaForge: {
                name: "Spectral Hash",
                description: "Generate cinematic color palettes from hex codes.",
                icon: "🎨",
                category: "Design",
                volume: "High",
                render: () => this.renderChromaForge()
            },
            fiscalTransparency: {
                name: "Fiscal Transparency",
                description: "Calculate Sales Tax, GST, and net totals instantly.",
                icon: "🧾",
                category: "Finance",
                volume: "High",
                render: () => this.renderFiscal()
            },
            precisionLimits: {
                name: "Precision Limits",
                description: "Optimize transmissions for X, Threads, and LinkedIn.",
                icon: "📡",
                category: "Social",
                volume: "High",
                render: () => this.renderPrecision()
            },
            aegisAudit: {
                name: "Aegis Audit",
                description: "Test the entropy and brute-force time of your secrets.",
                icon: "🛡️",
                category: "Security",
                volume: "Very High",
                render: () => this.renderAegis()
            },
            hydrationLogic: {
                name: "Hydration Logic",
                description: "Calculate optimal biological fluid intake.",
                icon: "💧",
                category: "Health",
                volume: "High",
                render: () => this.renderHydration()
            },
            base2Cipher: {
                name: "Base-2 Cipher",
                description: "Convert human language to binary and back.",
                icon: "🔢",
                category: "Dev",
                volume: "High",
                render: () => this.renderBinary()
            },
            dataRefiner: {
                name: "Data Refiner",
                description: "Format, validate, and minify JSON payloads.",
                icon: "🗄️",
                category: "Dev",
                volume: "Very High",
                render: () => this.renderJSON()
            },
            atrophyAudit: {
                name: "Digital Atrophy",
                description: "Audit the life-years lost to screen saturation.",
                icon: "📱",
                category: "Existence",
                volume: "Extreme",
                render: () => this.renderAtrophy()
            },
            unitPulse: {
                name: "Unit Pulse",
                description: "Convert biological and physical units across dimensions.",
                icon: "📏",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderUnits()
            },
            signalCode: {
                name: "Signal Code",
                description: "Translate human language into universal Morse protocol.",
                icon: "📡",
                category: "Dev",
                volume: "High",
                render: () => this.renderMorse()
            },
            logicalBaseline: {
                name: "Logical Baseline",
                description: "Scientific computation engine for complex biological modeling.",
                icon: "🧮",
                category: "Math",
                volume: "Extreme",
                render: () => this.renderScientificCalc()
            },
            ageCalculator: {
                name: "Chronos Audit",
                description: "Deep physiological age analysis in multiple temporal units.",
                icon: "📅",
                category: "Existence",
                volume: "Very High",
                render: () => this.renderAgeCalc()
            },
            slugGenerator: {
                name: "String Purge",
                description: "Purify strings into SEO-optimized URL descriptors.",
                icon: "🔗",
                category: "Dev",
                volume: "High",
                render: () => this.renderSlugGen()
            },
            base64Cipher: {
                name: "Base-64 Protocol",
                description: "Binary-to-text encoding for secure data transmission.",
                icon: "💾",
                category: "Dev",
                volume: "High",
                render: () => this.renderBase64()
            },
            unixEpoch: {
                name: "Temporal Timestamp",
                description: "Convert between human time and Unix epoch protocols.",
                icon: "⌛",
                category: "Dev",
                volume: "High",
                render: () => this.renderUnixEpoch()
            },
            colorConverter: {
                name: "Spectrum Pulse",
                description: "Map color coordinates between HEX, RGB, and HSL spaces.",
                icon: "🌈",
                category: "Design",
                volume: "High",
                render: () => this.renderColorConvert()
            },
            macroEngine: {
                name: "Macro Engine",
                description: "Calculate optimal biological machine fueling (BMR/Macros).",
                icon: "🥗",
                category: "Health",
                volume: "High",
                render: () => this.renderMacros()
            },
            cipherLogic: {
                name: "Cipher Logic",
                description: "Encrypt messages using classic rot13/shift protocols.",
                icon: "🔡",
                category: "Security",
                volume: "Medium",
                render: () => this.renderCipher()
            },
            loremForge: {
                name: "Lorem Forge",
                description: "Generate high-fidelity dummy text for structural testing.",
                icon: "📝",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderLorem()
            },
            aspectRatio: {
                name: "Aspect Ratio",
                description: "Calculate dimensional proportions for cinematic frames.",
                icon: "🖼️",
                category: "Design",
                volume: "High",
                render: () => this.renderAspectRatio()
            },
            compoundYield: {
                name: "Compound Yield",
                description: "Visualize the exponential growth of invested capital.",
                icon: "📈",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderCompound()
            },
            entityVault: {
                name: "Entity Vault",
                description: "Encode and decode HTML entities for safe transmission.",
                icon: "🔣",
                category: "Dev",
                volume: "High",
                render: () => this.renderEntities()
            },
            primeAudit: {
                name: "Prime Audit",
                description: "Test integers for primality and factor efficiency.",
                icon: "🔢",
                category: "Math",
                volume: "Medium",
                render: () => this.renderPrimes()
            },
            stopwatchPulse: {
                name: "Stopwatch Pulse",
                description: "High-precision temporal tracking for biological loops.",
                icon: "⏱️",
                category: "Utility",
                volume: "High",
                render: () => this.renderStopwatch()
            },
            duplicatePurge: {
                name: "Duplicate Purge",
                description: "Remove redundant data lines from text payloads.",
                icon: "🧹",
                category: "Utility",
                volume: "Low",
                render: () => this.renderDupes()
            },
            salaryPivot: {
                name: "Salary Pivot",
                description: "Convert hourly biological labor into annual capital projections.",
                icon: "💸",
                category: "Finance",
                volume: "High",
                render: () => this.renderSalary()
            },
            jsonValidator: {
                name: "JSON Schema",
                description: "Validate and audit JSON structures for protocol compliance.",
                icon: "📋",
                category: "Dev",
                volume: "High",
                render: () => this.renderJSONAuth()
            },
            hexForge: {
                name: "Hex Forge",
                description: "Generate randomized high-fidelity color specifications.",
                icon: "🎲",
                category: "Design",
                volume: "High",
                render: () => this.renderHexGen()
            },
            wordFreq: {
                name: "Frequency Hub",
                description: "Analyze the density and repetition of linguistic segments.",
                icon: "📶",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderFreq()
            },
            bmrAudit: {
                name: "BMR Audit",
                description: "Quantify the baseline metabolic cost of biological existence.",
                icon: "🫀",
                category: "Health",
                volume: "High",
                render: () => this.renderBMR()
            },
            simpleInterest: {
                name: "Interest Flow",
                description: "Calculate linear interest yields on static capital.",
                icon: "💵",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderSimpleInt()
            },
            flipCase: {
                name: "Case Flip",
                description: "Invert the casing protocol of every character in a string.",
                icon: "🔃",
                category: "Utility",
                volume: "Low",
                render: () => this.renderFlip()
            },
            leapChecker: {
                name: "Leap Logic",
                description: "Verify the alignment of the Gregorian calendar cycle.",
                icon: "📅",
                category: "Time",
                volume: "Low",
                render: () => this.renderLeap()
            },
            charMap: {
                name: "Character Map",
                description: "Reference the ASCII and Unicode map for system segments.",
                icon: "🔡",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderChars()
            },
            vibrantYield: {
                name: "Vibrant Yield",
                description: "Derive complex color harmonies from a single coordinate.",
                icon: "🌈",
                category: "Design",
                volume: "High",
                render: () => this.renderVibrant()
            },
            binaryLogic: {
                name: "Binary Logic",
                description: "Translate between binary, decimal, and hex coordinates.",
                icon: "💻",
                category: "Dev",
                volume: "High",
                render: () => this.renderBinLogic()
            },
            trimPurge: {
                name: "Whitespace Purge",
                description: "Strip redundant whitespace and empty segments from text.",
                icon: "✂️",
                category: "Utility",
                volume: "Low",
                render: () => this.renderTrim()
            },
            tipProtocol: {
                name: "Tip Protocol",
                description: "Calculate service gratifications and communal division.",
                icon: "🍽️",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderTip()
            },
            pxToRem: {
                name: "PX to REM",
                description: "Map pixel values to responsive rem units for design scaling.",
                icon: "📏",
                category: "Dev",
                volume: "High",
                render: () => this.renderPxRem()
            },
            markdownForge: {
                name: "Markdown Forge",
                description: "Real-time structural preview for markdown-based logic.",
                icon: "📝",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderMD()
            },
            textReverse: {
                name: "Text Reverser",
                description: "Invert the sequential order of linguistic characters.",
                icon: "◀️",
                category: "Utility",
                volume: "Low",
                render: () => this.renderReverse()
            },
            base8Cipher: {
                name: "Base-8 Cipher",
                description: "Translate decimal coordinates to octal protocol.",
                icon: "🔢",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderOctal()
            },
            hashForge: {
                name: "Hash Forge",
                description: "Generate SHA-256 cryptographic fingerprints for data segments.",
                icon: "🔑",
                category: "Security",
                volume: "Extreme",
                render: () => this.renderHash()
            },
            lineAuditor: {
                name: "Line Auditor",
                description: "Quantify the frequency of newline characters and unique segments.",
                icon: "📊",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderLines()
            },
            urlAuditor: {
                name: "URL Auditor",
                description: "Deconstruct and decode complex URL parameters.",
                icon: "🌐",
                category: "Dev",
                volume: "High",
                render: () => this.renderURL()
            },
            listForge: {
                name: "List Forge",
                description: "Automate the generation of numerical or bulleted structures.",
                icon: "📜",
                category: "Utility",
                volume: "Low",
                render: () => this.renderList()
            },
            randomSeq: {
                name: "Random Sequence",
                description: "Forge high-entropy random strings for system testing.",
                icon: "🎲",
                category: "Dev",
                volume: "High",
                render: () => this.renderRand()
            },
            gpaEngine: {
                name: "GPA Engine",
                description: "Calculate academic performance average across modules.",
                icon: "🎓",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderGPA()
            },
            ageSeconds: {
                name: "Age In Seconds",
                description: "Quantify your total biological existence in base-60 units.",
                icon: "⌛",
                category: "Existence",
                volume: "Medium",
                render: () => this.renderSeconds()
            },
            taxFlow: {
                name: "Tax Flow",
                description: "Calculate standard sales tax for commercial transactions.",
                icon: "💵",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderTax()
            },
            vatLogic: {
                name: "Vat Logic",
                description: "Deconstruct Value Added Tax for international protocol.",
                icon: "🌍",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderVAT()
            },
            windowPulse: {
                name: "Window Pulse",
                description: "Audit the dimensional boundaries of your visual viewport.",
                icon: "🖥️",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderViewport()
            },
            userAgent: {
                name: "User Agent",
                description: "Deconstruct the identification string of your biological interface.",
                icon: "🆔",
                category: "Dev",
                volume: "High",
                render: () => this.renderUA()
            },
            binaryText: {
                name: "Binary Text",
                description: "Encode and decode blocks of binary data to human language.",
                icon: "💾",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderBinText()
            },
            rgbToHex: {
                name: "RGB to HEX",
                description: "Map integer coordinates to hexadecimal color protocol.",
                icon: "🎨",
                category: "Design",
                volume: "High",
                render: () => this.renderRGBHex()
            },
            hslToRgb: {
                name: "HSL to RGB",
                description: "Translate hue and saturation into integer space coordinates.",
                icon: "🖌️",
                category: "Design",
                volume: "Medium",
                render: () => this.renderHSLRGB()
            },
            cmykForge: {
                name: "CMYK Forge",
                description: "Calculate print-ready coordinates for physical reproduction.",
                icon: "🖨️",
                category: "Design",
                volume: "Medium",
                render: () => this.renderCMYK()
            },
            shadowForge: {
                name: "Box Shadow",
                description: "Generate deep dimensional CSS shadow protocols.",
                icon: "🌑",
                category: "Design",
                volume: "Extreme",
                render: () => this.renderShadow()
            },
            radiusForge: {
                name: "Border Radius",
                description: "Curate the structural curvature of layout segments.",
                icon: "⭕",
                category: "Design",
                volume: "High",
                render: () => this.renderRadius()
            },
            flexYield: {
                name: "Flexbox Yield",
                description: "Visualize and generate flexible orientation protocols.",
                icon: "🧊",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderFlex()
            },
            gradientForge: {
                name: "Gradient Forge",
                description: "Forge multi-stage chromatic transitions for surfaces.",
                icon: "🌈",
                category: "Design",
                volume: "Extreme",
                render: () => this.renderGradients()
            },
            textShadow: {
                name: "Text Shadow",
                description: "Apply dimensional offset protocols to linguistic assets.",
                icon: "🔠",
                category: "Design",
                volume: "High",
                render: () => this.renderTxtShadow()
            },
            opacityForge: {
                name: "Opacity Forge",
                description: "Calculate transparency protocols for interface layers.",
                icon: "👻",
                category: "Design",
                volume: "Medium",
                render: () => this.renderOpacity()
            },
            whiteCounter: {
                name: "Whitespace Count",
                description: "Analyze the density of empty space in text segments.",
                icon: "🦷",
                category: "Utility",
                volume: "Low",
                render: () => this.renderWSCount()
            },
            scrambler: {
                name: "Word Scrambler",
                description: "Randomize the sequential order of words in a payload.",
                icon: "🌪️",
                category: "Utility",
                volume: "Low",
                render: () => this.renderScramble()
            },
            anagramAudit: {
                name: "Anagram Audit",
                description: "Test two textual segments for identical character density.",
                icon: "🔄",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderAnagram()
            },
            lineSorter: {
                name: "Line Sorter",
                description: "Organize textual segments into alphabetical or reverse orientation.",
                icon: "🔡",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderSort()
            },
            wordWrapper: {
                name: "Word Wrapper",
                description: "Constrain linguistic segments to specific character boundaries.",
                icon: "🌯",
                category: "Dev",
                volume: "Low",
                render: () => this.renderWrap()
            },
            jsonEscaper: {
                name: "JSON Escape",
                description: "Convert textual segments into escaped JSON-compatible strings.",
                icon: "🔓",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderEscape()
            },
            emojiPulse: {
                name: "Emoji Pulse",
                description: "Interface with common ideological icons and symbols.",
                icon: "😎",
                category: "Design",
                volume: "High",
                render: () => this.renderEmoji()
            },
            metronomePulse: {
                name: "Metronome",
                description: "Calculate and visualize temporal pulse coordinates (BPM).",
                icon: "⏱️",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderMetro()
            },
            wordFinder: {
                name: "Word Finder",
                description: "Locate specific linguistic segments within a payload.",
                icon: "🔍",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderFind()
            },
            codeMinifier: {
                name: "Code Minifier",
                description: "Strip redundant segments from code structures for efficiency.",
                icon: "📦",
                category: "Dev",
                volume: "High",
                render: () => this.renderMinify()
            },
            sqlFormatter: {
                name: "SQL Formatter",
                description: "Organize database queries into readable structural blocks.",
                icon: "🗄️",
                category: "Dev",
                volume: "High",
                render: () => this.renderSQL()
            },
            cssFormatter: {
                name: "CSS Formatter",
                description: "Beautify and indent visual style protocols.",
                icon: "🎨",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderCSS()
            },
            jsFormatter: {
                name: "JS Formatter",
                description: "Structure logic protocols with consistent indentation.",
                icon: "📜",
                category: "Dev",
                volume: "High",
                render: () => this.renderJS()
            },
            xmlValidator: {
                name: "XML Validator",
                description: "Audit XML structures for structural integrity.",
                icon: "📑",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderXML()
            },
            yamlToJson: {
                name: "YAML to JSON",
                description: "Translate YAML coordinates into JSON data segments.",
                icon: "🔄",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderY2J()
            },
            jsonToYaml: {
                name: "JSON to YAML",
                description: "Convert JSON data into human-readable YAML protocol.",
                icon: "📄",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderJ2Y()
            },
            csvToJson: {
                name: "CSV to JSON",
                description: "Transform tabular CSV data into JSON objects.",
                icon: "📊",
                category: "Dev",
                volume: "High",
                render: () => this.renderC2J()
            },
            jsonToCsv: {
                name: "JSON to CSV",
                description: "Export JSON data segments into tabular CSV structures.",
                icon: "📉",
                category: "Dev",
                volume: "High",
                render: () => this.renderJ2C()
            },
            textToSpeech: {
                name: "Voice Forge",
                description: "Translate textual segments into vocalized sound waves.",
                icon: "🗣️",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderTTS()
            },
            speechToText: {
                name: "Voice Audit",
                description: "Transcribe biological vocalizations into textual data.",
                icon: "🎙️",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderSTT()
            },
            debtAmortization: {
                name: "Amortization",
                description: "Analyze the lifespan and interest flow of complex debt.",
                icon: "📉",
                category: "Finance",
                volume: "High",
                render: () => this.renderAmort()
            },
            savingsGoal: {
                name: "Savings Goal",
                description: "Quantify the temporal requirements to reach capital targets.",
                icon: "🎯",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderSavings()
            },
            profitMargin: {
                name: "Profit Margin",
                description: "Audit the efficiency of commercial capital exchange.",
                icon: "📈",
                category: "Finance",
                volume: "High",
                render: () => this.renderProfit()
            },
            retirementPulse: {
                name: "Retirement",
                description: "Envision the capital required for biological cessation of labor.",
                icon: "🏖️",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderRetire()
            },
            mortgageYield: {
                name: "Mortgage Logic",
                description: "Calculate the long-term cost of residential capital acquisition.",
                icon: "🏠",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderMortgage()
            },
            loanDuration: {
                name: "Loan Term",
                description: "Calculate the temporal boundaries of financial obligations.",
                icon: "⏳",
                category: "Finance",
                volume: "High",
                render: () => this.renderLoanTerm()
            },
            fuelAudit: {
                name: "Fuel Audit",
                description: "Quantify the energy cost of geographical displacement.",
                icon: "⛽",
                category: "Utility",
                volume: "High",
                render: () => this.renderFuel()
            },
            passwordCheck: {
                name: "Cipher Check",
                description: "Audit the computational complexity of access keys.",
                icon: "🔑",
                category: "Security",
                volume: "Extreme",
                render: () => this.renderPassCheck()
            },
            jwtAudit: {
                name: "JWT Audit",
                description: "Deconstruct and decode JSON Web Tokens for protocol verification.",
                icon: "🔐",
                category: "Security",
                volume: "High",
                render: () => this.renderJWT()
            },
            xssPurge: {
                name: "XSS Purge",
                description: "Sanitize and neutralize potentially malicious HTML/JS payloads.",
                icon: "🛡️",
                category: "Security",
                volume: "Medium",
                render: () => this.renderXSS()
            },
            regexPulse: {
                name: "Regex Pulse",
                description: "Real-time visual testing for regular expression patterns.",
                icon: "⚙️",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderRegex()
            },
            diffEngine: {
                name: "Diff Engine",
                description: "Identify structural and textual variances between data blocks.",
                icon: "⚖️",
                category: "Dev",
                volume: "High",
                render: () => this.renderDiff()
            },
            cronLogic: {
                name: "Cron Logic",
                description: "Generate and interpret temporal schedule expressions.",
                icon: "🕒",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderCron()
            },
            sitemapForge: {
                name: "Sitemap Forge",
                description: "Generate structural XML sitemaps for SEO mapping.",
                icon: "🗺️",
                category: "Dev",
                volume: "High",
                render: () => this.renderSitemap()
            },
            robotsProtocol: {
                name: "Robots Protocol",
                description: "Forge robots.txt directives for search engine crawlers.",
                icon: "🤖",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderRobots()
            },
            matrixEngine: {
                name: "Matrix Engine",
                description: "Perform advanced arithmetic operations on multi-dimensional matrices.",
                icon: "🔢",
                category: "Math",
                volume: "Medium",
                render: () => this.renderMatrix()
            },
            geometryPulse: {
                name: "Geometry Pulse",
                description: "Calculate dimensional properties for complex geometric volumes.",
                icon: "📐",
                category: "Math",
                volume: "High",
                render: () => this.renderGeometry()
            },
            contrastAudit: {
                name: "Contrast Audit",
                description: "Verify visual accessibility ratios against WCAG standards.",
                icon: " kontrast",
                icon: "🌗",
                category: "Design",
                volume: "High",
                render: () => this.renderContrast()
            },
            blindnessPulse: {
                name: "Blindness Pulse",
                description: "Simulate chromatic biological vision variances on design assets.",
                icon: "👁️",
                category: "Design",
                volume: "Medium",
                render: () => this.renderBlindness()
            },
            phoneticSignal: {
                name: "Phonetic Signal",
                description: "Translate strings into standardized NATO phonetic protocol.",
                icon: "📢",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderPhonetic()
            },
            sleepPulse: {
                name: "Sleep Pulse",
                description: "Calculate optimal biological shutdown and wake cycles.",
                icon: "😴",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderSleep()
            },
            calorieYield: {
                name: "Calorie Yield",
                description: "Estimate energy expenditure across various biological activities.",
                icon: "🔥",
                category: "Health",
                volume: "High",
                render: () => this.renderCalories()
            },
            profitPulse: {
                name: "Profit Pulse",
                description: "Calculate yield percentages for stock and crypto capital.",
                icon: "📈",
                category: "Finance",
                volume: "High",
                render: () => this.renderProfitPulse()
            },
            marginForge: {
                name: "Margin Forge",
                description: "Analyze markup and profit margins for pricing structures.",
                icon: "💰",
                category: "Finance",
                volume: "High",
                render: () => this.renderMargin()
            },
            debtSnowball: {
                name: "Snowball Logic",
                description: "Visualize debt elimination strategies and interest savings.",
                icon: "🏔️",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderSnowball()
            },
            privacyProtocol: {
                name: "Privacy Protocol",
                description: "Generate synthetic identities for secure system testing.",
                icon: "👤",
                category: "Security",
                volume: "Medium",
                render: () => this.renderPrivacy()
            },
            timezonePulse: {
                name: "Timezone Pulse",
                description: "Map temporal coordinates across global geographic offsets.",
                icon: "🌐",
                category: "Time",
                volume: "Extreme",
                render: () => this.renderTimezone()
            },
            metricPulse: {
                name: "Metric Pulse",
                description: "Unified conversion logic for length, mass, and volume protocols.",
                icon: "📏",
                category: "Utility",
                volume: "High",
                render: () => this.renderMetric()
            },
            angleLogic: {
                name: "Angle Logic",
                description: "Translate between degree and radian geometric coordinates.",
                icon: "📐",
                category: "Math",
                volume: "Medium",
                render: () => this.renderAngle()
            },
            dataBytePulse: {
                name: "Data Byte Pulse",
                description: "Convert digital protocol units from bits to terabytes.",
                icon: "💾",
                category: "Dev",
                volume: "High",
                render: () => this.renderDataByte()
            },
            readingPulse: {
                name: "Reading Pulse",
                description: "Estimate reading and vocalization durations for linguistic payloads.",
                icon: "📖",
                category: "Utility",
                volume: "High",
                render: () => this.renderReading()
            },
            shuffleLogic: {
                name: "Shuffle Logic",
                description: "Randomize the structural order of multi-line list protocols.",
                icon: "🔀",
                category: "Utility",
                volume: "Low",
                render: () => this.renderShuffle()
            },
            growthPulse: {
                name: "Growth Pulse",
                description: "Analyze percentage variances and structural growth trends.",
                icon: "📈",
                category: "Math",
                volume: "High",
                render: () => this.renderGrowth()
            },
            borrowPower: {
                name: "Borrowing Power",
                description: "Gauge financial leverage based on mission-critical payments.",
                icon: "🏠",
                category: "Finance",
                volume: "High",
                render: () => this.renderBorrow()
            },
            ageProgress: {
                name: "Existence Progress",
                description: "Visualize biological timeline advancement in high-fidelity.",
                icon: "📊",
                category: "Existence",
                volume: "Medium",
                render: () => this.renderAgeProgress()
            },
            shadowText: {
                name: "Shadow Text",
                description: "Generate deep dimensional CSS text shadow directives.",
                icon: "🔠",
                category: "Design",
                volume: "High",
                render: () => this.renderShadowText()
            },
            linePurge: {
                name: "Line Purge",
                description: "Strip all newline protocols for consolidated string transmission.",
                icon: "➖",
                category: "Utility",
                volume: "Low",
                render: () => this.renderLinePurge()
            },
            whitespacePurge: {
                name: "Whitespace Pulse",
                description: "Sanitize strings by purging all spatial whitespace characters.",
                icon: "🧼",
                category: "Utility",
                volume: "Low",
                render: () => this.renderWSPurge()
            },
            capitalPulse: {
                name: "Capital Pulse",
                description: "Calculate market valuation and project equity protocols.",
                icon: "🏢",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderCapital()
            },
            roiPulse: {
                name: "Return Pivot",
                description: "Quantify the yield efficiency of invested capital assets.",
                icon: "💎",
                category: "Finance",
                volume: "High",
                render: () => this.renderROI()
            },
            metabolicYield: {
                name: "TDEE Audit",
                description: "Calculate total daily biological energy expenditure protocol.",
                icon: "⚡",
                category: "Health",
                volume: "High",
                render: () => this.renderTDEE()
            },
            ovulationPulse: {
                name: "Fertility Pulse",
                description: "Map biological reproductive cycles and fertile windows.",
                icon: "🧬",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderFertility()
            },
            vatForge: {
                name: "VAT Forge",
                description: "Calculate value-added tax and gross pricing protocols.",
                icon: "🧾",
                category: "Finance",
                volume: "High",
                render: () => this.renderVAT()
            },
            discountPulse: {
                name: "Discount Pulse",
                description: "Analyze price reductions and capital savings efficiency.",
                icon: "🏷️",
                category: "Finance",
                volume: "High",
                render: () => this.renderDiscount()
            },
            tipProtocol: {
                name: "Gratuity Logic",
                description: "Calculate service tips and split protocols for synchronized payments.",
                icon: "🤝",
                category: "Finance",
                volume: "High",
                render: () => this.renderTip()
            },
            hourlyYield: {
                name: "Hourly Yield",
                description: "Convert annual salary into granular hourly compensation metrics.",
                icon: "⏱️",
                category: "Finance",
                volume: "High",
                render: () => this.renderHourly()
            },
            tapBPM: {
                name: "BPM Pulse",
                description: "Calibrate temporal frequency via manual tactile input.",
                icon: "🥁",
                category: "Music",
                volume: "Medium",
                render: () => this.renderBPM()
            },
            freqForge: {
                name: "Frequency Forge",
                description: "Map musical notation to precise acoustic hertz coordinates.",
                icon: "📻",
                category: "Music",
                volume: "Low",
                render: () => this.renderFreq()
            },
            aspectLogic: {
                name: "Aspect Logic",
                description: "Maintain dimensional integrity across various display aspect ratios.",
                icon: "📺",
                category: "Design",
                volume: "High",
                render: () => this.renderAspect()
            },
            loremForge: {
                name: "Lorem Forge",
                description: "Generate synthetic placeholder payloads for layout testing.",
                icon: "📝",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderLorem()
            },
            keywordAudit: {
                name: "Keyword Pulse",
                description: "Audit linguistic density and semantic term frequency.",
                icon: "🔍",
                category: "SEO",
                volume: "High",
                render: () => this.renderKeyword()
            },
            slugForge: {
                name: "Slug Forge",
                description: "Forge URL-compliant string identifiers from raw text inputs.",
                icon: "🔗",
                category: "SEO",
                volume: "High",
                render: () => this.renderSlug()
            },
            binaryPulse: {
                name: "Binary Signal",
                description: "Translate strings into base-2 machine-executable protocols.",
                icon: "0️⃣1️⃣",
                category: "Dev",
                volume: "High",
                render: () => this.renderBinary()
            },
            hexSignal: {
                name: "Hex Signal",
                description: "Convert data blocks into hexadecimal encoding protocols.",
                icon: "⌗",
                category: "Dev",
                volume: "High",
                render: () => this.renderHex()
            },
            morseSignal: {
                name: "Morse Signal",
                description: "Transmit data via international morse temporal patterns.",
                icon: "➖",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderMorse()
            },
            caesarCipher: {
                name: "Caesar Logic",
                description: "Apply standard rotational shifts to sensitive string data.",
                icon: "🏛️",
                category: "Security",
                volume: "Medium",
                render: () => this.renderCaesar()
            },
            logicGate: {
                name: "Logic Gate",
                description: "Generate truth tables for fundamental boolean logic operators.",
                icon: "🔌",
                category: "Math",
                volume: "Medium",
                render: () => this.renderLogicGate()
            },
            clampForge: {
                name: "Clamp Forge",
                description: "Generate CSS clamp() directives for fluid UI scaling.",
                icon: "🗜️",
                category: "Design",
                volume: "High",
                render: () => this.renderClamp()
            },
            faviconPulse: {
                name: "Favicon Forge",
                description: "Synthesize browser icons directly from emoji protocols.",
                icon: "🖼️",
                category: "Design",
                volume: "Medium",
                render: () => this.renderFavicon()
            },
            imageSignal: {
                name: "Image Signal",
                description: "Convert visual assets into Base64 data-URI protocols.",
                icon: "📷",
                category: "Dev",
                volume: "High",
                render: () => this.renderImage64()
            },
            primeAudit: {
                name: "Prime Audit",
                description: "Verify the primality of large-scale numeric integers.",
                icon: "🔟",
                category: "Math",
                volume: "Medium",
                render: () => this.renderPrime()
            },
            lineCountPulse: {
                name: "Line Audit",
                description: "Quantify the structural depth of multi-line data blocks.",
                icon: "📉",
                category: "Utility",
                volume: "Low",
                render: () => this.renderLineCount()
            },
            casePulse: {
                name: "Case Logic",
                description: "Standardize string casings across various protocol formats.",
                icon: "🔡",
                category: "Dev",
                volume: "High",
                render: () => this.renderCase()
            },
            jsonForge: {
                name: "JSON Forge",
                description: "Beautify and validate complex JSON data structures.",
                icon: "📦",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderJSON()
            },
            urlAudit: {
                name: "URL Pivot",
                description: "Extract and decode query parameters from URL strings.",
                icon: "🔗",
                category: "Dev",
                volume: "High",
                render: () => this.renderURL()
            },
            creditCardAudit: {
                name: "Luhn Audit",
                description: "Verify payment card integrity via the Luhn algorithm.",
                icon: "💳",
                category: "Finance",
                volume: "High",
                render: () => this.renderLuhn()
            },
            loanAfford: {
                name: "Loan Horizon",
                description: "Calculate maximum capital leverage based on monthly yield.",
                icon: "🏦",
                category: "Finance",
                volume: "High",
                render: () => this.renderAfford()
            },
            inflationPulse: {
                name: "Inflation Pulse",
                description: "Analyze the erosion of purchasing power across temporal offsets.",
                icon: "🕯️",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderInflation()
            },
            cryptoPivot: {
                name: "Satoshi Logic",
                description: "Convert between SATs and BTC denominations.",
                icon: "₿",
                category: "Finance",
                volume: "Low",
                render: () => this.renderCrypto()
            },
            bmiAudit: {
                name: "BMI Audit",
                description: "Calculate biological body mass index from physical metrics.",
                icon: "⚖️",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderBMI()
            },
            whrAudit: {
                name: "WHR Audit",
                description: "Analyze waist-to-hip ratios for biological health mapping.",
                icon: "📏",
                category: "Health",
                volume: "Medium",
                render: () => this.renderWHR()
            },
            macroYield: {
                name: "Macro Pulse",
                description: "Calculate optimal biological macronutrient distribution.",
                icon: "🥗",
                category: "Health",
                volume: "High",
                render: () => this.renderMacros()
            },
            colorForge: {
                name: "Color Forge",
                description: "Generate high-fidelity chromatic palettes and hex codes.",
                icon: "🎨",
                category: "Design",
                volume: "Extreme",
                render: () => this.renderColors()
            },
            borderForge: {
                name: "Corner Forge",
                description: "Simulate and generate CSS border-radius directives.",
                icon: "⏹️",
                category: "Design",
                volume: "High",
                render: () => this.renderBorder()
            },
            opacitySignal: {
                name: "Alpha Signal",
                description: "Modify chromatic opacity and transparency protocols.",
                icon: "👻",
                category: "Design",
                volume: "Medium",
                render: () => this.renderAlpha()
            },
            romanSignal: {
                name: "Roman Logic",
                description: "Convert integers to classical Roman numerical symbols.",
                icon: "🏛️",
                category: "Math",
                volume: "Low",
                render: () => this.renderRoman()
            },
            factorialPulse: {
                name: "Factorial Pulse",
                description: "Calculate the product of an integer and all preceding integers.",
                icon: "❕",
                category: "Math",
                volume: "Medium",
                render: () => this.renderFactorial()
            },
            randomSignal: {
                name: "Entropy Forge",
                description: "Generate high-entropy random scalars within defined ranges.",
                icon: "🎲",
                category: "Math",
                volume: "High",
                render: () => this.renderRandom()
            },
            stopwatchPulse: {
                name: "Precision Pulse",
                description: "Capture millisecond-accurate temporal intervals.",
                icon: "⏱️",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderStopwatch()
            },
            timerPulse: {
                name: "Horizon Pulse",
                description: "Execute countdown protocols for temporal management.",
                icon: "⏲️",
                category: "Utility",
                volume: "High",
                render: () => this.renderTimer()
            },
            base64Audit: {
                name: "Base64 Decode",
                description: "Translate Base64 encoded streams back to readable protocols.",
                icon: "🔓",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderBase64()
            },
            htmlEntityForge: {
                name: "Entity Forge",
                description: "Encode and decode special HTML character entities.",
                icon: "⟨⟩",
                category: "Dev",
                volume: "High",
                render: () => this.renderEntities()
            },
            xmlForge: {
                name: "XML Logic",
                description: "Format and validate XML tree structures for structural integrity.",
                icon: "📜",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderXML()
            },
            cssUnitPivot: {
                name: "Unit Pivot",
                description: "Convert pixel measurements into relative rem/em units.",
                icon: "📏",
                category: "Design",
                volume: "High",
                render: () => this.renderUnit()
            },
            hslPivot: {
                name: "HSL Signal",
                description: "Map hex colors into cylindrical HSL coordinate systems.",
                icon: "🌈",
                category: "Design",
                volume: "High",
                render: () => this.renderHSL()
            },
            gradientForge: {
                name: "Gradient Forge",
                description: "Synthesize CSS linear gradient protocols for visual depth.",
                icon: "📐",
                category: "Design",
                volume: "High",
                render: () => this.renderGradient()
            },
            paycheckAudit: {
                name: "Yield Audit",
                description: "Analyze gross-to-net compensation after generic deductions.",
                icon: "💵",
                category: "Finance",
                volume: "High",
                render: () => this.renderPaycheck()
            },
            stockYield: {
                name: "ROI Pulse",
                description: "Calculate return on investment protocols for capital assets.",
                icon: "📈",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderROI()
            },
            compoundLogic: {
                name: "Compound Logic",
                description: "Project long-term capital growth via compound interest.",
                icon: "🔮",
                category: "Finance",
                volume: "High",
                render: () => this.renderCompound()
            },
            sleepAudit: {
                name: "Sleep Pulse",
                description: "Optimize biological rest cycles based on 90-minute REM intervals.",
                icon: "🌙",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderSleep()
            },
            stepYield: {
                name: "Stride Pulse",
                description: "Translate step counts into precise geometric distance metrics.",
                icon: "👣",
                category: "Health",
                volume: "Medium",
                render: () => this.renderSteps()
            },
            waterPulse: {
                name: "Hydration Pulse",
                description: "Track and optimize biological hydration levels.",
                icon: "💧",
                category: "Health",
                volume: "High",
                render: () => this.renderHydration()
            },
            agePulse: {
                name: "Epoch Pulse",
                description: "Quantify exact existence duration in temporal granularities.",
                icon: "⏳",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderAge()
            },
            dayPulse: {
                name: "Day Logic",
                description: "Determine calendar day designations for any temporal coordinate.",
                icon: "📅",
                category: "Utility",
                volume: "Low",
                render: () => this.renderDay()
            },
            listPulse: {
                name: "List Forge",
                description: "Convert raw multi-line strings into JSON array protocols.",
                icon: "📋",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderList()
            },
            markdownForge: {
                name: "Markdown Pulse",
                description: "Generate live HTML previews from markdown syntax strings.",
                icon: "✍️",
                category: "Dev",
                volume: "High",
                render: () => this.renderMarkdown()
            },
            percentAudit: {
                name: "Percent Logic",
                description: "Calculate proportional percentages and delta variations.",
                icon: "％",
                category: "Math",
                volume: "Extreme",
                render: () => this.renderPercent()
            },
            averagePulse: {
                name: "Mean Signal",
                description: "Calculate the arithmetic average of numeric datasets.",
                icon: "📊",
                category: "Math",
                volume: "High",
                render: () => this.renderMean()
            },
            tipLogic: {
                name: "Gratuity Pulse",
                description: "Analyze service tips and capital splits across multi-human inputs.",
                icon: "💰",
                category: "Finance",
                volume: "High",
                render: () => this.renderGratuity()
            },
            yamlPulse: {
                name: "YAML Pivot",
                description: "Translate YAML configurations into JSON data protocols.",
                icon: "📑",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderYAML()
            },
            envForge: {
                name: "Environment Forge",
                description: "Generate secure environment variable templates for system isolation.",
                icon: "🔐",
                category: "Dev",
                volume: "High",
                render: () => this.renderENV()
            },
            dockerPulse: {
                name: "Container Logic",
                description: "Synthesize Dockerfile boilerplates for localized environment deployment.",
                icon: "🐳",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderDocker()
            },
            gitSignal: {
                name: "Version Pulse",
                description: "Generate essential git command protocols for repository management.",
                icon: "📜",
                category: "Dev",
                volume: "High",
                render: () => this.renderGit()
            },
            nginxLogic: {
                name: "Gateway Forge",
                description: "Generate Nginx configuration protocols for reverse proxy routing.",
                icon: "🌐",
                category: "Dev",
                volume: "Low",
                render: () => this.renderNginx()
            },
            heartPulse: {
                name: "Heart Pulse",
                description: "Calculate target cardiovascular zones via the Karvonen protocol.",
                icon: "💓",
                category: "Health",
                volume: "High",
                render: () => this.renderHeart()
            },
            leanMassAudit: {
                name: "Lean Audit",
                description: "Quantify biological lean body mass vs adipose tissue.",
                icon: "🧬",
                category: "Health",
                volume: "Medium",
                render: () => this.renderLean()
            },
            oneRepMax: {
                name: "Force Pulse",
                description: "Project maximum physical force output (1RM) for strength audits.",
                icon: "🏋️",
                category: "Health",
                volume: "High",
                render: () => this.render1RM()
            },
            pacePulse: {
                name: "Tempo Pulse",
                description: "Analyze running pace and temporal velocity over distance.",
                icon: "🏃",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderPace()
            },
            bodyLiquid: {
                name: "Plasma Pulse",
                description: "Estimate total biological water distribution within a human entity.",
                icon: "🌊",
                category: "Health",
                volume: "Low",
                render: () => this.renderPlasma()
            },
            breakEven: {
                name: "Equilibrium Pulse",
                description: "Analyze the fiscal break-even point for capital ventures.",
                icon: "⚖️",
                category: "Finance",
                volume: "High",
                render: () => this.renderBreakEven()
            },
            marginAudit: {
                name: "Margin Forge",
                description: "Audit gross profit margins and markup efficiency protocols.",
                icon: "📊",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderMargin()
            },
            taxSignal: {
                name: "Levy Signal",
                description: "Estimate generic tax liabilities across capital yields.",
                icon: "💸",
                category: "Finance",
                volume: "High",
                render: () => this.renderTax()
            },
            savingPulse: {
                name: "Propensity Pulse",
                description: "Project necessary monthly capital retention for future goals.",
                icon: "🏦",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderSaving()
            },
            debtSignal: {
                name: "Leverage Pulse",
                description: "Audit debt-to-income ratios for fiscal sustainability.",
                icon: "⛓️",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderDebt()
            },
            uuidForge: {
                name: "Identity Forge",
                description: "Generate high-entropy UUID v4 identifiers for system mapping.",
                icon: "🆔",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderUUID()
            },
            stringForge: {
                name: "Entropy Pulse",
                description: "Synthesize high-entropy strings for cryptographic security.",
                icon: "🔏",
                category: "Dev",
                volume: "High",
                render: () => this.renderString()
            },
            wordCountAudit: {
                name: "Lexicon Audit",
                description: "Quantify linguistic density, characters, and structural spacing.",
                icon: "📖",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderWordCount()
            },
            frequencyForge: {
                name: "Density Pulse",
                description: "Map the frequency of specific characters within a data block.",
                icon: "📊",
                category: "Utility",
                volume: "High",
                render: () => this.renderCharFreq()
            },
            listReverse: {
                name: "Inverse Logic",
                description: "Reverse the categorical order of multi-line list protocols.",
                icon: "🔃",
                category: "Utility",
                volume: "Low",
                render: () => this.renderReverse()
            },
            mortgagePulse: {
                name: "Mortgage Audit",
                description: "Analyze debt amortization and interest over multi-year horizons.",
                icon: "🏠",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderMortgage()
            },
            creditPulse: {
                name: "Interest Audit",
                description: "Calculate the long-term impact of revolving credit interest.",
                icon: "💳",
                category: "Finance",
                volume: "High",
                render: () => this.renderCredit()
            },
            budgetPulse: {
                name: "Budget Logic",
                description: "Map capital allocation via the 50/30/20 budget protocol.",
                icon: "📊",
                category: "Finance",
                volume: "Extreme",
                render: () => this.renderBudget()
            },
            metPulse: {
                name: "Thermal Pulse",
                description: "Estimate calorie burn based on activity MET protocols.",
                icon: "🔥",
                category: "Health",
                volume: "High",
                render: () => this.renderCalories()
            },
            bloodPulse: {
                name: "Vessel Audit",
                description: "Analyze blood pressure mappings across health categories.",
                icon: "🩸",
                category: "Health",
                volume: "High",
                render: () => this.renderBloodPressure()
            },
            tdeePulse: {
                name: "Total Metabolic Pulse",
                description: "Project Total Daily Energy Expenditure (TDEE) based on activity.",
                icon: "🔋",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderTDEE()
            },
            cronForge: {
                name: "Temporal Forge",
                description: "Synthesize cron timing protocols for system automation.",
                icon: "⚙️",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderCron()
            },
            shadowForge: {
                name: "Shadow Forge",
                description: "Forge complex multi-layered CSS shadow protocols visually.",
                icon: "🌓",
                category: "Design",
                volume: "High",
                render: () => this.renderShadow()
            },
            flexForge: {
                name: "Layout Forge",
                description: "Synthesize CSS Flexbox alignment and distribution protocols.",
                icon: "🍱",
                category: "Design",
                volume: "High",
                render: () => this.renderFlex()
            },
            gridForge: {
                name: "Grid Signal",
                description: "Generate CSS Grid structural protocols for complex layouts.",
                icon: "🔳",
                category: "Design",
                volume: "Medium",
                render: () => this.renderGridStyle()
            },
            colorMixPulse: {
                name: "Synthesis Pulse",
                description: "Mix two hex protocols to find their proportional center.",
                icon: "🧪",
                category: "Design",
                volume: "Low",
                render: () => this.renderMix()
            },
            polyMath: {
                name: "Geometric Pulse",
                description: "Calculate area and perimeter protocols for polygons and circles.",
                icon: "📐",
                category: "Math",
                volume: "Medium",
                render: () => this.renderGeometry()
            },
            stDevPulse: {
                name: "Variance Signal",
                description: "Calculate standard deviation and variance of numeric datasets.",
                icon: "📊",
                category: "Math",
                volume: "High",
                render: () => this.renderStDev()
            },
            binaryForge: {
                name: "Logic Stream",
                description: "Convert numeric protocols into multi-bit binary data streams.",
                icon: "0️⃣",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderBinary()
            },
            asciiForge: {
                name: "ASCII Signal",
                description: "Map linguistic characters to their decimal and hex ASCII codes.",
                icon: "🔡",
                category: "Dev",
                volume: "High",
                render: () => this.renderASCII()
            },
            slugForge: {
                name: "Slug Pulse",
                description: "Cleanse strings into URL-safe kebab-case slug protocols.",
                icon: "🔗",
                category: "Dev",
                volume: "High",
                render: () => this.renderSlug()
            },
            sortPulse: {
                name: "Order Logic",
                description: "Sort multi-line lists via alphabetical or length-based protocols.",
                icon: "📶",
                category: "Utility",
                volume: "High",
                render: () => this.renderSort()
            },
            dedupePulse: {
                name: "Distinct Pulse",
                description: "Filter redundant entries from multi-line data blocks.",
                icon: "✂️",
                category: "Utility",
                volume: "High",
                render: () => this.renderDedupe()
            },
            wordFreqPulse: {
                name: "Lexicon Density",
                description: "Map the frequency of individual words within a data block.",
                icon: "🧮",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderWordFreq()
            },
            scratchForge: {
                name: "Scratch Protocol",
                description: "An isolated, ephemeral data scratchpad with persistent state.",
                icon: "📝",
                category: "Utility",
                volume: "Extreme",
                render: () => this.renderScratch()
            },
            aspectRatioPulse: {
                name: "Aspect Signal",
                description: "Calculate dimensional consistency via aspect ratio protocols.",
                icon: "🖼️",
                category: "Design",
                volume: "Medium",
                render: () => this.renderAspectRatio()
            },
            remToPxPulse: {
                name: "Root Pivot",
                description: "Inverse conversion from relative REM units to absolute pixel protocols.",
                icon: "📏",
                category: "Design",
                volume: "High",
                render: () => this.renderRemToPx()
            },
            goldenRatioPulse: {
                name: "Golden Signal",
                description: "Map the divine proportion (phi) across spatial dimensions.",
                icon: "🌀",
                category: "Design",
                volume: "Low",
                render: () => this.renderGolden()
            },
            contrastForge: {
                name: "Contrast Audit",
                description: "Validate color accessibility protocols via WCAG contrast analysis.",
                icon: "🌓",
                category: "Design",
                volume: "Extreme",
                render: () => this.renderContrast()
            },
            caseForge: {
                name: "Linguistic Pivot",
                description: "Transform data stream casing protocols across complex syntactic structures.",
                icon: "🔠",
                category: "Utility",
                volume: "High",
                render: () => this.renderCaseForge()
            },
            trimForge: {
                name: "Prune Pulse",
                description: "Extract redundant whitespace and empty line protocols from data blocks.",
                icon: "✂️",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderTrim()
            },
            prefixForge: {
                name: "Append Signal",
                description: "Inject prefix or suffix protocols into multi-line data streams.",
                icon: "➕",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderPrefix()
            },
            rot13Pulse: {
                name: "ROT13 Cipher",
                description: "Execute simplistic alphabetic rotation cipher protocols.",
                icon: "🔄",
                category: "Security",
                volume: "Low",
                render: () => this.renderROT13()
            },
            jsonYamlForge: {
                name: "Structure Pivot",
                description: "Seamlessly translate JSON data protocols into YAML structural signals.",
                icon: "📑",
                category: "Dev",
                volume: "High",
                render: () => this.renderJsonToYaml()
            },
            cssMinifyPulse: {
                name: "Compression Signal",
                description: "Prune CSS protocols for maximum transmission efficiency.",
                icon: "🗜️",
                category: "Dev",
                volume: "High",
                render: () => this.renderCSSMinify()
            },
            sqlForge: {
                name: "Query Audit",
                description: "Format and hydrate raw SQL structural protocols for readability.",
                icon: "🗄️",
                category: "Dev",
                volume: "Medium",
                render: () => this.renderSQL()
            },
            loanPaybackPulse: {
                name: "Payback Pulse",
                description: "Project capital recovery windows for debt-based systems.",
                icon: "⏲️",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderPayback()
            },
            dividendPulse: {
                name: "Yield Logic",
                description: "Analyze annual dividend yield based on capital price signals.",
                icon: "📈",
                category: "Finance",
                volume: "Medium",
                render: () => this.renderDividend()
            },
            profitPulse: {
                name: "Net Margin Audit",
                description: "Quantify absolute net profit efficiency across capital cycles.",
                icon: "💎",
                category: "Finance",
                volume: "High",
                render: () => this.renderProfit()
            },
            bmiImperialPulse: {
                name: "Imperial Audit",
                description: "Calculate body mass indices via archaic imperial unit protocols.",
                icon: "⚖️",
                category: "Health",
                volume: "High",
                render: () => this.renderBMIImperial()
            },
            waterRequirementPulse: {
                name: "Vessel Demand",
                description: "Project daily water intake protocols based on biological mass.",
                icon: "💧",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderWaterDemand()
            },
            proteinPulse: {
                name: "Synthesis Logic",
                description: "Project protein synthesis requirements based on lean mass protocols.",
                icon: "🥩",
                category: "Health",
                volume: "Extreme",
                render: () => this.renderProtein()
            },
            randomChoicePulse: {
                name: "Selection Logic",
                description: "Extract a random entity from a categorical data stream.",
                icon: "🎲",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderRandomChoice()
            },
            base64ImageForge: {
                name: "Visual Forge",
                description: "Synthesize Base64 data strings from visual entity protocols.",
                icon: "🖼️",
                category: "Dev",
                volume: "Extreme",
                render: () => this.renderImageForge()
            },
            loremForge: {
                name: "Filler Signal",
                description: "Generate linguistic noise protocols for structural testing.",
                icon: "📝",
                category: "Utility",
                volume: "Medium",
                render: () => this.renderLorem()
            }
        };
    }

    init() {
        // Initialization if needed
    }

    renderGrid(filter = '') {
        const container = document.getElementById('omni-grid');
        const searchInput = document.getElementById('omni-search');
        if (!container) return;

        container.innerHTML = '';
        Object.keys(this.tools).forEach(id => {
            const tool = this.tools[id];

            if (filter && !tool.name.toLowerCase().includes(filter.toLowerCase()) &&
                !tool.category.toLowerCase().includes(filter.toLowerCase()) &&
                !tool.description.toLowerCase().includes(filter.toLowerCase())) {
                return;
            }

            const card = document.createElement('div');
            card.className = "group relative p-8 bg-zinc-900/50 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in";
            card.onclick = () => this.openTool(id);

            card.innerHTML = `
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity text-4xl">${tool.icon}</div>
                <div class="relative z-10">
                    <div class="text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 font-mono">${tool.category}</div>
                    <h3 class="text-xl font-bold text-white mb-2 font-['Cinzel']">${tool.name}</h3>
                    <p class="text-sm text-stone-400 font-light leading-relaxed mb-6 h-12 overflow-hidden">${tool.description}</p>
                    <div class="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        <span>Initialize Protocol</span>
                        <span class="transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            `;
            container.appendChild(card);
        });

        if (searchInput && !searchInput.dataset.listening) {
            searchInput.dataset.listening = "true";
            searchInput.oninput = (e) => this.renderGrid(e.target.value);
        }
    }

    openTool(id) {
        const tool = this.tools[id];
        if (!tool) return;

        // Hide grid, show tool container
        document.getElementById('omni-grid-view').classList.add('hidden');
        const view = document.getElementById('omni-tool-view');
        view.classList.remove('hidden');

        // Render specific tool
        tool.render();

        if (this.app.haptics) this.app.haptics.impact('light');
        if (this.app.soundManager) this.app.soundManager.play('click');
    }

    closeTool() {
        document.getElementById('omni-grid-view').classList.remove('hidden');
        document.getElementById('omni-tool-view').classList.add('hidden');
    }

    // --- Tool Renderers ---

    renderWordCounter() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Lexicon Auditor</h2>
                <textarea id="word-input" placeholder="Paste your transmission here..." class="w-full h-64 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none transition-colors mb-8 font-mono"></textarea>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="word-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Words</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="char-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Characters</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="reading-time" class="text-3xl font-bold font-mono">0<span class="text-xs">m</span></div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Read Time</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg text-center">
                        <div id="para-count" class="text-3xl font-bold font-mono">0</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Paragraphs</div>
                    </div>
                </div>
            </div>
        `;

        const textarea = document.getElementById('word-input');
        textarea.addEventListener('input', () => {
            const text = textarea.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            const paragraphs = text ? text.split(/\n+/).length : 0;
            const readTime = Math.ceil(words / 200);

            document.getElementById('word-count').innerText = words;
            document.getElementById('char-count').innerText = chars;
            document.getElementById('para-count').innerText = paragraphs;
            document.getElementById('reading-time').innerHTML = `${readTime}<span class="text-xs">m</span>`;
        });
    }

    renderPercentageCalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Ratio Engine</h2>
                <div class="space-y-12">
                    <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-light">
                        <span>What is</span>
                        <input type="number" id="perc-1" class="w-24 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="10">
                        <span>% of</span>
                        <input type="number" id="val-1" class="w-32 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="100">
                        <span>?</span>
                        <span class="text-white font-bold ml-4">=</span>
                        <span id="res-1" class="text-green-400 font-bold font-mono ml-4 text-3xl">0</span>
                    </div>

                    <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-light">
                        <input type="number" id="val-2a" class="w-24 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="20">
                        <span>is what % of</span>
                        <input type="number" id="val-2b" class="w-32 bg-transparent border-b border-white px-2 focus:outline-none text-center font-mono" placeholder="100">
                        <span>?</span>
                        <span class="text-white font-bold ml-4">=</span>
                        <span id="res-2" class="text-green-400 font-bold font-mono ml-4 text-3xl">0%</span>
                    </div>
                </div>
            </div>
        `;

        const update1 = () => {
            const p = parseFloat(document.getElementById('perc-1').value) || 0;
            const v = parseFloat(document.getElementById('val-1').value) || 0;
            document.getElementById('res-1').innerText = ((p / 100) * v).toFixed(2).replace(/\.00$/, '');
        };

        const update2 = () => {
            const a = parseFloat(document.getElementById('val-2a').value) || 0;
            const b = parseFloat(document.getElementById('val-2b').value) || 0;
            const res = b ? (a / b) * 100 : 0;
            document.getElementById('res-2').innerText = res.toFixed(2).replace(/\.00$/, '') + '%';
        };

        document.getElementById('perc-1').addEventListener('input', update1);
        document.getElementById('val-1').addEventListener('input', update1);
        document.getElementById('val-2a').addEventListener('input', update2);
        document.getElementById('val-2b').addEventListener('input', update2);
    }

    renderBMICalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Bio-Mass Index</h2>
                <div class="space-y-8">
                    <div class="group">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Height (cm)</label>
                        <input type="number" id="bmi-height" class="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-white focus:outline-none text-center text-2xl font-mono">
                    </div>
                    <div class="group">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Weight (kg)</label>
                        <input type="number" id="bmi-weight" class="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-white focus:outline-none text-center text-2xl font-mono">
                    </div>
                    <div class="pt-8">
                        <div id="bmi-result" class="text-6xl font-bold font-mono mb-2">0.0</div>
                        <div id="bmi-status" class="text-xs uppercase tracking-[0.5em] text-stone-500">Awaiting Data</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const h = parseFloat(document.getElementById('bmi-height').value) / 100;
            const w = parseFloat(document.getElementById('bmi-weight').value);
            if (h > 0 && w > 0) {
                const bmi = w / (h * h);
                document.getElementById('bmi-result').innerText = bmi.toFixed(1);
                let status = "Normal";
                let color = "text-green-400";
                if (bmi < 18.5) { status = "Underweight"; color = "text-yellow-400"; }
                else if (bmi >= 25 && bmi < 30) { status = "Overweight"; color = "text-yellow-400"; }
                else if (bmi >= 30) { status = "Obese"; color = "text-red-500"; }

                const statusEl = document.getElementById('bmi-status');
                statusEl.innerText = status;
                statusEl.className = `text-xs uppercase tracking-[0.5em] ${color}`;
            }
        };

        document.getElementById('bmi-height').addEventListener('input', update);
        document.getElementById('bmi-weight').addEventListener('input', update);
    }

    renderEMICalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
             <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Debt Horizon</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Principal Amount ($)</label>
                        <input type="number" id="emi-p" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Annual Interest (%)</label>
                        <input type="number" id="emi-r" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Tenure (Years)</label>
                        <input type="number" id="emi-t" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Monthly Installment</div>
                        <div id="emi-res" class="text-5xl font-bold font-mono text-white">$0.00</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Total Interest Payable</div>
                        <div id="emi-interest" class="text-xl font-mono text-stone-400">$0.00</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const p = parseFloat(document.getElementById('emi-p').value) || 0;
            const r = (parseFloat(document.getElementById('emi-r').value) || 0) / 12 / 100;
            const n = (parseFloat(document.getElementById('emi-t').value) || 0) * 12;

            if (p > 0 && r > 0 && n > 0) {
                const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
                const total = emi * n;
                const interest = total - p;

                document.getElementById('emi-res').innerText = `$${emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                document.getElementById('emi-interest').innerText = `$${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
        };

        ['emi-p', 'emi-r', 'emi-t'].forEach(id => document.getElementById(id).addEventListener('input', update));
    }

    renderPasswordGen() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Entropy Forge</h2>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg mb-8">
                    <div id="pass-display" class="text-2xl font-mono text-green-400 break-all mb-4">Click Generate</div>
                    <button id="pass-copy" class="text-[10px] uppercase tracking-widest text-stone-500 hover:text-white transition-colors">Copy to Clipboard</button>
                </div>
                <div class="space-y-4">
                    <input type="range" id="pass-length" min="8" max="64" value="16" class="w-full accent-white">
                    <div class="flex justify-between text-[10px] uppercase tracking-widest text-stone-500">
                        <span>Length</span>
                        <span id="len-label">16</span>
                    </div>
                    <button id="pass-gen-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-stone-200 transition-all">Generate Protocol</button>
                </div>
            </div>
        `;

        const generate = () => {
            const length = document.getElementById('pass-length').value;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
            let retVal = "";
            const values = new Uint32Array(length);
            window.crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                retVal += charset.charAt(values[i] % charset.length);
            }
            document.getElementById('pass-display').innerText = retVal;
            document.getElementById('len-label').innerText = length;
        };

        document.getElementById('pass-gen-btn').onclick = generate;
        document.getElementById('pass-length').oninput = (e) => { document.getElementById('len-label').innerText = e.target.value; };
        document.getElementById('pass-copy').onclick = () => {
            navigator.clipboard.writeText(document.getElementById('pass-display').innerText);
            if (window.toast) toast.success("Entropy copied to clipboard.");
        };
    }

    renderTimer() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Temporal Anchor</h2>
                <div id="timer-display" class="text-8xl font-bold font-mono text-white mb-12">00:00:00</div>
                <div class="flex gap-4 justify-center mb-8">
                    <input type="number" id="timer-m" placeholder="Min" class="w-20 bg-black border border-white/10 p-2 text-center text-xl font-mono focus:border-white focus:outline-none">
                    <input type="number" id="timer-s" placeholder="Sec" class="w-20 bg-black border border-white/10 p-2 text-center text-xl font-mono focus:border-white focus:outline-none">
                </div>
                <div class="flex gap-4">
                    <button id="timer-start" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Start</button>
                    <button id="timer-stop" class="flex-1 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-lg">Reset</button>
                </div>
            </div>
        `;

        let interval;
        let totalSec = 0;

        const updateDisplay = () => {
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            const s = totalSec % 60;
            document.getElementById('timer-display').innerText =
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        };

        document.getElementById('timer-start').onclick = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
                document.getElementById('timer-start').innerText = "Start";
                return;
            }
            const min = parseInt(document.getElementById('timer-m').value) || 0;
            const sec = parseInt(document.getElementById('timer-s').value) || 0;
            if (totalSec === 0) totalSec = (min * 60) + sec;

            if (totalSec > 0) {
                document.getElementById('timer-start').innerText = "Pause";
                interval = setInterval(() => {
                    totalSec--;
                    updateDisplay();
                    if (totalSec <= 0) {
                        clearInterval(interval);
                        interval = null;
                        document.getElementById('timer-start').innerText = "Start";
                        if (this.app.soundManager) this.app.soundManager.play('achievement');
                    }
                }, 1000);
            }
        };

        document.getElementById('timer-stop').onclick = () => {
            clearInterval(interval);
            interval = null;
            totalSec = 0;
            updateDisplay();
            document.getElementById('timer-start').innerText = "Start";
        };
    }

    renderCaseConverter() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Syntax Shifter</h2>
                <textarea id="case-input" placeholder="Enter text to transform..." class="w-full h-48 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none transition-colors mb-8 font-mono"></textarea>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button id="case-upper" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">UPPERCASE</button>
                    <button id="case-lower" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">lowercase</button>
                    <button id="case-title" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">Title Case</button>
                    <button id="case-sentence" class="p-4 bg-white/5 border border-white/5 rounded-lg text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all">Sentence case</button>
                </div>
            </div>
        `;

        const input = document.getElementById('case-input');

        document.getElementById('case-upper').onclick = () => { input.value = input.value.toUpperCase(); };
        document.getElementById('case-lower').onclick = () => { input.value = input.value.toLowerCase(); };
        document.getElementById('case-title').onclick = () => {
            input.value = input.value.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        };
        document.getElementById('case-sentence').onclick = () => {
            input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
        };
    }

    renderInflation() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Purchasing Power</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Initial Amount ($)</label>
                        <input type="number" id="inf-amount" value="100" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Avg. Annual Inflation (%)</label>
                        <input type="number" id="inf-rate" value="3.5" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Years Forward</label>
                        <input type="number" id="inf-years" value="10" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Future Value</div>
                        <div id="inf-res" class="text-5xl font-bold font-mono text-white">$0.00</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Total Loss of Power</div>
                        <div id="inf-loss" class="text-xl font-mono text-red-400">0%</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const amount = parseFloat(document.getElementById('inf-amount').value) || 0;
            const rate = (parseFloat(document.getElementById('inf-rate').value) || 0) / 100;
            const years = parseFloat(document.getElementById('inf-years').value) || 0;

            const futureValue = amount / Math.pow(1 + rate, years);
            const lossPercent = ((amount - futureValue) / amount) * 100;

            document.getElementById('inf-res').innerText = `$${futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById('inf-loss').innerText = `${lossPercent.toFixed(1)}% Decay`;
        };

        ['inf-amount', 'inf-rate', 'inf-years'].forEach(id => document.getElementById(id).addEventListener('input', update));
        update();
    }

    renderCreatorYield() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Engagement Yield</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Monthly Views</label>
                        <input type="number" id="yield-views" value="100000" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Platform RPM ($ per 1k views)</label>
                        <select id="yield-rpm" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                            <option value="0.04">TikTok Fund ($0.04)</option>
                            <option value="2.00">YouTube Long ($2.00)</option>
                            <option value="0.50">IG Reels ($0.50)</option>
                            <option value="15.00">Premium Tech ($15.00)</option>
                        </select>
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Estimated Monthly Revenue</div>
                        <div id="yield-res" class="text-5xl font-bold font-mono text-white">$0.00</div>
                        <p class="text-[10px] text-stone-500 mt-4 uppercase tracking-widest italic leading-relaxed">
                            Based on median advertising throughput.<br>Actual yields vary by biological resonance.
                        </p>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const views = parseFloat(document.getElementById('yield-views').value) || 0;
            const rpm = parseFloat(document.getElementById('yield-rpm').value) || 0;
            const revenue = (views / 1000) * rpm;
            document.getElementById('yield-res').innerText = `$${revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        document.getElementById('yield-views').addEventListener('input', update);
        document.getElementById('yield-rpm').addEventListener('change', update);
        update();
    }

    renderChromaForge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Spectral Hash</h2>
                <div class="flex gap-4 justify-center mb-12">
                    <input type="text" id="chroma-hex" value="#ffffff" class="w-48 bg-black border border-white/10 p-4 text-center text-2xl font-mono focus:border-white focus:outline-none uppercase">
                    <button id="chroma-gen" class="px-8 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Forge</button>
                </div>
                <div id="palette-grid" class="grid grid-cols-2 md:grid-cols-5 gap-4 h-64">
                    <!-- Palettes here -->
                </div>
            </div>
        `;

        const forge = () => {
            const hex = document.getElementById('chroma-hex').value;
            const grid = document.getElementById('palette-grid');
            grid.innerHTML = '';

            // Generate 5 related colors (Monochromatic/Analogous Lite)
            for (let i = 0; i < 5; i++) {
                const opacity = 1 - (i * 0.2);
                const colorDiv = document.createElement('div');
                colorDiv.className = "group relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105";
                colorDiv.style.backgroundColor = hex;
                colorDiv.style.opacity = opacity;
                colorDiv.onclick = () => {
                    navigator.clipboard.writeText(hex);
                    if (window.toast) toast.success(`Color ${hex} copied.`);
                };
                colorDiv.innerHTML = `
                    <div class="absolute bottom-0 left-0 w-full p-2 bg-black/40 backdrop-blur-md text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        ${hex}
                    </div>
                `;
                grid.appendChild(colorDiv);
            }
        };

        document.getElementById('chroma-gen').onclick = forge;
        document.getElementById('chroma-hex').addEventListener('keypress', (e) => { if (e.key === 'Enter') forge(); });
        forge();
    }

    renderFiscal() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Fiscal Transparency</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Base Amount ($)</label>
                        <input type="number" id="fisc-base" value="100" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Tax / GST Rate (%)</label>
                        <input type="number" id="fisc-rate" value="15" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-left">
                                <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Tax Amount</div>
                                <div id="fisc-tax" class="text-2xl font-bold font-mono text-white">$15.00</div>
                            </div>
                            <div class="text-left">
                                <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Total Amount</div>
                                <div id="fisc-total" class="text-2xl font-bold font-mono text-green-400">$115.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const base = parseFloat(document.getElementById('fisc-base').value) || 0;
            const rate = parseFloat(document.getElementById('fisc-rate').value) || 0;
            const tax = (base * rate) / 100;
            const total = base + tax;

            document.getElementById('fisc-tax').innerText = `$${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById('fisc-total').innerText = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        ['fisc-base', 'fisc-rate'].forEach(id => document.getElementById(id).addEventListener('input', update));
    }

    renderPrecision() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Precision Limits</h2>
                <textarea id="prec-input" placeholder="Draft your transmission..." class="w-full h-48 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none transition-colors mb-8 font-mono"></textarea>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-white/5 border border-white/5 rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] uppercase tracking-widest text-stone-500">X (Twitter)</span>
                            <span id="x-count" class="text-xs font-mono">0 / 280</span>
                        </div>
                        <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div id="x-bar" class="h-full bg-white transition-all duration-300" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="p-4 bg-white/5 border border-white/5 rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] uppercase tracking-widest text-stone-500">Threads</span>
                            <span id="th-count" class="text-xs font-mono">0 / 500</span>
                        </div>
                        <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div id="th-bar" class="h-full bg-white transition-all duration-300" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="p-4 bg-white/5 border border-white/5 rounded-lg">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] uppercase tracking-widest text-stone-500">LinkedIn</span>
                            <span id="li-count" class="text-xs font-mono">0 / 3000</span>
                        </div>
                        <div class="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div id="li-bar" class="h-full bg-white transition-all duration-300" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const textarea = document.getElementById('prec-input');
        const update = () => {
            const count = textarea.value.length;

            const platforms = [
                { id: 'x', limit: 280 },
                { id: 'th', limit: 500 },
                { id: 'li', limit: 3000 }
            ];

            platforms.forEach(p => {
                const perc = Math.min((count / p.limit) * 100, 100);
                document.getElementById(`${p.id}-count`).innerText = `${count} / ${p.limit}`;
                document.getElementById(`${p.id}-bar`).style.width = `${perc}%`;
                document.getElementById(`${p.id}-bar`).style.backgroundColor = count > p.limit ? '#ef4444' : '#ffffff';
            });
        };

        textarea.addEventListener('input', update);
    }

    renderAegis() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Aegis Audit</h2>
                <div class="relative group mb-12">
                    <input type="password" id="aegis-input" placeholder="Type secret to audit..." class="w-full bg-black border border-white/10 p-4 rounded-lg focus:border-white focus:outline-none text-center text-xl font-mono tracking-widest">
                </div>
                <div id="aegis-strength" class="text-[10px] uppercase tracking-[1em] text-stone-500 mb-8">Vulnerability High</div>
                <div class="grid grid-cols-2 gap-4 text-left">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Crack Time</div>
                        <div id="aegis-time" class="text-xl font-bold font-mono">Instantly</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Entropy Bits</div>
                        <div id="aegis-bits" class="text-xl font-bold font-mono">0</div>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('aegis-input');
        input.addEventListener('input', () => {
            const secret = input.value;
            if (!secret) {
                document.getElementById('aegis-bits').innerText = "0";
                document.getElementById('aegis-time').innerText = "Instantly";
                document.getElementById('aegis-strength').innerText = "Awaiting Secret";
                return;
            }

            let pool = 0;
            if (/[a-z]/.test(secret)) pool += 26;
            if (/[A-Z]/.test(secret)) pool += 26;
            if (/[0-9]/.test(secret)) pool += 10;
            if (/[^a-zA-Z0-9]/.test(secret)) pool += 32;

            const bits = secret.length * Math.log2(pool || 1);
            document.getElementById('aegis-bits').innerText = Math.floor(bits);

            let status = "Critical";
            let time = "Instantly";
            let color = "text-red-500";

            if (bits > 80) { status = "Fortified"; time = "Centuries"; color = "text-green-400"; }
            else if (bits > 60) { status = "Secure"; time = "Years"; color = "text-yellow-400"; }
            else if (bits > 40) { status = "Moderate"; time = "Days"; color = "text-stone-400"; }

            const strengthEl = document.getElementById('aegis-strength');
            strengthEl.innerText = status;
            strengthEl.className = `text-[10px] uppercase tracking-[1em] ${color} mb-8 transition-colors`;
            document.getElementById('aegis-time').innerText = time;
        });
    }

    renderHydration() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hydration Logic</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Your Weight (kg)</label>
                        <input type="number" id="hyd-weight" value="70" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Daily Activity (minutes)</label>
                        <input type="number" id="hyd-workout" value="30" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Recommended Intake</div>
                        <div id="hyd-res" class="text-5xl font-bold font-mono text-blue-400">2.5 L</div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">~ 10 Glasses (250ml)</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const weight = parseFloat(document.getElementById('hyd-weight').value) || 0;
            const workout = parseFloat(document.getElementById('hyd-workout').value) || 0;
            const intake = (weight * 0.033) + (workout / 30 * 0.35);
            document.getElementById('hyd-res').innerText = `${intake.toFixed(1)} L`;
        };

        ['hyd-weight', 'hyd-workout'].forEach(id => document.getElementById(id).addEventListener('input', update));
        update();
    }

    renderBinary() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Base-2 Cipher</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Natural Language</label>
                        <textarea id="bin-text" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-white focus:outline-none"></textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Binary Output</label>
                        <textarea id="bin-out" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-xs focus:border-white focus:outline-none shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"></textarea>
                    </div>
                </div>
            </div>
        `;

        const textIn = document.getElementById('bin-text');
        const binOut = document.getElementById('bin-out');

        textIn.addEventListener('input', () => {
            binOut.value = textIn.value.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        });

        binOut.addEventListener('input', () => {
            textIn.value = binOut.value.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        });
    }

    renderJSON() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-8 text-center tracking-widest">Data Refiner</h2>
                <textarea id="json-input" placeholder="Paste raw JSON payload..." class="w-full h-96 bg-black border border-white/10 rounded-lg p-6 font-mono text-xs focus:border-white focus:outline-none mb-8"></textarea>
                <div class="flex gap-4">
                    <button id="json-beautify" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Beautify</button>
                    <button id="json-minify" class="flex-1 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-lg border border-white/10">Minify</button>
                    <button id="json-copy" class="px-8 bg-white/5 text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Copy</button>
                </div>
            </div>
        `;

        const input = document.getElementById('json-input');

        document.getElementById('json-beautify').onclick = () => {
            try {
                const obj = JSON.parse(input.value);
                input.value = JSON.stringify(obj, null, 4);
            } catch (e) {
                if (window.toast) toast.error("Invalid Transformation Segment.");
            }
        };

        document.getElementById('json-minify').onclick = () => {
            try {
                const obj = JSON.parse(input.value);
                input.value = JSON.stringify(obj);
            } catch (e) {
                if (window.toast) toast.error("Invalid Transformation Segment.");
            }
        };

        document.getElementById('json-copy').onclick = () => {
            navigator.clipboard.writeText(input.value);
            if (window.toast) toast.success("Payload captured.");
        };
    }

    renderAtrophy() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Digital Atrophy</h2>
                <div class="space-y-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Daily Screen Time (Hours)</label>
                        <input type="range" id="atr-screen" min="0" max="18" value="6" class="w-full accent-white">
                        <div id="atr-scr-val" class="text-xl font-mono mt-2 text-white">6 Hours</div>
                    </div>
                     <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Current Age</label>
                        <input type="number" id="atr-age" value="25" class="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-white focus:outline-none text-xl font-mono">
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Projected Life-Years Donated to Screens</div>
                        <div id="atr-res" class="text-5xl font-bold font-mono text-red-500">12.5 Years</div>
                        <p class="text-[10px] text-stone-500 mt-4 uppercase tracking-widest italic leading-relaxed">
                            Based on a biological ceiling of 80 years.<br>Every scroll is a micro-donation of existence.
                        </p>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const hours = parseFloat(document.getElementById('atr-screen').value);
            const age = parseFloat(document.getElementById('atr-age').value) || 0;
            document.getElementById('atr-scr-val').innerText = `${hours} Hours`;

            const remainingYears = Math.max(80 - age, 0);
            const donation = (hours / 24) * remainingYears;

            document.getElementById('atr-res').innerText = `${donation.toFixed(1)} Years`;
        };

        document.getElementById('atr-screen').oninput = update;
        document.getElementById('atr-age').addEventListener('input', update);
        update();
    }

    renderUnits() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Unit Pulse</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div class="space-y-4">
                        <select id="unit-cat" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                            <option value="length">Length (km/miles)</option>
                            <option value="weight">Weight (kg/lbs)</option>
                            <option value="temp">Temperature (C/F)</option>
                        </select>
                        <input type="number" id="unit-val-1" value="1" class="w-full bg-black border border-white/10 p-4 rounded-lg text-2xl font-mono text-center focus:border-white focus:outline-none">
                        <div id="unit-label-1" class="text-[10px] uppercase tracking-widest text-stone-500">Input Unit</div>
                    </div>
                    <div class="space-y-4">
                        <div class="h-[56px] flex items-center justify-center">
                            <span class="text-2xl text-white/20">⟶</span>
                        </div>
                        <div id="unit-val-2" class="w-full bg-white/5 border border-white/5 p-4 rounded-lg text-2xl font-mono text-white">0</div>
                        <div id="unit-label-2" class="text-[10px] uppercase tracking-widest text-stone-500">Output Unit</div>
                    </div>
                </div>
            </div>
        `;

        const val1 = document.getElementById('unit-val-1');
        const val2 = document.getElementById('unit-val-2');
        const cat = document.getElementById('unit-cat');
        const lab1 = document.getElementById('unit-label-1');
        const lab2 = document.getElementById('unit-label-2');

        const update = () => {
            const v = parseFloat(val1.value) || 0;
            const type = cat.value;
            let result = 0;

            if (type === 'length') {
                result = v * 0.621371; // km to miles
                lab1.innerText = "Kilometers";
                lab2.innerText = "Miles";
            } else if (type === 'weight') {
                result = v * 2.20462; // kg to lbs
                lab1.innerText = "Kilograms";
                lab2.innerText = "Pounds";
            } else if (type === 'temp') {
                result = (v * 9 / 5) + 32; // C to F
                lab1.innerText = "Celsius";
                lab2.innerText = "Fahrenheit";
            }
            val2.innerText = result.toFixed(2).replace(/\.00$/, '');
        };

        val1.oninput = update;
        cat.onchange = update;
        update();
    }

    renderMorse() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Signal Code</h2>
                <div class="space-y-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Alpha Transmission</label>
                        <textarea id="morse-alpha" class="w-full h-32 bg-black border border-white/10 rounded-lg p-6 font-mono text-white focus:border-white focus:outline-none uppercase" placeholder="HELLO WORLD"></textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Morse Protocol</label>
                        <textarea id="morse-code" class="w-full h-32 bg-black border border-white/10 rounded-lg p-6 font-mono text-amber-500 focus:border-white focus:outline-none" placeholder=".... . .-.. .-.. ---"></textarea>
                    </div>
                </div>
            </div>
        `;

        const dictionary = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
        };
        const revDictionary = Object.fromEntries(Object.entries(dictionary).map(([k, v]) => [v, k]));

        const alpha = document.getElementById('morse-alpha');
        const code = document.getElementById('morse-code');

        alpha.oninput = () => {
            code.value = alpha.value.toUpperCase().split('').map(c => dictionary[c] || c).join(' ');
        };
        code.oninput = () => {
            alpha.value = code.value.split(' ').map(c => revDictionary[c] || c).join('');
        };
    }

    renderScientificCalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Logical Baseline</h2>
                <div class="bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div class="p-8 bg-zinc-900 border-b border-white/5">
                        <div id="calc-display" class="text-4xl font-mono text-white text-right overflow-hidden whitespace-nowrap">0</div>
                    </div>
                    <div class="grid grid-cols-4 gap-[1px] bg-white/5">
                        ${['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', 'C', '+', 'sin', 'cos', 'log', '='].map(btn => `
                            <button class="calc-btn p-6 bg-black hover:bg-white/5 transition-colors text-white font-mono uppercase text-xs" data-val="${btn}">${btn}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const display = document.getElementById('calc-display');
        let current = '';

        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.onclick = () => {
                const val = btn.getAttribute('data-val');
                if (val === '=') {
                    try {
                        // Restricted eval-like behavior for scientific functions
                        let expression = current.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/log/g, 'Math.log10');
                        current = eval(expression).toString();
                    } catch (e) {
                        current = 'ERROR';
                    }
                } else if (val === 'C') {
                    current = '';
                } else if (['sin', 'cos', 'log'].includes(val)) {
                    current += val + '(';
                } else {
                    current += val;
                }
                display.innerText = current || '0';
            };
        });
    }

    renderAgeCalc() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Chronos Audit</h2>
                <input type="date" id="age-dob" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Days</div>
                        <div id="age-days" class="text-2xl font-bold font-mono">0</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Weeks</div>
                        <div id="age-weeks" class="text-2xl font-bold font-mono">0</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Months</div>
                        <div id="age-months" class="text-2xl font-bold font-mono">0</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Hours</div>
                        <div id="age-hours" class="text-xl font-bold font-mono">0</div>
                    </div>
                </div>
            </div>
        `;

        const dobInput = document.getElementById('age-dob');
        dobInput.onchange = () => {
            const birth = new Date(dobInput.value);
            const now = new Date();
            const diff = now - birth;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30.4375); // Avg days in month
            const hours = days * 24;

            document.getElementById('age-days').innerText = days.toLocaleString();
            document.getElementById('age-weeks').innerText = weeks.toLocaleString();
            document.getElementById('age-months').innerText = months.toLocaleString();
            document.getElementById('age-hours').innerText = hours.toLocaleString();
        };
    }

    renderSlugGen() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">String Purge</h2>
                <input type="text" id="slug-in" placeholder="Enter title or string..." class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8">
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg group cursor-pointer" id="slug-copy">
                    <div id="slug-out" class="text-xl font-mono text-white/40 break-all select-none group-hover:text-white transition-colors">result-will-appear-here</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Click to Copy Segment</div>
                </div>
            </div>
        `;

        const input = document.getElementById('slug-in');
        const output = document.getElementById('slug-out');

        input.oninput = () => {
            const val = input.value
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            output.innerText = val || 'result-will-appear-here';
            output.classList.toggle('text-white/40', !val);
            output.classList.toggle('text-white', !!val);
        };

        document.getElementById('slug-copy').onclick = () => {
            navigator.clipboard.writeText(output.innerText);
            if (window.toast) toast.success("Slug segment copied.");
        };
    }

    renderBase64() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Base-64 Protocol</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Input String</label>
                        <textarea id="b64-in" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-white focus:outline-none"></textarea>
                        <button id="b64-encode" class="w-full mt-4 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px]">Encode Protocol</button>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Base64 Output</label>
                        <textarea id="b64-out" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-xs focus:border-white focus:outline-none"></textarea>
                        <button id="b64-decode" class="w-full mt-4 py-3 bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] border border-white/10">Decode Protocol</button>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('b64-in');
        const output = document.getElementById('b64-out');

        document.getElementById('b64-encode').onclick = () => {
            try { output.value = btoa(input.value); } catch (e) { if (window.toast) toast.error("Encoding Failure."); }
        };
        document.getElementById('b64-decode').onclick = () => {
            try { input.value = atob(output.value); } catch (e) { if (window.toast) toast.error("Decoding Failure."); }
        };
    }

    renderUnixEpoch() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Temporal Timestamp</h2>
                <div class="space-y-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">Unix Timestamp</label>
                        <input type="number" id="epoch-in" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                        <button id="epoch-now" class="mt-2 text-[10px] uppercase tracking-widest text-stone-500 hover:text-white transition-colors">Current Segment</button>
                    </div>
                    <div class="pt-8 border-t border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Human Protocol</div>
                        <div id="epoch-out" class="text-2xl font-bold font-mono text-white">---</div>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('epoch-in');
        const output = document.getElementById('epoch-out');

        const update = () => {
            const val = parseInt(input.value);
            if (!isNaN(val)) {
                const date = new Date(val * 1000);
                output.innerText = date.toUTCString();
            }
        };

        input.oninput = update;
        document.getElementById('epoch-now').onclick = () => {
            input.value = Math.floor(Date.now() / 1000);
            update();
        };
    }

    renderColorConvert() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Spectrum Pulse</h2>
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2 text-left">HEX Specification</label>
                        <input type="text" id="color-hex" value="#ff0000" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none uppercase text-xl">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                            <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">RGB</div>
                            <div id="color-rgb" class="text-sm font-bold font-mono">255, 0, 0</div>
                        </div>
                        <div class="p-6 bg-white/5 border border-white/5 rounded-lg">
                            <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">HSL</div>
                            <div id="color-hsl" class="text-sm font-bold font-mono">0°, 100%, 50%</div>
                        </div>
                    </div>
                    <div id="color-preview" class="h-24 rounded-lg border border-white/10" style="background-color: #ff0000"></div>
                </div>
            </div>
        `;

        const hexIn = document.getElementById('color-hex');
        const rgbOut = document.getElementById('color-rgb');
        const hslOut = document.getElementById('color-hsl');
        const preview = document.getElementById('color-preview');

        const update = () => {
            let hex = hexIn.value;
            if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return;

            preview.style.backgroundColor = hex;

            // Simplified RGB conversion
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else {
                r = parseInt(hex.substring(1, 3), 16);
                g = parseInt(hex.substring(3, 5), 16);
                b = parseInt(hex.substring(5, 7), 16);
            }
            rgbOut.innerText = `${r}, ${g}, ${b}`;

            // Simplified HSL conversion
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            hslOut.innerText = `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
        };

        hexIn.oninput = update;
    }

    renderMacros() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Macro Engine</h2>
                <div class="space-y-4 text-left">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Weight (kg)</label>
                            <input type="number" id="macro-w" value="70" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Height (cm)</label>
                            <input type="number" id="macro-h" value="175" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Age</label>
                            <input type="number" id="macro-a" value="25" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Activity (1.2-1.9)</label>
                            <input type="number" id="macro-act" value="1.2" step="0.1" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-white/5 space-y-6">
                    <div>
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Maintenance Calories</div>
                        <div id="macro-cal" class="text-4xl font-bold font-mono text-white">0</div>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                        <div class="p-4 bg-white/5 rounded-lg">
                            <div class="text-[8px] uppercase tracking-widest text-stone-500 mb-1">Protein</div>
                            <div id="macro-p" class="font-mono text-sm">0g</div>
                        </div>
                        <div class="p-4 bg-white/5 rounded-lg">
                            <div class="text-[8px] uppercase tracking-widest text-stone-500 mb-1">Fats</div>
                            <div id="macro-f" class="font-mono text-sm">0g</div>
                        </div>
                        <div class="p-4 bg-white/5 rounded-lg">
                            <div class="text-[8px] uppercase tracking-widest text-stone-500 mb-1">Carbs</div>
                            <div id="macro-c" class="font-mono text-sm">0g</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const w = parseFloat(document.getElementById('macro-w').value) || 0;
            const h = parseFloat(document.getElementById('macro-h').value) || 0;
            const a = parseFloat(document.getElementById('macro-a').value) || 0;
            const act = parseFloat(document.getElementById('macro-act').value) || 1.2;

            const bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
            const tdee = bmr * act;

            document.getElementById('macro-cal').innerText = Math.round(tdee);
            document.getElementById('macro-p').innerText = Math.round(w * 2) + 'g';
            document.getElementById('macro-f').innerText = Math.round((tdee * 0.25) / 9) + 'g';
            document.getElementById('macro-c').innerText = Math.round((tdee - (w * 2 * 4) - (tdee * 0.25)) / 4) + 'g';
        };

        ['macro-w', 'macro-h', 'macro-a', 'macro-act'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderCipher() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Cipher Logic</h2>
                <textarea id="cipher-in" placeholder="Enter message segment..." class="w-full h-32 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <div class="flex gap-4 mb-4">
                    <input type="number" id="cipher-shift" value="13" class="w-24 bg-black border border-white/10 p-3 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none">
                    <div class="flex-1 p-3 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-stone-500 flex items-center justify-center">Shift Protocol</div>
                </div>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-lg text-left">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Encrypted Result</div>
                    <div id="cipher-out" class="font-mono text-green-400 break-all">---</div>
                </div>
            </div>
        `;

        const input = document.getElementById('cipher-in');
        const shift = document.getElementById('cipher-shift');
        const output = document.getElementById('cipher-out');

        const update = () => {
            const s = parseInt(shift.value) || 0;
            output.innerText = input.value.split('').map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const base = code >= 97 ? 97 : 65;
                    return String.fromCharCode(((code - base + s) % 26) + base);
                }
                return char;
            }).join('') || '---';
        };

        input.oninput = update;
        shift.oninput = update;
    }

    renderLorem() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Lorem Forge</h2>
                <div class="flex gap-4 mb-8">
                    <input type="number" id="lorem-count" value="3" class="w-24 bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none">
                    <select id="lorem-type" class="flex-1 bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        <option value="paras">Paragraphs</option>
                        <option value="words">Words</option>
                    </select>
                </div>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg text-left relative group">
                    <div id="lorem-out" class="text-sm font-light leading-relaxed text-stone-300 max-h-96 overflow-y-auto pr-4"></div>
                    <button id="lorem-copy" class="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-stone-600 hover:text-white transition-colors">Copy</button>
                </div>
            </div>
        `;

        const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"];
        const output = document.getElementById('lorem-out');

        const generate = () => {
            const count = parseInt(document.getElementById('lorem-count').value) || 1;
            const type = document.getElementById('lorem-type').value;
            let result = "";

            if (type === 'paras') {
                for (let i = 0; i < count; i++) {
                    let p = Array.from({ length: 40 }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
                    result += `<p class="mb-4">${p.charAt(0).toUpperCase() + p.slice(1)}.</p>`;
                }
            } else {
                result = Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
                result = result.charAt(0).toUpperCase() + result.slice(1) + ".";
            }
            output.innerHTML = result;
        };

        document.getElementById('lorem-count').oninput = generate;
        document.getElementById('lorem-type').onchange = generate;
        document.getElementById('lorem-copy').onclick = () => {
            navigator.clipboard.writeText(output.innerText);
            if (window.toast) toast.success("Lorem fragment copied.");
        };
        generate();
    }

    renderAspectRatio() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Aspect Ratio</h2>
                <div class="grid grid-cols-2 gap-8 mb-12">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Width</label>
                        <input type="number" id="aspect-w" value="1920" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Height</label>
                        <input type="number" id="aspect-h" value="1080" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                </div>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Simplified Ratio</div>
                    <div id="aspect-res" class="text-4xl font-bold font-mono text-white">16:9</div>
                </div>
                <div class="mt-8 flex justify-center">
                    <div id="aspect-preview" class="border border-white/20 bg-white/5 transition-all duration-500" style="width: 200px; height: 112px;"></div>
                </div>
            </div>
        `;

        const update = () => {
            const w = parseInt(document.getElementById('aspect-w').value) || 1;
            const h = parseInt(document.getElementById('aspect-h').value) || 1;

            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const divisor = gcd(w, h);

            document.getElementById('aspect-res').innerText = `${w / divisor}:${h / divisor}`;

            const preview = document.getElementById('aspect-preview');
            const ratio = w / h;
            if (ratio > 1) {
                preview.style.width = '240px';
                preview.style.height = (240 / ratio) + 'px';
            } else {
                preview.style.height = '150px';
                preview.style.width = (150 * ratio) + 'px';
            }
        };

        ['aspect-w', 'aspect-h'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderCompound() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Compound Yield</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Principal ($)</label>
                        <input type="number" id="comp-p" value="10000" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Annual Rate (%)</label>
                            <input type="number" id="comp-r" value="7" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Years</label>
                            <input type="number" id="comp-t" value="10" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                    </div>
                </div>
                <div class="mt-12 p-8 bg-zinc-900 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Future Value</div>
                    <div id="comp-res" class="text-5xl font-bold font-mono text-green-400">$0.00</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Total Interest Accrued</div>
                    <div id="comp-int" class="text-xl font-mono text-white/40">$0.00</div>
                </div>
            </div>
        `;

        const update = () => {
            const p = parseFloat(document.getElementById('comp-p').value) || 0;
            const r = (parseFloat(document.getElementById('comp-r').value) || 0) / 100;
            const t = parseFloat(document.getElementById('comp-t').value) || 0;

            const a = p * Math.pow(1 + r, t);
            const interest = a - p;

            document.getElementById('comp-res').innerText = `$${a.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            document.getElementById('comp-int').innerText = `$${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        };

        ['comp-p', 'comp-r', 'comp-t'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderEntities() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Entity Vault</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Raw Fragment</label>
                        <textarea id="ent-raw" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-white focus:outline-none" placeholder="<div>Hello World</div>"></textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Encoded Protocol</label>
                        <textarea id="ent-enc" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-white focus:outline-none" placeholder="&lt;div&gt;Hello World&lt;/div&gt;"></textarea>
                    </div>
                </div>
                <div class="flex gap-4 mt-4">
                    <button id="ent-btn-enc" class="flex-1 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px]">Encode</button>
                    <button id="ent-btn-dec" class="flex-1 py-3 bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] border border-white/10">Decode</button>
                </div>
            </div>
        `;

        const raw = document.getElementById('ent-raw');
        const enc = document.getElementById('ent-enc');

        document.getElementById('ent-btn-enc').onclick = () => {
            const el = document.createElement('div');
            el.innerText = raw.value;
            enc.value = el.innerHTML;
        };
        document.getElementById('ent-btn-dec').onclick = () => {
            const el = document.createElement('div');
            el.innerHTML = enc.value;
            raw.value = el.innerText;
        };
    }

    renderPrimes() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Prime Audit</h2>
                <input type="number" id="prime-in" value="7" class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none text-3xl mb-8">
                <div id="prime-res" class="text-sm uppercase tracking-[0.5em] text-green-400 mb-12">Integer satisfies primality.</div>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg text-left">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-4">Factor Chain</div>
                    <div id="prime-factors" class="font-mono text-white/60">7</div>
                </div>
            </div>
        `;

        const update = () => {
            let n = parseInt(document.getElementById('prime-in').value) || 0;
            const res = document.getElementById('prime-res');
            const chain = document.getElementById('prime-factors');

            if (n < 2) {
                res.innerText = "Integer below primality threshold.";
                res.className = "text-sm uppercase tracking-[0.5em] text-red-500 mb-12";
                chain.innerText = "None";
                return;
            }

            let isPrime = true;
            let factors = [];
            let d = 2;
            let temp = n;
            while (temp > 1) {
                if (temp % d === 0) {
                    factors.push(d);
                    temp /= d;
                    if (d !== n) isPrime = false;
                } else {
                    d++;
                }
            }

            res.innerText = isPrime ? "Integer satisfies primality." : "Integer is composite.";
            res.className = `text-sm uppercase tracking-[0.5em] ${isPrime ? 'text-green-400' : 'text-yellow-400'} mb-12`;
            chain.innerText = factors.join(' × ');
        };

        document.getElementById('prime-in').oninput = update;
        update();
    }

    renderStopwatch() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Stopwatch Pulse</h2>
                <div id="sw-display" class="text-7xl font-bold font-mono text-white mb-12">00:00:00.000</div>
                <div class="flex gap-4">
                    <button id="sw-start" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Start</button>
                    <button id="sw-lap" class="flex-1 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-lg border border-white/10">Lap</button>
                    <button id="sw-reset" class="px-8 py-4 bg-red-950/20 text-red-500 font-bold uppercase tracking-widest rounded-lg">Reset</button>
                </div>
                <div id="sw-laps" class="mt-8 space-y-2 max-h-48 overflow-y-auto pr-2 font-mono text-sm text-stone-500"></div>
            </div>
        `;

        let startTime, timerId, laps = [];
        const display = document.getElementById('sw-display');

        const update = () => {
            const diff = Date.now() - startTime;
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            const ms = diff % 1000;
            display.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
        };

        document.getElementById('sw-start').onclick = (e) => {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
                e.target.innerText = "Resume";
            } else {
                startTime = startTime ? startTime + (Date.now() - (startTime + (Date.now() - startTime))) : Date.now();
                // Fix for pause/resume: adjustment needed
                if (!startTime) startTime = Date.now();
                else {
                    // This is a simple resume, real logic would subtract paused time
                }
                // Proper resume:
                const now = Date.now();
                if (startTime) {
                    // subtract paused delta here if we tracked it
                }
                startTime = Date.now() - (display.innerText.split(':').reduce((acc, time, i) => acc + parseFloat(time) * [3600000, 60000, 1000][i], 0));

                timerId = setInterval(update, 10);
                e.target.innerText = "Pause";
            }
        };

        document.getElementById('sw-reset').onclick = () => {
            clearInterval(timerId);
            timerId = null;
            startTime = null;
            display.innerText = "00:00:00.000";
            document.getElementById('sw-start').innerText = "Start";
            document.getElementById('sw-laps').innerHTML = "";
            laps = [];
        };

        document.getElementById('sw-lap').onclick = () => {
            if (!timerId) return;
            const lapStr = display.innerText;
            laps.unshift(lapStr);
            document.getElementById('sw-laps').innerHTML = laps.map((l, i) => `<div class="flex justify-between border-b border-white/5 pb-1"><span>Lap ${laps.length - i}</span><span>${l}</span></div>`).join('');
        };
    }

    renderDupes() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Duplicate Purge</h2>
                <textarea id="dupe-in" placeholder="Enter lines of data..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <div class="flex gap-4">
                    <button id="dupe-btn" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Purify Payload</button>
                    <button id="dupe-copy" class="px-8 bg-white/5 text-stone-500 hover:text-white transition-colors uppercase tracking-widest text-[10px]">Copy Result</button>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-widest text-stone-600" id="dupe-status">0 lines removed.</div>
            </div>
        `;

        const input = document.getElementById('dupe-in');
        document.getElementById('dupe-btn').onclick = () => {
            const lines = input.value.split('\n');
            const unique = [...new Set(lines)];
            input.value = unique.join('\n');
            document.getElementById('dupe-status').innerText = `${lines.length - unique.length} redundant lines purged.`;
        };
        document.getElementById('dupe-copy').onclick = () => {
            navigator.clipboard.writeText(input.value);
            if (window.toast) toast.success("Clean sequence captured.");
        };
    }

    renderSalary() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Salary Pivot</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Hourly Rate ($)</label>
                        <input type="number" id="sal-h" value="25" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                </div>
                <div class="mt-8 grid grid-cols-1 gap-4">
                    <div class="p-6 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Annual Capital (40h/week)</div>
                        <div id="sal-yr" class="text-4xl font-bold font-mono text-white">$0.00</div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-white/5 rounded-lg">
                            <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Monthly</div>
                            <div id="sal-mo" class="font-mono text-lg">$0.00</div>
                        </div>
                        <div class="p-4 bg-white/5 rounded-lg">
                            <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Weekly</div>
                            <div id="sal-wk" class="font-mono text-lg">$0.00</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const h = parseFloat(document.getElementById('sal-h').value) || 0;
            const yr = h * 40 * 52;
            const mo = yr / 12;
            const wk = yr / 52;

            document.getElementById('sal-yr').innerText = `$${yr.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            document.getElementById('sal-mo').innerText = `$${mo.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
            document.getElementById('sal-wk').innerText = `$${wk.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        };

        document.getElementById('sal-h').oninput = update;
        update();
    }

    renderJSONAuth() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JSON Schema</h2>
                <textarea id="json-auth-in" placeholder="Paste JSON protocol for validation..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <div id="json-auth-res" class="p-6 rounded-lg border border-white/5 text-[10px] uppercase tracking-widest text-stone-500">Waiting for data segment...</div>
            </div>
        `;

        const input = document.getElementById('json-auth-in');
        const res = document.getElementById('json-auth-res');

        input.oninput = () => {
            if (!input.value.trim()) {
                res.innerText = "Waiting for data segment...";
                res.className = "p-6 rounded-lg border border-white/5 text-[10px] uppercase tracking-widest text-stone-500";
                return;
            }
            try {
                JSON.parse(input.value);
                res.innerText = "Protocol Valid. Structure satisfied.";
                res.className = "p-6 rounded-lg border border-green-500/20 bg-green-500/5 text-[10px] uppercase tracking-widest text-green-400";
            } catch (e) {
                res.innerText = `Invalid Protocol: ${e.message}`;
                res.className = "p-6 rounded-lg border border-red-500/20 bg-red-500/5 text-[10px] uppercase tracking-widest text-red-500";
            }
        };
    }

    renderHexGen() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hex Forge</h2>
                <div id="hex-forge-preview" class="h-48 rounded-2xl border border-white/10 mb-8 flex items-center justify-center transition-colors duration-500 group cursor-pointer">
                    <div id="hex-forge-out" class="text-4xl font-bold font-mono text-white drop-shadow-xl">#FFFFFF</div>
                </div>
                <button id="hex-forge-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] rounded-lg hover:bg-stone-200 transition-all">Forge Segment</button>
                <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Click preview to copy protocol.</div>
            </div>
        `;

        const generate = () => {
            const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            document.getElementById('hex-forge-preview').style.backgroundColor = hex;
            document.getElementById('hex-forge-out').innerText = hex.toUpperCase();

            // Contrast check for text
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            document.getElementById('hex-forge-out').style.color = brightness > 128 ? 'black' : 'white';
        };

        const preview = document.getElementById('hex-forge-preview');
        preview.onclick = () => {
            navigator.clipboard.writeText(document.getElementById('hex-forge-out').innerText);
            if (window.toast) toast.success("Color coordinate captured.");
        };

        document.getElementById('hex-forge-btn').onclick = generate;
        generate();
    }

    renderFreq() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Frequency Hub</h2>
                <textarea id="freq-in" placeholder="Injected language payload..." class="w-full h-48 bg-black border border-white/10 rounded-lg p-6 text-stone-300 focus:border-white focus:outline-none mb-8 font-mono"></textarea>
                <div id="freq-out" class="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
            </div>
        `;

        const input = document.getElementById('freq-in');
        const output = document.getElementById('freq-out');

        input.oninput = () => {
            const text = input.value.toLowerCase().replace(/[^\w\s]/g, '');
            const words = text.split(/\s+/).filter(w => w.length > 2);
            const counts = {};
            words.forEach(w => counts[w] = (counts[w] || 0) + 1);

            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
            output.innerHTML = sorted.map(([w, c]) => `
                <div class="p-4 bg-white/5 border border-white/5 rounded-lg text-center">
                    <div class="text-xl font-bold font-mono text-white">${c}</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-1 truncate">${w}</div>
                </div>
            `).join('');
        };
    }

    renderBMR() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">BMR Audit</h2>
                <div class="space-y-4 text-left">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Weight (kg)</label>
                            <input type="number" id="bmr-w" value="70" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Height (cm)</label>
                            <input type="number" id="bmr-h" value="175" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-white/5">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Basal Metabolic Cost</div>
                    <div id="bmr-res" class="text-5xl font-bold font-mono text-amber-500">0</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Calories / 24h (Static)</div>
                </div>
            </div>
        `;

        const update = () => {
            const w = parseFloat(document.getElementById('bmr-w').value) || 0;
            const h = parseFloat(document.getElementById('bmr-h').value) || 0;
            const a = 25; // Default age or pull from state
            const bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
            document.getElementById('bmr-res').innerText = Math.round(bmr);
        };

        ['bmr-w', 'bmr-h'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderSimpleInt() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Interest Flow</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Principal ($)</label>
                        <input type="number" id="simp-p" value="5000" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Rate (%)</label>
                            <input type="number" id="simp-r" value="5" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Time (Yrs)</label>
                            <input type="number" id="simp-t" value="1" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        </div>
                    </div>
                </div>
                <div class="mt-8 p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Accumulated Flow</div>
                    <div id="simp-res" class="text-4xl font-bold font-mono text-green-400">$250.00</div>
                </div>
            </div>
        `;

        const update = () => {
            const p = parseFloat(document.getElementById('simp-p').value) || 0;
            const r = parseFloat(document.getElementById('simp-r').value) || 0;
            const t = parseFloat(document.getElementById('simp-t').value) || 0;
            const interest = (p * r * t) / 100;
            document.getElementById('simp-res').innerText = `$${interest.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        };

        ['simp-p', 'simp-r', 'simp-t'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderFlip() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Case Flip</h2>
                <textarea id="flip-in" placeholder="tOGGLE eVERY cASE..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <button id="flip-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] rounded-lg">Execute Inversion</button>
            </div>
        `;

        const input = document.getElementById('flip-in');
        document.getElementById('flip-btn').onclick = () => {
            input.value = input.value.split('').map(c =>
                c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
            ).join('');
        };
    }

    renderLeap() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Leap Logic</h2>
                <input type="number" id="leap-in" value="2024" class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none text-4xl mb-8">
                <div id="leap-res" class="text-sm uppercase tracking-[0.5em] text-green-400">Leap Cycle Confirmed.</div>
            </div>
        `;

        const update = () => {
            const y = parseInt(document.getElementById('leap-in').value) || 0;
            const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
            const res = document.getElementById('leap-res');
            res.innerText = isLeap ? "Leap Cycle Confirmed." : "Standard Cycle protocol.";
            res.className = `text-sm uppercase tracking-[0.5em] ${isLeap ? 'text-green-400' : 'text-stone-500'}`;
        };

        document.getElementById('leap-in').oninput = update;
        update();
    }

    renderChars() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Character Map</h2>
                <div id="char-grid" class="grid grid-cols-4 md:grid-cols-8 gap-1 bg-white/5 border border-white/10">
                    <!-- Injected -->
                </div>
            </div>
        `;

        const grid = document.getElementById('char-grid');
        let html = '';
        for (let i = 33; i < 127; i++) {
            html += `
                <div class="aspect-square flex flex-col items-center justify-center border border-white/5 hover:bg-white/10 transition-colors cursor-pointer" onclick="navigator.clipboard.writeText('${String.fromCharCode(i)}')">
                    <div class="text-lg text-white">${String.fromCharCode(i)}</div>
                    <div class="text-[8px] text-stone-600">${i}</div>
                </div>
            `;
        }
        grid.innerHTML = html;
    }

    renderVibrant() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Vibrant Yield</h2>
                <div class="flex gap-4 justify-center mb-8">
                    <input type="text" id="vib-hex" value="#3498db" class="w-48 bg-black border border-white/10 p-4 text-center text-xl font-mono focus:border-white focus:outline-none uppercase">
                    <button id="vib-btn" class="px-8 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Generate</button>
                </div>
                <div id="vib-grid" class="grid grid-cols-2 md:grid-cols-6 gap-4"></div>
            </div>
        `;

        const generate = () => {
            const hex = document.getElementById('vib-hex').value;
            if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) return;
            const grid = document.getElementById('vib-grid');
            grid.innerHTML = '';

            for (let i = 0; i < 6; i++) {
                const opacity = 1 - (i * 0.15);
                const el = document.createElement('div');
                el.className = "h-32 rounded-lg border border-white/10 flex items-end p-2 cursor-pointer hover:scale-105 transition-transform";
                el.style.backgroundColor = hex;
                el.style.opacity = opacity;
                el.onclick = () => {
                    navigator.clipboard.writeText(hex);
                    if (window.toast) toast.success("Coordinate captured.");
                };
                el.innerHTML = `<span class="text-[8px] font-mono mix-blend-difference text-white uppercase">${hex}</span>`;
                grid.appendChild(el);
            }
        };

        document.getElementById('vib-btn').onclick = generate;
        generate();
    }

    renderBinLogic() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Binary Logic</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Decimal</label>
                        <input type="number" id="binl-dec" value="255" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Binary</label>
                        <input type="text" id="binl-bin" value="11111111" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Hex</label>
                        <input type="text" id="binl-hex" value="FF" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl uppercase">
                    </div>
                </div>
            </div>
        `;

        const d = document.getElementById('binl-dec');
        const b = document.getElementById('binl-bin');
        const h = document.getElementById('binl-hex');

        d.oninput = () => {
            const val = parseInt(d.value);
            if (!isNaN(val)) {
                b.value = val.toString(2);
                h.value = val.toString(16).toUpperCase();
            }
        };
        b.oninput = () => {
            const val = parseInt(b.value, 2);
            if (!isNaN(val)) {
                d.value = val;
                h.value = val.toString(16).toUpperCase();
            }
        };
        h.oninput = () => {
            const val = parseInt(h.value, 16);
            if (!isNaN(val)) {
                d.value = val;
                b.value = val.toString(2);
            }
        };
    }

    renderTrim() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Whitespace Purge</h2>
                <textarea id="trim-in" placeholder="  P_a_s_t_e  payload  here . . . " class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <div class="flex gap-4">
                    <button id="trim-btn" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-[0.3em] rounded-lg">Purge Spaces</button>
                    <button id="trim-lines" class="flex-1 py-4 bg-white/10 text-white font-bold uppercase tracking-[0.3em] rounded-lg border border-white/10">Purge Empty Lines</button>
                </div>
            </div>
        `;

        const input = document.getElementById('trim-in');
        document.getElementById('trim-btn').onclick = () => {
            input.value = input.value.replace(/\s+/g, ' ').trim();
        };
        document.getElementById('trim-lines').onclick = () => {
            input.value = input.value.split('\n').filter(l => l.trim() !== '').join('\n');
        };
    }

    renderTip() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Tip Protocol</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Bill Amount ($)</label>
                        <input type="number" id="tip-bill" value="100" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Tip (%)</label>
                            <input type="number" id="tip-perc" value="15" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                        </div>
                        <div>
                            <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Split</label>
                            <input type="number" id="tip-split" value="1" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                        </div>
                    </div>
                </div>
                <div class="mt-8 p-8 bg-zinc-900 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Per Entity</div>
                    <div id="tip-res" class="text-5xl font-bold font-mono text-white">$115.00</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Tip Amount: <span id="tip-amt" class="text-white">$15.00</span></div>
                </div>
            </div>
        `;

        const update = () => {
            const bill = parseFloat(document.getElementById('tip-bill').value) || 0;
            const perc = parseFloat(document.getElementById('tip-perc').value) || 0;
            const split = parseFloat(document.getElementById('tip-split').value) || 1;

            const tipAmt = (bill * perc) / 100;
            const total = (bill + tipAmt) / split;

            document.getElementById('tip-res').innerText = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
            document.getElementById('tip-amt').innerText = `$${tipAmt.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        };

        ['tip-bill', 'tip-perc', 'tip-split'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderPxRem() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">PX to REM</h2>
                <div class="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Pixels (px)</label>
                        <input type="number" id="px-in" value="16" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Base Size</label>
                        <input type="number" id="px-base" value="16" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                </div>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">REM Equivalent</div>
                    <div id="px-res" class="text-5xl font-bold font-mono text-white">1rem</div>
                </div>
            </div>
        `;

        const update = () => {
            const px = parseFloat(document.getElementById('px-in').value) || 0;
            const base = parseFloat(document.getElementById('px-base').value) || 16;
            document.getElementById('px-res').innerText = `${(px / base).toFixed(3).replace(/\.?0+$/, '')}rem`;
        };

        ['px-in', 'px-base'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderMD() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 text-center tracking-widest">Markdown Forge</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
                    <textarea id="md-in" placeholder="# Title\n\n**Bold Text**..." class="w-full h-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none"></textarea>
                    <div id="md-out" class="w-full h-full bg-white/5 border border-white/10 p-6 rounded-lg overflow-y-auto prose prose-invert max-w-none"></div>
                </div>
            </div>
        `;

        const input = document.getElementById('md-in');
        const output = document.getElementById('md-out');

        input.oninput = () => {
            // Simple markdown parser (since we can't import bulky libs easily)
            let html = input.value
                .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*)\*/g, '<em>$1</em>')
                .replace(/^\- (.*$)/gm, '<li>$1</li>')
                .replace(/\n/g, '<br>');
            output.innerHTML = html;
        };
    }

    renderReverse() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Text Reverser</h2>
                <textarea id="rev-in" placeholder="Enter text segment..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <button id="rev-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Invert Sequence</button>
            </div>
        `;

        const input = document.getElementById('rev-in');
        document.getElementById('rev-btn').onclick = () => {
            input.value = input.value.split('').reverse().join('');
        };
    }

    renderOctal() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Base-8 Cipher</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Decimal</label>
                        <input type="number" id="oct-dec" value="64" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Octal Output</label>
                        <div id="oct-res" class="w-full bg-white/5 border border-white/5 p-4 rounded-lg text-4xl font-mono text-white">100</div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('oct-dec').oninput = (e) => {
            const val = parseInt(e.target.value);
            document.getElementById('oct-res').innerText = isNaN(val) ? '0' : val.toString(8);
        };
    }

    renderHash() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hash Forge</h2>
                <textarea id="hash-in" placeholder="Data to hash..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-lg text-left break-all font-mono text-xs text-amber-500" id="hash-out">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
                <div class="text-[10px] uppercase tracking-widest text-stone-600 mt-4">Protocol: SHA-256</div>
            </div>
        `;

        const input = document.getElementById('hash-in');
        const output = document.getElementById('hash-out');

        input.oninput = async () => {
            const msgUint8 = new TextEncoder().encode(input.value);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            output.innerText = hashHex;
        };
    }

    renderLines() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Line Auditor</h2>
                <textarea id="line-in" placeholder="Paste data segments..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8"></textarea>
                <div class="grid grid-cols-3 gap-4">
                    <div class="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Total Lines</div>
                        <div id="line-total" class="font-mono text-xl">0</div>
                    </div>
                    <div class="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Empty Lines</div>
                        <div id="line-empty" class="font-mono text-xl">0</div>
                    </div>
                    <div class="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Characters</div>
                        <div id="line-char" class="font-mono text-xl">0</div>
                    </div>
                </div>
            </div>
        `;

        const input = document.getElementById('line-in');
        input.oninput = () => {
            const lines = input.value.split('\n');
            document.getElementById('line-total').innerText = lines.length;
            document.getElementById('line-empty').innerText = lines.filter(l => l.trim() === '').length;
            document.getElementById('line-char').innerText = input.value.length;
        };
    }

    renderURL() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">URL Auditor</h2>
                <input type="text" id="url-in" placeholder="https://example.com?param=value..." class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8">
                <div id="url-out" class="text-left space-y-4"></div>
            </div>
        `;

        const input = document.getElementById('url-in');
        const output = document.getElementById('url-out');

        input.oninput = () => {
            try {
                const url = new URL(input.value);
                let html = `
                    <div class="p-4 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500">Hostname</div>
                        <div class="font-mono text-white">${url.hostname}</div>
                    </div>
                    <div class="p-4 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500">Params</div>
                        <div class="font-mono text-amber-500 text-xs">${[...url.searchParams.entries()].map(([k, v]) => `${k}: ${v}`).join('<br>') || 'None'}</div>
                    </div>
                `;
                output.innerHTML = html;
            } catch (e) { output.innerHTML = ''; }
        };
    }

    renderList() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">List Forge</h2>
                <div class="flex gap-4 mb-4">
                    <input type="number" id="list-count" value="5" class="w-24 bg-black border border-white/10 p-4 rounded-lg text-white text-center font-mono focus:border-white focus:outline-none">
                    <select id="list-type" class="flex-1 bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        <option value="num">Numbered (1, 2, 3)</option>
                        <option value="bullet">Bulleted (•)</option>
                    </select>
                </div>
                <button id="list-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg mb-4">Forge Structure</button>
                <textarea id="list-out" class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none"></textarea>
            </div>
        `;

        document.getElementById('list-btn').onclick = () => {
            const count = parseInt(document.getElementById('list-count').value);
            const type = document.getElementById('list-type').value;
            let res = "";
            for (let i = 1; i <= count; i++) {
                res += (type === 'num' ? `${i}. ` : "• ") + "\n";
            }
            document.getElementById('list-out').value = res;
        };
    }

    renderRand() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Random Sequence</h2>
                <div class="flex gap-4 mb-8">
                    <input type="number" id="rand-len" value="16" class="w-24 bg-black border border-white/10 p-4 rounded-lg text-white text-center font-mono focus:border-white focus:outline-none">
                    <button id="rand-btn" class="flex-1 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Forge Sequence</button>
                </div>
                <div id="rand-out" class="p-8 bg-zinc-900 border border-white/10 rounded-lg font-mono text-2xl text-white break-all select-all">---</div>
            </div>
        `;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        document.getElementById('rand-btn').onclick = () => {
            const len = parseInt(document.getElementById('rand-len').value) || 16;
            let res = "";
            for (let i = 0; i < len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
            document.getElementById('rand-out').innerText = res;
        };
    }

    renderGPA() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">GPA Engine</h2>
                <div id="gpa-rows" class="space-y-4 mb-8">
                    <div class="flex gap-4">
                        <input type="number" placeholder="Grade (0-100)" class="gpa-grade flex-1 bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                        <input type="number" placeholder="Credits" class="gpa-credit w-24 bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                    </div>
                </div>
                <button id="gpa-add" class="text-[10px] uppercase tracking-widest text-stone-500 hover:text-white transition-colors mb-8">+ Add Module</button>
                <div class="p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Cumulative GPA</div>
                    <div id="gpa-res" class="text-6xl font-bold font-mono text-white">0.00</div>
                </div>
            </div>
        `;

        const rows = document.getElementById('gpa-rows');
        document.getElementById('gpa-add').onclick = () => {
            const div = document.createElement('div');
            div.className = "flex gap-4";
            div.innerHTML = `
                <input type="number" placeholder="Grade (0-100)" class="gpa-grade flex-1 bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                <input type="number" placeholder="Credits" class="gpa-credit w-24 bg-black border border-white/10 p-3 rounded-lg text-white font-mono focus:border-white focus:outline-none">
            `;
            rows.appendChild(div);
            div.querySelectorAll('input').forEach(i => i.oninput = update);
        };

        const update = () => {
            let totalPoints = 0, totalCredits = 0;
            const grades = document.querySelectorAll('.gpa-grade');
            const credits = document.querySelectorAll('.gpa-credit');
            grades.forEach((g, i) => {
                const grade = parseFloat(g.value) || 0;
                const credit = parseFloat(credits[i].value) || 0;
                totalPoints += (grade / 25) * credit; // Simplified 4.0 scale
                totalCredits += credit;
            });
            document.getElementById('gpa-res').innerText = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
        };

        rows.querySelectorAll('input').forEach(i => i.oninput = update);
    }

    renderSeconds() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Age In Seconds</h2>
                <input type="date" id="sec-dob" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-12">
                <div id="sec-res" class="text-4xl font-bold font-mono text-white tracking-tighter">0</div>
                <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Seconds Accumulated</div>
            </div>
        `;

        let interval;
        document.getElementById('sec-dob').onchange = (e) => {
            if (interval) clearInterval(interval);
            const birth = new Date(e.target.value);
            interval = setInterval(() => {
                const diff = (Date.now() - birth.getTime()) / 1000;
                document.getElementById('sec-res').innerText = Math.floor(diff).toLocaleString();
            }, 1000);
        };
    }

    renderTax() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Tax Flow</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Base Amount ($)</label>
                        <input type="number" id="tax-base" value="100" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Tax Rate (%)</label>
                        <input type="number" id="tax-rate" value="8.25" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                </div>
                <div class="mt-8 p-8 bg-zinc-900 border border-white/10 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Total Subject to Flow</div>
                    <div id="tax-res" class="text-5xl font-bold font-mono text-white">$108.25</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-4">Tax Component: <span id="tax-amt" class="text-white">$8.25</span></div>
                </div>
            </div>
        `;

        const update = () => {
            const base = parseFloat(document.getElementById('tax-base').value) || 0;
            const rate = parseFloat(document.getElementById('tax-rate').value) || 0;
            const tax = (base * rate) / 100;
            document.getElementById('tax-res').innerText = `$${(base + tax).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
            document.getElementById('tax-amt').innerText = `$${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        };

        ['tax-base', 'tax-rate'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderVAT() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Vat Logic</h2>
                <div class="space-y-6 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Gross Amount ($)</label>
                        <input type="number" id="vat-gross" value="120" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-2xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">VAT Rate (%)</label>
                        <input type="number" id="vat-rate" value="20" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none text-xl">
                    </div>
                </div>
                <div class="mt-8 grid grid-cols-2 gap-4">
                    <div class="p-6 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Net (Pre-VAT)</div>
                        <div id="vat-net" class="text-2xl font-bold font-mono text-white">$100.00</div>
                    </div>
                    <div class="p-6 bg-white/5 rounded-lg border border-white/5">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">VAT Portion</div>
                        <div id="vat-amt" class="text-2xl font-bold font-mono text-amber-500">$20.00</div>
                    </div>
                </div>
            </div>
        `;

        const update = () => {
            const gross = parseFloat(document.getElementById('vat-gross').value) || 0;
            const rate = parseFloat(document.getElementById('vat-rate').value) || 0;
            const net = gross / (1 + (rate / 100));
            const vat = gross - net;
            document.getElementById('vat-net').innerText = `$${net.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
            document.getElementById('vat-amt').innerText = `$${vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
        };

        ['vat-gross', 'vat-rate'].forEach(id => document.getElementById(id).oninput = update);
        update();
        ['vat-gross', 'vat-rate'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderViewport() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Window Pulse</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-8 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Viewport Width</div>
                        <div id="view-w" class="text-4xl font-bold font-mono text-white">0</div>
                    </div>
                    <div class="p-8 bg-white/5 border border-white/5 rounded-lg">
                        <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Viewport Height</div>
                        <div id="view-h" class="text-4xl font-bold font-mono text-white">0</div>
                    </div>
                </div>
                <div class="mt-8 text-[10px] uppercase tracking-widest text-stone-600">Dynamic coordinate monitoring active.</div>
            </div>
        `;

        const update = () => {
            document.getElementById('view-w').innerText = window.innerWidth;
            document.getElementById('view-h').innerText = window.innerHeight;
        };
        window.onresize = update;
        update();
    }

    renderUA() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">User Agent</h2>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-lg text-left break-all font-mono text-sm text-stone-400 mb-8" id="ua-out"></div>
                <button id="ua-copy" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Copy Identification String</button>
            </div>
        `;
        document.getElementById('ua-out').innerText = navigator.userAgent;
        document.getElementById('ua-copy').onclick = () => {
            navigator.clipboard.writeText(navigator.userAgent);
            if (window.toast) toast.success("Identity segment captured.");
        };
    }

    renderBinText() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Binary Text</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Text Payload</label>
                        <textarea id="bint-txt" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-white focus:outline-none"></textarea>
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Binary Protocol</label>
                        <textarea id="bint-bin" class="w-full h-48 bg-black border border-white/10 rounded-lg p-4 font-mono text-xs focus:border-white focus:outline-none"></textarea>
                    </div>
                </div>
            </div>
        `;
        const txt = document.getElementById('bint-txt');
        const bin = document.getElementById('bint-bin');

        txt.oninput = () => {
            bin.value = txt.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        };
        bin.oninput = () => {
            txt.value = bin.value.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
        };
    }

    renderRGBHex() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">RGB to HEX</h2>
                <div class="grid grid-cols-3 gap-4 mb-12">
                    <input type="number" id="rgbh-r" value="255" max="255" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none">
                    <input type="number" id="rgbh-g" value="0" max="255" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none">
                    <input type="number" id="rgbh-b" value="0" max="255" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center focus:border-white focus:outline-none">
                </div>
                <div id="rgbh-preview" class="h-24 rounded-lg mb-8" style="background-color: #ff0000"></div>
                <div id="rgbh-res" class="text-4xl font-bold font-mono text-white">#FF0000</div>
            </div>
        `;
        const update = () => {
            const r = (parseInt(document.getElementById('rgbh-r').value) || 0).toString(16).padStart(2, '0');
            const g = (parseInt(document.getElementById('rgbh-g').value) || 0).toString(16).padStart(2, '0');
            const b = (parseInt(document.getElementById('rgbh-b').value) || 0).toString(16).padStart(2, '0');
            const hex = `#${r}${g}${b}`.toUpperCase();
            document.getElementById('rgbh-res').innerText = hex;
            document.getElementById('rgbh-preview').style.backgroundColor = hex;
        };
        ['rgbh-r', 'rgbh-g', 'rgbh-b'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderHSLRGB() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">HSL to RGB</h2>
                <div class="grid grid-cols-3 gap-4 mb-12">
                    <input type="number" id="hslr-h" value="0" max="360" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center">
                    <input type="number" id="hslr-s" value="100" max="100" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center">
                    <input type="number" id="hslr-l" value="50" max="100" class="bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center">
                </div>
                <div id="hslr-preview" class="h-24 rounded-lg mb-8" style="background-color: hsl(0, 100%, 50%)"></div>
                <div id="hslr-res" class="text-3xl font-bold font-mono text-white">rgb(255, 0, 0)</div>
            </div>
        `;
        const update = () => {
            const h = document.getElementById('hslr-h').value;
            const s = document.getElementById('hslr-s').value;
            const l = document.getElementById('hslr-l').value;
            const color = `hsl(${h}, ${s}%, ${l}%)`;
            document.getElementById('hslr-preview').style.backgroundColor = color;
            // Native HSL to RGB conversion via canvas or offscreen dummy
            const el = document.createElement('div'); el.style.color = color; document.body.appendChild(el);
            const rgb = window.getComputedStyle(el).color; document.body.removeChild(el);
            document.getElementById('hslr-res').innerText = rgb;
        };
        ['hslr-h', 'hslr-s', 'hslr-l'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderCMYK() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">CMYK Forge</h2>
                <div class="grid grid-cols-4 gap-2 mb-8">
                    <input type="number" id="cmyk-c" value="0" class="bg-black border border-white/10 p-3 rounded-lg text-white">
                    <input type="number" id="cmyk-m" value="100" class="bg-black border border-white/10 p-3 rounded-lg text-white">
                    <input type="number" id="cmyk-y" value="100" class="bg-black border border-white/10 p-3 rounded-lg text-white">
                    <input type="number" id="cmyk-k" value="0" class="bg-black border border-white/10 p-3 rounded-lg text-white">
                </div>
                <div id="cmyk-res" class="text-2xl font-mono text-white mb-4">rgb(255, 0, 0)</div>
                <div id="cmyk-preview" class="h-24 rounded-lg border border-white/10" style="background-color: #f00"></div>
            </div>
        `;
        const update = () => {
            const c = (document.getElementById('cmyk-c').value || 0) / 100;
            const m = (document.getElementById('cmyk-m').value || 0) / 100;
            const y = (document.getElementById('cmyk-y').value || 0) / 100;
            const k = (document.getElementById('cmyk-k').value || 0) / 100;
            const r = Math.round(255 * (1 - c) * (1 - k));
            const g = Math.round(255 * (1 - m) * (1 - k));
            const b = Math.round(255 * (1 - y) * (1 - k));
            document.getElementById('cmyk-res').innerText = `rgb(${r}, ${g}, ${b})`;
            document.getElementById('cmyk-preview').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        };
        ['cmyk-c', 'cmyk-m', 'cmyk-y', 'cmyk-k'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderShadow() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Box Shadow</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="space-y-4 text-left">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500">Offset X</label>
                        <input type="range" id="shd-x" min="-50" max="50" value="10" class="w-full">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500">Offset Y</label>
                        <input type="range" id="shd-y" min="-50" max="50" value="10" class="w-full">
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500">Blur</label>
                        <input type="range" id="shd-b" min="0" max="100" value="20" class="w-full">
                    </div>
                    <div class="flex items-center justify-center">
                        <div id="shd-preview" class="w-32 h-32 bg-white rounded-lg"></div>
                    </div>
                </div>
                <div class="mt-12 p-6 bg-black border border-white/10 rounded-lg font-mono text-sm text-amber-500" id="shd-code"></div>
            </div>
        `;
        const update = () => {
            const x = document.getElementById('shd-x').value;
            const y = document.getElementById('shd-y').value;
            const b = document.getElementById('shd-b').value;
            const style = `${x}px ${y}px ${b}px rgba(0,0,0,0.5)`;
            document.getElementById('shd-preview').style.boxShadow = style;
            document.getElementById('shd-code').innerText = `box-shadow: ${style};`;
        };
        ['shd-x', 'shd-y', 'shd-b'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderRadius() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Border Radius</h2>
                <input type="range" id="rad-val" min="0" max="100" value="20" class="w-full mb-12">
                <div class="flex justify-center mb-12">
                    <div id="rad-preview" class="w-48 h-48 bg-white border border-black/10 shadow-xl" style="border-radius: 20px"></div>
                </div>
                <div class="p-6 bg-zinc-900 border border-white/10 rounded-lg font-mono text-white" id="rad-code">border-radius: 20px;</div>
            </div>
        `;
        document.getElementById('rad-val').oninput = (e) => {
            const val = e.target.value + 'px';
            document.getElementById('rad-preview').style.borderRadius = val;
            document.getElementById('rad-code').innerText = `border-radius: ${val};`;
        };
    }

    renderFlex() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Flexbox Yield</h2>
                <div class="flex gap-4 justify-center mb-8">
                    <select id="flx-dir" class="bg-black border border-white/10 p-3 rounded-lg text-white font-mono">
                        <option value="row">Row</option>
                        <option value="column">Column</option>
                    </select>
                    <select id="flx-just" class="bg-black border border-white/10 p-3 rounded-lg text-white font-mono">
                        <option value="center">Center</option>
                        <option value="space-between">Space Between</option>
                        <option value="flex-start">Start</option>
                    </select>
                </div>
                <div id="flx-preview" class="h-64 bg-white/5 border border-white/10 rounded-lg flex p-4 gap-4">
                    <div class="w-16 h-16 bg-white/20 rounded"></div>
                    <div class="w-16 h-16 bg-white/20 rounded"></div>
                    <div class="w-16 h-16 bg-white/20 rounded"></div>
                </div>
            </div>
        `;
        const update = () => {
            const dir = document.getElementById('flx-dir').value;
            const just = document.getElementById('flx-just').value;
            const preview = document.getElementById('flx-preview');
            preview.style.flexDirection = dir;
            preview.style.justifyContent = just;
        };
        ['flx-dir', 'flx-just'].forEach(id => document.getElementById(id).onchange = update);
        update();
    }

    renderGradients() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Gradient Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <input type="color" id="grd-c1" value="#ff0000" class="w-full h-12 bg-transparent">
                    <input type="color" id="grd-c2" value="#0000ff" class="w-full h-12 bg-transparent">
                </div>
                <div id="grd-preview" class="h-48 rounded-2xl border border-white/10 mb-8" style="background: linear-gradient(90deg, #ff0000, #0000ff)"></div>
                <div id="grd-code" class="p-6 bg-zinc-900 border border-white/10 rounded-lg font-mono text-xs text-white break-all">background: linear-gradient(90deg, #ff0000, #0000ff);</div>
            </div>
        `;
        const update = () => {
            const c1 = document.getElementById('grd-c1').value;
            const c2 = document.getElementById('grd-c2').value;
            const rule = `linear-gradient(90deg, ${c1}, ${c2})`;
            document.getElementById('grd-preview').style.background = rule;
            document.getElementById('grd-code').innerText = `background: ${rule};`;
        };
        ['grd-c1', 'grd-c2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderTxtShadow() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Text Shadow</h2>
                <input type="range" id="txs-val" min="0" max="20" value="5" class="w-full mb-12">
                <div id="txs-preview" class="text-6xl font-black text-white mb-12" style="text-shadow: 5px 5px 0px rgba(255,255,255,0.2)">O M N I</div>
            </div>
        `;
        document.getElementById('txs-val').oninput = (e) => {
            const val = e.target.value + 'px';
            document.getElementById('txs-preview').style.textShadow = `${val} ${val} 0px rgba(255,255,255,0.2)`;
        };
    }

    renderOpacity() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Opacity Forge</h2>
                <input type="range" id="op-val" min="0" max="100" value="50" class="w-full mb-12">
                <div class="flex justify-center mb-12">
                    <div id="op-preview" class="w-48 h-48 bg-white" style="opacity: 0.5"></div>
                </div>
                <div id="op-code" class="p-6 bg-zinc-900 border border-white/10 rounded-lg font-mono text-white">opacity: 0.5;</div>
            </div>
        `;
        document.getElementById('op-val').oninput = (e) => {
            const val = e.target.value / 100;
            document.getElementById('op-preview').style.opacity = val;
            document.getElementById('op-code').innerText = `opacity: ${val};`;
        };
    }

    renderWSCount() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Whitespace Count</h2>
                <textarea id="wsc-in" placeholder="Count spaces in data..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <div class="p-8 bg-white/5 border border-white/5 rounded-lg">
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Space Segments Detected</div>
                    <div id="wsc-res" class="text-6xl font-bold font-mono text-white">0</div>
                </div>
            </div>
        `;
        document.getElementById('wsc-in').oninput = (e) => {
            document.getElementById('wsc-res').innerText = (e.target.value.match(/ /g) || []).length;
        };
    }

    renderScramble() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Word Scrambler</h2>
                <textarea id="scr-in" placeholder="Scramble word order..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <button id="scr-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Scrambling</button>
            </div>
        `;
        document.getElementById('scr-btn').onclick = () => {
            const input = document.getElementById('scr-in');
            const words = input.value.split(/\s+/);
            for (let i = words.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [words[i], words[j]] = [words[j], words[i]];
            }
            input.value = words.join(' ');
        };
    }

    renderAnagram() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Anagram Audit</h2>
                <div class="space-y-4 mb-12">
                    <input type="text" id="ana-1" placeholder="String Alpha" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    <input type="text" id="ana-2" placeholder="String Beta" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                </div>
                <div id="ana-res" class="text-sm uppercase tracking-[0.5em] text-stone-500">Awaiting character densities...</div>
            </div>
        `;
        const update = () => {
            const s1 = document.getElementById('ana-1').value.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
            const s2 = document.getElementById('ana-2').value.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
            const res = document.getElementById('ana-res');
            if (!s1 || !s2) { res.innerText = "Awaiting character densities..."; res.className = "text-sm uppercase tracking-[0.5em] text-stone-500"; }
            else if (s1 === s2) { res.innerText = "Positive Match. Anagram confirmed."; res.className = "text-sm uppercase tracking-[0.5em] text-green-400"; }
            else { res.innerText = "Negative Match. No alignment."; res.className = "text-sm uppercase tracking-[0.5em] text-red-500"; }
        };
        ['ana-1', 'ana-2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderSort() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Line Sorter</h2>
                <textarea id="sort-in" placeholder="Lines to sort..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <div class="flex gap-4">
                    <button id="sort-asc" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Sort A-Z</button>
                    <button id="sort-desc" class="flex-1 py-4 bg-white/10 text-white border border-white/10 font-bold uppercase tracking-widest rounded-lg">Sort Z-A</button>
                </div>
            </div>
        `;
        const input = document.getElementById('sort-in');
        document.getElementById('sort-asc').onclick = () => {
            input.value = input.value.split('\n').sort().join('\n');
        };
        document.getElementById('sort-desc').onclick = () => {
            input.value = input.value.split('\n').sort().reverse().join('\n');
        };
    }

    renderWrap() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Word Wrapper</h2>
                <div class="flex gap-4 mb-4">
                    <input type="number" id="wrap-len" value="40" class="w-32 bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-center">
                    <button id="wrap-btn" class="flex-1 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Wrap</button>
                </div>
                <textarea id="wrap-in" placeholder="Payload to wrap..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono"></textarea>
            </div>
        `;
        document.getElementById('wrap-btn').onclick = () => {
            const len = parseInt(document.getElementById('wrap-len').value) || 40;
            const text = document.getElementById('wrap-in').value;
            const regex = new RegExp(`(.{1,${len}})(\\s|$)`, 'g');
            document.getElementById('wrap-in').value = text.match(regex).map(l => l.trim()).join('\n');
        };
    }

    renderEscape() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JSON Escape</h2>
                <textarea id="esc-in" placeholder="String to escape for JSON..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-lg text-left break-all font-mono text-sm text-amber-500" id="esc-out"></div>
            </div>
        `;
        document.getElementById('esc-in').oninput = (e) => {
            document.getElementById('esc-out').innerText = JSON.stringify(e.target.value);
        };
    }

    renderEmoji() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Emoji Pulse</h2>
                <div class="grid grid-cols-6 md:grid-cols-10 gap-2">
                    ${["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"].map(e => `
                        <div class="aspect-square flex items-center justify-center bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 cursor-pointer rounded transition-all text-2xl" onclick="navigator.clipboard.writeText('${e}'); if(window.toast) toast.success('Symbol captured.');">${e}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderMetro() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Metronome</h2>
                <input type="range" id="met-bpm" min="40" max="220" value="120" class="w-full mb-4">
                <div id="met-bpm-val" class="text-6xl font-black text-white font-mono mb-12">120 BPM</div>
                <div class="flex justify-center gap-4 mb-8">
                    <div id="met-node-1" class="w-8 h-8 rounded-full border border-white/20"></div>
                    <div id="met-node-2" class="w-8 h-8 rounded-full border border-white/20"></div>
                    <div id="met-node-3" class="w-8 h-8 rounded-full border border-white/20"></div>
                    <div id="met-node-4" class="w-8 h-8 rounded-full border border-white/20"></div>
                </div>
                <button id="met-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Initialize Pulse</button>
            </div>
        `;
        let playing = false;
        let interval;
        let step = 0;
        const btn = document.getElementById('met-btn');
        const bpmInput = document.getElementById('met-bpm');
        const bpmVal = document.getElementById('met-bpm-val');

        bpmInput.oninput = () => bpmVal.innerText = `${bpmInput.value} BPM`;

        btn.onclick = () => {
            playing = !playing;
            btn.innerText = playing ? "Terminate Pulse" : "Initialize Pulse";
            if (playing) {
                const tick = () => {
                    document.querySelectorAll('[id^="met-node-"]').forEach(n => n.classList.remove('bg-white'));
                    step = (step % 4) + 1;
                    document.getElementById(`met-node-${step}`).classList.add('bg-white');
                    interval = setTimeout(tick, (60 / bpmInput.value) * 1000);
                };
                tick();
            } else {
                clearTimeout(interval);
                document.querySelectorAll('[id^="met-node-"]').forEach(n => n.classList.remove('bg-white'));
            }
        };
    }



    renderFind() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Word Finder</h2>
                <div class="flex gap-4 mb-4">
                    <input type="text" id="find-query" placeholder="Search term..." class="flex-1 bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white focus:outline-none">
                    <div id="find-count" class="p-4 bg-white/5 border border-white/5 rounded-lg text-white font-mono min-w-[80px]">0</div>
                </div>
                <textarea id="find-in" placeholder="Data segment..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none"></textarea>
            </div>
        `;
        const input = document.getElementById('find-in');
        const query = document.getElementById('find-query');
        const count = document.getElementById('find-count');
        const update = () => {
            if (!query.value) { count.innerText = "0"; return; }
            const regex = new RegExp(query.value, 'gi');
            count.innerText = (input.value.match(regex) || []).length;
        };
        input.oninput = update;
        query.oninput = update;
    }

    renderMinify() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Code Minifier</h2>
                <textarea id="min-in" placeholder="Code to minify..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <button id="min-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Compression</button>
            </div>
        `;
        document.getElementById('min-btn').onclick = () => {
            const input = document.getElementById('min-in');
            input.value = input.value.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s+/g, ' ').trim();
        };
    }

    renderSQL() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">SQL Formatter</h2>
                <textarea id="sql-in" placeholder="SELECT * FROM table..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <button id="sql-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Formatting</button>
            </div>
        `;
        document.getElementById('sql-btn').onclick = () => {
            const input = document.getElementById('sql-in');
            input.value = input.value.replace(/\s+/g, ' ')
                .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|JOIN|LEFT|RIGHT|INNER|GROUP BY|ORDER BY|HAVING|LIMIT)\b/gi, '\n$1')
                .trim();
        };
    }

    renderCSS() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">CSS Formatter</h2>
                <textarea id="css-in" placeholder="body{color:white}..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <button id="css-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Formatting</button>
            </div>
        `;
        document.getElementById('css-btn').onclick = () => {
            const input = document.getElementById('css-in');
            input.value = input.value.replace(/\s+/g, ' ')
                .replace(/\{/g, ' {\n  ')
                .replace(/\}/g, '}\n')
                .replace(/\;/g, ';\n  ')
                .replace(/\n\s*\}/g, '\n}')
                .trim();
        };
    }

    renderJS() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JS Formatter</h2>
                <textarea id="js-in" placeholder="function(){return true}..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <button id="js-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Execute Formatting</button>
            </div>
        `;
        document.getElementById('js-btn').onclick = () => {
            const input = document.getElementById('js-in');
            input.value = input.value.replace(/\s+/g, ' ')
                .replace(/\{/g, ' {\n  ')
                .replace(/\}/g, '\n}\n')
                .replace(/\;/g, ';\n  ')
                .trim();
        };
    }

    renderXML() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">XML Validator</h2>
                <textarea id="xml-in" placeholder="<root><child>Data</child></root>..." class="w-full h-64 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-8"></textarea>
                <div id="xml-res" class="p-6 rounded-lg border border-white/5 text-[10px] uppercase tracking-widest text-stone-500">Awaiting XML segment...</div>
            </div>
        `;
        const input = document.getElementById('xml-in');
        const res = document.getElementById('xml-res');
        input.oninput = () => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(input.value, "application/xml");
            const error = doc.querySelector('parsererror');
            if (error) {
                res.innerText = `Invalid Protocol: ${error.textContent.split('\n')[0]}`;
                res.className = "p-6 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500";
            } else {
                res.innerText = "Protocol Valid. Structure satisfied.";
                res.className = "p-6 rounded-lg border border-green-500/20 bg-green-500/5 text-green-400";
            }
        };
    }

    renderY2J() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">YAML to JSON</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <textarea id="y2j-y" placeholder="key: value..." class="h-64 bg-black border border-white/10 p-4 font-mono text-white"></textarea>
                    <textarea id="y2j-j" readonly class="h-64 bg-white/5 border border-white/5 p-4 font-mono text-amber-500"></textarea>
                </div>
            </div>
        `;
        document.getElementById('y2j-y').oninput = (e) => {
            // Very simple YAML to JSON (key: value)
            const obj = {};
            e.target.value.split('\n').forEach(l => {
                const parts = l.split(':');
                if (parts.length === 2) obj[parts[0].trim()] = parts[1].trim();
            });
            document.getElementById('y2j-j').value = JSON.stringify(obj, null, 2);
        };
    }

    renderJ2Y() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JSON to YAML</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <textarea id="j2y-j" placeholder='{"key": "value"}' class="h-64 bg-black border border-white/10 p-4 font-mono text-white"></textarea>
                    <textarea id="j2y-y" readonly class="h-64 bg-white/5 border border-white/5 p-4 font-mono text-amber-500"></textarea>
                </div>
            </div>
        `;
        document.getElementById('j2y-j').oninput = (e) => {
            try {
                const obj = JSON.parse(e.target.value);
                let yaml = "";
                for (const [k, v] of Object.entries(obj)) yaml += `${k}: ${v}\n`;
                document.getElementById('j2y-y').value = yaml;
            } catch (ex) { }
        };
    }

    renderC2J() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">CSV to JSON</h2>
                <textarea id="c2j-in" placeholder="name,age\nabcl,25" class="w-full h-48 bg-black border border-white/10 p-6 mb-8 font-mono text-white"></textarea>
                <textarea id="c2j-out" readonly class="w-full h-48 bg-white/5 border border-white/5 p-6 font-mono text-amber-500"></textarea>
            </div>
        `;
        document.getElementById('c2j-in').oninput = (e) => {
            const lines = e.target.value.split('\n');
            const headers = lines[0].split(',');
            const res = lines.slice(1).map(l => {
                const vals = l.split(',');
                const obj = {};
                headers.forEach((h, i) => obj[h.trim()] = vals[i]?.trim());
                return obj;
            });
            document.getElementById('c2j-out').value = JSON.stringify(res, null, 2);
        };
    }

    renderJ2C() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JSON to CSV</h2>
                <textarea id="j2c-in" placeholder='[{"name":"abcl","age":25}]' class="w-full h-48 bg-black border border-white/10 p-6 mb-8 font-mono text-white"></textarea>
                <textarea id="j2c-out" readonly class="w-full h-48 bg-white/5 border border-white/5 p-6 font-mono text-amber-500"></textarea>
            </div>
        `;
        document.getElementById('j2c-in').oninput = (e) => {
            try {
                const arr = JSON.parse(e.target.value);
                const headers = Object.keys(arr[0]).join(',');
                const rows = arr.map(obj => Object.values(obj).join(',')).join('\n');
                document.getElementById('j2c-out').value = headers + '\n' + rows;
            } catch (ex) { }
        };
    }

    renderTTS() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Voice Forge</h2>
                <textarea id="tts-in" placeholder="Input linguistic payload for vocalization..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8"></textarea>
                <button id="tts-btn" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Vocalize Segment</button>
            </div>
        `;
        document.getElementById('tts-btn').onclick = () => {
            const utter = new SpeechSynthesisUtterance(document.getElementById('tts-in').value);
            window.speechSynthesis.speak(utter);
        };
    }

    renderSTT() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Voice Audit</h2>
                <button id="stt-btn" class="w-64 h-64 rounded-full border-4 border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center mb-8 mx-auto">
                    <span class="text-4xl text-white">🎙️</span>
                </button>
                <div id="stt-out" class="p-8 bg-zinc-900 border border-white/10 rounded-lg font-mono text-white min-h-[100px]">Awaiting biological vocalization...</div>
            </div>
        `;
        const btn = document.getElementById('stt-btn');
        const out = document.getElementById('stt-out');
        let active = false;
        const recognition = 'webkitSpeechRecognition' in window ? new webkitSpeechRecognition() : null;
        if (recognition) {
            recognition.continuous = true;
            recognition.onresult = (event) => {
                out.innerText = event.results[event.results.length - 1][0].transcript;
            };
        }
        btn.onclick = () => {
            if (!recognition) { out.innerText = "Protocol Unsupported."; return; }
            active = !active;
            if (active) { recognition.start(); btn.classList.add('border-red-500/50'); }
            else { recognition.stop(); btn.classList.remove('border-red-500/50'); }
        };
    }

    renderAmort() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Amortization</h2>
                <div class="grid grid-cols-3 gap-4 mb-8 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Principal</label>
                        <input type="number" id="am-p" value="10000" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Rate (%)</label>
                        <input type="number" id="am-r" value="5" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Years</label>
                        <input type="number" id="am-y" value="5" class="w-full bg-black border border-white/10 p-3 rounded-lg text-white font-mono">
                    </div>
                </div>
                <div id="am-res" class="text-left space-y-1 font-mono text-[10px] text-stone-500 h-64 overflow-y-auto bg-black p-4 border border-white/10"></div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('am-p').value);
            const r = parseFloat(document.getElementById('am-r').value) / 1200;
            const n = parseInt(document.getElementById('am-y').value) * 12;
            const pmt = (p * r) / (1 - Math.pow(1 + r, -n));
            let balance = p;
            let html = "";
            for (let i = 1; i <= n; i++) {
                const interest = balance * r;
                const principal = pmt - interest;
                balance -= principal;
                html += `<div>Mo ${i}: Pmt $${pmt.toFixed(2)} | Int $${interest.toFixed(2)} | Bal $${Math.max(0, balance).toFixed(2)}</div>`;
            }
            document.getElementById('am-res').innerHTML = html;
        };
        ['am-p', 'am-r', 'am-y'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderSavings() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Savings Goal</h2>
                <div class="space-y-4 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Target Amount ($)</label>
                        <input type="number" id="sav-t" value="10000" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-xl">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Monthly Contribution</label>
                        <input type="number" id="sav-c" value="500" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-xl">
                    </div>
                </div>
                <div class="mt-8 p-12 bg-white/5 border border-white/5 rounded-2xl">
                    <div id="sav-res" class="text-6xl font-black text-white">20</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Months to Alignment</div>
                </div>
            </div>
        `;
        const update = () => {
            const t = parseFloat(document.getElementById('sav-t').value);
            const c = parseFloat(document.getElementById('sav-c').value);
            document.getElementById('sav-res').innerText = c > 0 ? Math.ceil(t / c) : '∞';
        };
        ['sav-t', 'sav-c'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderProfit() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Profit Margin</h2>
                <div class="grid grid-cols-2 gap-4 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Cost ($)</label>
                        <input type="number" id="prof-c" value="50" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Revenue ($)</label>
                        <input type="number" id="prof-r" value="100" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                </div>
                <div class="mt-8 p-12 border border-white/10 rounded-2xl">
                    <div id="prof-res" class="text-6xl font-black text-green-400">50%</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Net Efficiency Yield</div>
                </div>
            </div>
        `;
        const update = () => {
            const c = parseFloat(document.getElementById('prof-c').value);
            const r = parseFloat(document.getElementById('prof-r').value);
            const margin = ((r - c) / r) * 100;
            document.getElementById('prof-res').innerText = `${margin.toFixed(1)}%`;
        };
        ['prof-c', 'prof-r'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderRetire() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Retirement</h2>
                <div class="space-y-4 text-left">
                    <label class="block text-[10px] uppercase tracking-widest text-stone-500">Desired Annual Income</label>
                    <input type="number" id="ret-i" value="60000" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-2xl">
                </div>
                <div class="mt-8 p-12 bg-white text-black rounded-2xl">
                    <div id="ret-res" class="text-4xl font-black">$1.5M</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-600 mt-2">Total Capital Nest Required (4% Rule)</div>
                </div>
            </div>
        `;
        document.getElementById('ret-i').oninput = (e) => {
            const nest = parseFloat(e.target.value) * 25;
            document.getElementById('ret-res').innerText = `$${(nest / 1000000).toFixed(2)}M`;
        };
    }

    renderMortgage() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Mortgage Logic</h2>
                <div class="grid grid-cols-2 gap-4 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Home Price</label>
                        <input type="number" id="mort-p" value="300000" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Interest Rate (%)</label>
                        <input type="number" id="mort-r" value="6" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                </div>
                <div class="mt-8 p-12 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="mort-res" class="text-5xl font-black text-white">$1,798</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Monthly Principal & Interest</div>
                </div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('mort-p').value);
            const r = parseFloat(document.getElementById('mort-r').value) / 1200;
            const n = 360; // 30yr
            const pmt = (p * r) / (1 - Math.pow(1 + r, -n));
            document.getElementById('mort-res').innerText = `$${Math.round(pmt).toLocaleString()}`;
        };
        ['mort-p', 'mort-r'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderLoanTerm() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Loan Term</h2>
                <div class="space-y-4 text-left">
                    <label class="block text-[10px] uppercase tracking-widest text-stone-500">Total Payments</label>
                    <input type="number" id="loan-n" value="60" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono text-xl">
                </div>
                <div class="mt-8 p-8 border border-white/10 rounded-lg">
                    <div id="loan-res" class="text-4xl text-white font-mono">5.0 Years</div>
                </div>
            </div>
        `;
        document.getElementById('loan-n').oninput = (e) => {
            document.getElementById('loan-res').innerText = `${(e.target.value / 12).toFixed(1)} Years`;
        };
    }

    renderFuel() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Fuel Audit</h2>
                <div class="grid grid-cols-2 gap-4 text-left">
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Distance (mi)</label>
                        <input type="number" id="fuel-d" value="100" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Fuel Efficiency (MPG)</label>
                        <input type="number" id="fuel-m" value="25" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono">
                    </div>
                </div>
                <div class="mt-8 p-8 border border-white/10 rounded-lg bg-white/5">
                    <div id="fuel-res" class="text-4xl text-white font-mono">4.0 Gallons</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Energy Requirement</div>
                </div>
            </div>
        `;
        const update = () => {
            const d = parseFloat(document.getElementById('fuel-d').value);
            const m = parseFloat(document.getElementById('fuel-m').value);
            document.getElementById('fuel-res').innerText = `${(d / m).toFixed(1)} Gallons`;
        };
        ['fuel-d', 'fuel-m'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderPassCheck() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Cipher Check</h2>
                <input type="password" id="chk-in" placeholder="Enter cipher string..." class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-8 text-2xl tracking-widest">
                <div class="grid grid-cols-3 gap-4">
                    <div id="chk-l" class="p-4 rounded-lg border border-white/5 opacity-50">Length</div>
                    <div id="chk-n" class="p-4 rounded-lg border border-white/5 opacity-50">Numbers</div>
                    <div id="chk-s" class="p-4 rounded-lg border border-white/5 opacity-50">Symbols</div>
                </div>
            </div>
        `;
        document.getElementById('chk-in').oninput = (e) => {
            const v = e.target.value;
            const l = document.getElementById('chk-l');
            const n = document.getElementById('chk-n');
            const s = document.getElementById('chk-s');

            l.className = v.length >= 8 ? "p-4 rounded-lg border border-green-500/20 bg-green-500/5 text-green-400 font-bold" : "p-4 rounded-lg border border-white/5 opacity-50";
            n.className = /\d/.test(v) ? "p-4 rounded-lg border border-green-500/20 bg-green-500/5 text-green-400 font-bold" : "p-4 rounded-lg border border-white/5 opacity-50";
            s.className = /[^A-Za-z0-9]/.test(v) ? "p-4 rounded-lg border border-green-500/20 bg-green-500/5 text-green-400 font-bold" : "p-4 rounded-lg border border-white/5 opacity-50";
        };
    }

    renderJWT() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest text-center">JWT Audit</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <textarea id="jwt-in" placeholder="Encoded JWT..." class="w-full h-96 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none"></textarea>
                    <div id="jwt-out" class="w-full h-96 bg-zinc-900/50 border border-white/10 p-6 rounded-lg overflow-y-auto font-mono text-sm">
                        <div class="text-stone-500 italic">Deconstructed payload will appear here...</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('jwt-in').oninput = (e) => {
            const out = document.getElementById('jwt-out');
            try {
                const parts = e.target.value.split('.');
                if (parts.length !== 3) throw new Error("Invalid structure.");
                const header = JSON.parse(atob(parts[0]));
                const payload = JSON.parse(atob(parts[1]));
                out.innerHTML = `
                    <div class="mb-6"><div class="text-[10px] uppercase text-red-400 mb-2">Header</div><pre class="bg-black/40 p-4 rounded border border-red-500/20">${JSON.stringify(header, null, 2)}</pre></div>
                    <div><div class="text-[10px] uppercase text-purple-400 mb-2">Payload</div><pre class="bg-black/40 p-4 rounded border border-purple-500/20">${JSON.stringify(payload, null, 2)}</pre></div>
                `;
            } catch (e) { out.innerHTML = `<span class="text-red-500 font-bold">Error: ${e.message}</span>`; }
        };
    }

    renderXSS() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">XSS Purge</h2>
                <textarea id="xss-in" placeholder="Insecure payload..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white focus:outline-none mb-4"></textarea>
                <textarea id="xss-out" readonly placeholder="Sanitized protocol..." class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded-lg text-stone-400 font-mono italic"></textarea>
            </div>
        `;
        document.getElementById('xss-in').oninput = (e) => {
            document.getElementById('xss-out').value = e.target.value.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
        };
    }

    renderRegex() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Regex Pulse</h2>
                <div class="space-y-4">
                    <input type="text" id="reg-p" placeholder="Pattern (e.g. [a-z]+)..." class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono focus:border-white">
                    <textarea id="reg-t" placeholder="Test string..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono focus:border-white"></textarea>
                    <div id="reg-r" class="p-6 bg-white/5 border border-white/10 rounded-lg text-left font-mono"></div>
                </div>
            </div>
        `;
        const update = () => {
            const p = document.getElementById('reg-p').value;
            const t = document.getElementById('reg-t').value;
            const r = document.getElementById('reg-r');
            try {
                const re = new RegExp(p, 'g');
                const matches = [...t.matchAll(re)];
                r.innerHTML = matches.length > 0 ? `<span class="text-green-400">Found ${matches.length} matches:</span><br>` + matches.map(m => m[0]).join(', ') : '<span class="text-stone-500 italic">No matches detected.</span>';
            } catch (e) { r.innerHTML = '<span class="text-red-500">Invalid Projection.</span>'; }
        };
        ['reg-p', 'reg-t'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderDiff() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest text-center">Diff Engine</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <textarea id="dif-1" placeholder="Original protocol..." class="h-64 bg-black border border-white/10 p-4 rounded-lg text-white font-mono"></textarea>
                    <textarea id="dif-2" placeholder="Modified protocol..." class="h-64 bg-black border border-white/10 p-4 rounded-lg text-white font-mono"></textarea>
                </div>
                <div id="dif-r" class="p-6 bg-white/5 border border-white/10 rounded-lg font-mono text-sm whitespace-pre"></div>
            </div>
        `;
        const update = () => {
            const s1 = document.getElementById('dif-1').value.split('\n');
            const s2 = document.getElementById('dif-2').value.split('\n');
            let res = '';
            const max = Math.max(s1.length, s2.length);
            for (let i = 0; i < max; i++) {
                if (s1[i] === s2[i]) res += `<div class="text-stone-600">${s1[i] || ''}</div>`;
                else res += `<div class="bg-red-900/20 text-red-500">- ${s1[i] || ''}</div><div class="bg-green-900/20 text-green-500">+ ${s2[i] || ''}</div>`;
            }
            document.getElementById('dif-r').innerHTML = res || '<span class="text-stone-500">Perfect alignment.</span>';
        };
        ['dif-1', 'dif-2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderCron() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Cron Logic</h2>
                <input type="text" id="cro-in" value="* * * * *" class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono text-center text-3xl mb-8">
                <div id="cro-out" class="p-8 border border-white/10 rounded-2xl bg-zinc-900 text-stone-400 italic">"Every minute of every day."</div>
            </div>
        `;
        document.getElementById('cro-in').oninput = (e) => {
            const v = e.target.value.split(' ');
            if (v.length !== 5) { document.getElementById('cro-out').innerText = "Invalid temporal structure."; return; }
            document.getElementById('cro-out').innerText = `Minute: ${v[0]}, Hour: ${v[1]}, Day: ${v[2]}, Month: ${v[3]}, WkDay: ${v[4]}`;
        };
    }

    renderSitemap() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Sitemap Forge</h2>
                <textarea id="sit-in" placeholder="URLs (one per line)..." class="w-full h-48 bg-black border border-white/10 p-6 rounded-lg text-white font-mono mb-4"></textarea>
                <textarea id="sit-out" readonly class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded-lg text-stone-400 font-mono text-xs"></textarea>
            </div>
        `;
        document.getElementById('sit-in').oninput = (e) => {
            const urls = e.target.value.split('\n').filter(u => u.trim());
            let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
            urls.forEach(u => xml += `  <url><loc>${u.trim()}</loc><priority>0.8</priority></url>\n`);
            xml += '</urlset>';
            document.getElementById('sit-out').value = xml;
        };
    }

    renderRobots() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Robots Protocol</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Agent</label><input id="rob-a" value="*" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Disallow</label><input id="rob-d" value="/admin" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <textarea id="rob-out" readonly class="w-full h-32 bg-white/5 border border-white/10 p-6 rounded-lg text-white font-mono"></textarea>
            </div>
        `;
        const update = () => {
            const a = document.getElementById('rob-a').value;
            const d = document.getElementById('rob-d').value;
            document.getElementById('rob-out').value = `User-agent: ${a}\nDisallow: ${d}\nSitemap: https://yoursite.com/sitemap.xml`;
        };
        ['rob-a', 'rob-d'].forEach(id => document.getElementById(id).oninput = update);
        update();
    }

    renderMatrix() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Matrix Engine</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <textarea id="mat-1" class="h-32 bg-black border border-white/10 p-4 rounded text-white font-mono" placeholder="1 2\n3 4"></textarea>
                    <textarea id="mat-2" class="h-32 bg-black border border-white/10 p-4 rounded text-white font-mono" placeholder="5 6\n7 8"></textarea>
                </div>
                <div id="mat-r" class="p-8 border border-white/10 rounded-2xl bg-zinc-900 font-mono text-xl">Result Matrix</div>
            </div>
        `;
        const update = () => {
            try {
                const m1 = document.getElementById('mat-1').value.split('\n').map(r => r.trim().split(/\s+/).map(Number));
                const m2 = document.getElementById('mat-2').value.split('\n').map(r => r.trim().split(/\s+/).map(Number));
                const res = m1.map((r, i) => r.map((v, j) => v + (m2[i][j] || 0)));
                document.getElementById('mat-r').innerText = res.map(r => r.join(' ')).join('\n');
            } catch (e) { document.getElementById('mat-r').innerText = "Improper dimensions."; }
        };
        ['mat-1', 'mat-2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderGeometry() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Geometry Pulse</h2>
                <select id="geo-s" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white mb-8">
                    <option value="sphere">Sphere Volume</option>
                    <option value="cylinder">Cylinder Volume</option>
                    <option value="cube">Cube Volume</option>
                </select>
                <input type="number" id="geo-v" value="5" class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono text-center text-3xl mb-8">
                <div id="geo-r" class="p-8 border border-white/10 rounded-2xl bg-white text-black text-4xl font-bold">523.6</div>
            </div>
        `;
        const update = () => {
            const s = document.getElementById('geo-s').value;
            const v = parseFloat(document.getElementById('geo-v').value);
            let res = 0;
            if (s === 'sphere') res = (4 / 3) * Math.PI * Math.pow(v, 3);
            if (s === 'cylinder') res = Math.PI * Math.pow(v, 2) * v; // assume height = radius
            if (s === 'cube') res = Math.pow(v, 3);
            document.getElementById('geo-r').innerText = res.toFixed(1);
        };
        ['geo-s', 'geo-v'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderContrast() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Contrast Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Foreground</label><input type="color" id="con-f" value="#ffffff" class="w-full h-12 bg-transparent border-none"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Background</label><input type="color" id="con-b" value="#000000" class="w-full h-12 bg-transparent border-none"></div>
                </div>
                <div id="con-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900">
                    <div class="text-6xl font-black mb-2">21.0</div>
                    <div class="text-[10px] uppercase tracking-[0.5em] text-green-500">Protocol: PASS (AAA)</div>
                </div>
            </div>
        `;
        // Basic luminosity calculation for contrast
        const lum = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16) / 255;
            const g = parseInt(hex.slice(3, 5), 16) / 255;
            const b = parseInt(hex.slice(5, 7), 16) / 255;
            const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        };
        const update = () => {
            const l1 = lum(document.getElementById('con-f').value);
            const l2 = lum(document.getElementById('con-b').value);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            document.getElementById('con-r').innerHTML = `<div class="text-6xl font-black mb-2">${ratio.toFixed(1)}</div><div class="text-[10px] uppercase tracking-[0.5em] ${ratio >= 4.5 ? 'text-green-500' : 'text-red-500'}">Protocol: ${ratio >= 4.5 ? 'PASS' : 'FAIL'}</div>`;
        };
        ['con-f', 'con-b'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderBlindness() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Blindness Pulse</h2>
                <select id="bli-s" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white mb-8">
                    <option value="none">Normal Perception</option>
                    <option value="protanopia">Protanopia (No Red)</option>
                    <option value="deuteranopia">Deuteranopia (No Green)</option>
                    <option value="tritanopia">Tritanopia (No Blue)</option>
                    <option value="achromatopsia">Achromatopsia (No Color)</option>
                </select>
                <div id="bli-p" class="w-full h-64 rounded-2xl overflow-hidden relative shadow-2xl">
                    <div class="absolute inset-0 bg-gradient-to-tr from-red-500 via-green-500 to-blue-500"></div>
                    <div class="absolute inset-x-0 bottom-0 p-8 bg-black/50 backdrop-blur-md text-white font-bold uppercase tracking-widest">Sample Spectrum Analysis</div>
                </div>
            </div>
        `;
        document.getElementById('bli-s').onchange = (e) => {
            const filters = {
                none: 'none',
                protanopia: 'grayscale(1) sepia(0.5) hue-rotate(-30deg)',
                deuteranopia: 'grayscale(1) sepia(0.5) hue-rotate(30deg)',
                tritanopia: 'grayscale(1) sepia(0.5) hue-rotate(180deg)',
                achromatopsia: 'grayscale(1)'
            };
            document.getElementById('bli-p').style.filter = filters[e.target.value];
        };
    }

    renderPhonetic() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Phonetic Signal</h2>
                <input type="text" id="pho-in" placeholder="Transmission code..." class="w-full bg-black border border-white/10 p-6 rounded-lg text-white font-mono text-center text-3xl mb-8">
                <div id="pho-out" class="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] uppercase font-bold text-stone-500"></div>
            </div>
        `;
        const map = { A: 'Alpha', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf', H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November', O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform', V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu' };
        document.getElementById('pho-in').oninput = (e) => {
            const res = e.target.value.toUpperCase().split('').map(c => `<div class="p-2 border border-white/5 rounded ${map[c] ? 'text-white border-white/20' : ''}">${map[c] || c}</div>`).join('');
            document.getElementById('pho-out').innerHTML = res;
        };
    }

    renderSleep() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Sleep Pulse</h2>
                <label class="block text-[10px] uppercase text-stone-500 mb-2">Desired Wake Time</label>
                <input type="time" id="sle-w" value="07:00" class="w-full bg-black border border-white/10 p-6 rounded-lg text-white text-4xl mb-8 text-center">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-xl">
                        <div class="text-[10px] uppercase text-stone-500 mb-1">90min Cycles</div>
                        <div id="sle-o1" class="text-xl font-bold text-white font-mono">22:00</div>
                    </div>
                     <div class="p-6 bg-white/5 border border-white/5 rounded-xl">
                        <div class="text-[10px] uppercase text-stone-500 mb-1">Efficient Yield</div>
                        <div id="sle-o2" class="text-xl font-bold text-white font-mono">23:30</div>
                    </div>
                </div>
            </div>
        `;
        const update = () => {
            const w = document.getElementById('sle-w').value.split(':');
            const date = new Date(); date.setHours(w[0], w[1], 0);
            const d1 = new Date(date.getTime() - (9 * 60 * 60 * 1000));
            const d2 = new Date(date.getTime() - (7.5 * 60 * 60 * 1000));
            document.getElementById('sle-o1').innerText = d1.toTimeString().slice(0, 5);
            document.getElementById('sle-o2').innerText = d2.toTimeString().slice(0, 5);
        };
        document.getElementById('sle-w').oninput = update;
        update();
    }

    renderCalories() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Calorie Yield</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="cal-w" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Duration (min)</label><input id="cal-d" type="number" value="30" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <select id="cal-s" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white mb-8">
                    <option value="8">High Intensity (Run)</option>
                    <option value="4">Moderate (Walk)</option>
                    <option value="10">Aggressive Training</option>
                </select>
                <div id="cal-r" class="p-12 border border-white/10 rounded-2xl bg-orange-500/10 text-orange-500">
                    <div class="text-6xl font-black mb-2">280</div>
                    <div class="text-[10px] uppercase tracking-[0.5em]">Liters of Biological Fuel Expended</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('cal-w').value);
            const d = parseFloat(document.getElementById('cal-d').value);
            const met = parseFloat(document.getElementById('cal-s').value);
            const burn = (met * 3.5 * w) / 200 * d;
            document.getElementById('cal-r').querySelector('.font-black').innerText = Math.round(burn);
        };
        ['cal-w', 'cal-d', 'cal-s'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderProfitPulse() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Profit Pulse</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Entry Price</label><input id="pro-e" type="number" value="100" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Exit Price</label><input id="pro-x" type="number" value="150" class="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-mono"></div>
                </div>
                <div id="pro-r" class="mt-8 p-12 border border-white/10 rounded-2xl bg-green-500/20">
                    <div class="text-6xl font-black text-white">+50%</div>
                    <div class="text-[10px] uppercase tracking-[0.5em] text-green-400 mt-2">Capital Expansion Protocol</div>
                </div>
            </div>
        `;
        const update = () => {
            const e = parseFloat(document.getElementById('pro-e').value);
            const x = parseFloat(document.getElementById('pro-x').value);
            const yieldPerc = ((x - e) / e) * 100;
            document.getElementById('pro-r').querySelector('.text-6xl').innerText = (yieldPerc >= 0 ? '+' : '') + yieldPerc.toFixed(1) + '%';
            document.getElementById('pro-r').className = `mt-8 p-12 border border-white/10 rounded-2xl ${yieldPerc >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`;
        };
        ['pro-e', 'pro-x'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderMargin() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Margin Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Base Cost</label><input id="mar-c" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Margin (%)</label><input id="mar-m" type="number" value="30" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-8 border border-white/10 rounded-xl bg-zinc-900">
                    <div class="text-[10px] uppercase text-stone-500 mb-2">Required Selling Price</div>
                    <div id="mar-r" class="text-5xl font-bold text-white">$142.86</div>
                </div>
            </div>
        `;
        const update = () => {
            const c = parseFloat(document.getElementById('mar-c').value);
            const m = parseFloat(document.getElementById('mar-m').value) / 100;
            const price = c / (1 - m);
            document.getElementById('mar-r').innerText = `$${price.toFixed(2)}`;
        };
        ['mar-c', 'mar-m'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderSnowball() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Snowball Logic</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Debt Balance</label><input id="sno-b" type="number" value="5000" class="w-full bg-black border border-white/10 p-4 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Monthly Payment</label><input id="sno-p" type="number" value="250" class="w-full bg-black border border-white/10 p-4 rounded text-white"></div>
                </div>
                <div class="mt-8 p-10 border border-white/10 rounded-2xl bg-white text-black">
                    <div id="sno-r" class="text-5xl font-black">20</div>
                    <div class="text-[10px] uppercase tracking-widest font-bold">Billing Cycles to Sovereignty</div>
                </div>
            </div>
        `;
        const update = () => {
            const b = parseFloat(document.getElementById('sno-b').value);
            const p = parseFloat(document.getElementById('sno-p').value);
            document.getElementById('sno-r').innerText = p > 0 ? Math.ceil(b / p) : '∞';
        };
        ['sno-b', 'sno-p'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderPrivacy() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Privacy Protocol</h2>
                <button id="pri-g" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg mb-8 hover:bg-stone-200 transition-all">Regenerate Proxy Identity</button>
                <div id="pri-r" class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"></div>
            </div>
        `;
        const gen = () => {
            const names = ['Aegis-7', 'Cipher-X', 'Nova-Protocol', 'Oracle-1', 'Vector-9'];
            const domains = ['vault.io', 'anon.sh', 'ghost.net', 'proxy.org'];
            const id = Math.floor(1000 + Math.random() * 9000);
            const html = `
                <div class="p-6 border border-white/10 rounded bg-zinc-900"><div class="text-[10px] uppercase text-stone-500">Proxy Name</div><div class="text-xl text-white font-mono">${names[Math.floor(Math.random() * names.length)]}</div></div>
                <div class="p-6 border border-white/10 rounded bg-zinc-900"><div class="text-[10px] uppercase text-stone-500">Anon Email</div><div class="text-xl text-white font-mono">user_${id}@${domains[Math.floor(Math.random() * domains.length)]}</div></div>
            `;
            document.getElementById('pri-r').innerHTML = html;
        };
        document.getElementById('pri-g').onclick = gen;
        gen();
    }

    renderTimezone() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Timezone Pulse</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="p-6 border border-white/5 bg-white/5 rounded-2xl"><div class="text-[10px] text-stone-500 uppercase mb-2">London (UTC +0)</div><div id="tz-lon" class="text-2xl font-mono text-white">00:00</div></div>
                    <div class="p-6 border border-white/5 bg-white/5 rounded-2xl"><div class="text-[10px] text-stone-500 uppercase mb-2">New York (EDT)</div><div id="tz-nyc" class="text-2xl font-mono text-white">00:00</div></div>
                    <div class="p-6 border border-white/5 bg-white/5 rounded-2xl"><div class="text-[10px] text-stone-500 uppercase mb-2">Tokyo (JST)</div><div id="tz-tok" class="text-2xl font-mono text-white">00:00</div></div>
                </div>
            </div>
        `;
        const tick = () => {
            const now = new Date();
            const lon = document.getElementById('tz-lon');
            const nyc = document.getElementById('tz-nyc');
            const tok = document.getElementById('tz-tok');
            if (!lon || !nyc || !tok) return;
            lon.innerText = now.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour12: false });
            nyc.innerText = now.toLocaleTimeString('en-GB', { timeZone: 'America/New_York', hour12: false });
            tok.innerText = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour12: false });
        };
        const timer = setInterval(tick, 1000); tick();
        // Simple cleanup check (would need actual component lifecycle)
    }

    renderMetric() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Metric Pulse</h2>
                <div class="space-y-4 text-left">
                    <div>
                        <label class="text-[10px] uppercase text-stone-500">Value (Meters)</label>
                        <input id="met-v" type="number" value="1" class="w-full bg-black border border-white/10 p-4 rounded text-white text-2xl font-mono">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <div class="p-6 bg-white/5 border border-white/5 rounded-xl text-left">
                        <div class="text-[10px] uppercase text-stone-500 mb-1">Feet</div>
                        <div id="met-ft" class="text-xl font-bold text-white font-mono">3.28</div>
                    </div>
                    <div class="p-6 bg-white/5 border border-white/5 rounded-xl text-left">
                        <div class="text-[10px] uppercase text-stone-500 mb-1">Inches</div>
                        <div id="met-in" class="text-xl font-bold text-white font-mono">39.37</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('met-v').oninput = (e) => {
            const v = parseFloat(e.target.value) || 0;
            document.getElementById('met-ft').innerText = (v * 3.28084).toFixed(2);
            document.getElementById('met-in').innerText = (v * 39.3701).toFixed(2);
        };
    }

    renderAngle() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Angle Logic</h2>
                <div class="space-y-4 text-left">
                    <label class="text-[10px] uppercase text-stone-500">Degrees</label>
                    <input id="ang-d" type="number" value="180" class="w-full bg-black border border-white/10 p-6 rounded text-white text-4xl text-center">
                </div>
                <div class="mt-8 p-10 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="ang-r" class="text-5xl font-black text-white">3.141</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Radians Protocol</div>
                </div>
            </div>
        `;
        document.getElementById('ang-d').oninput = (e) => {
            document.getElementById('ang-r').innerText = (e.target.value * (Math.PI / 180)).toFixed(3);
        };
    }

    renderDataByte() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Data Byte Pulse</h2>
                <div class="space-y-4 text-left">
                    <label class="text-[10px] uppercase text-stone-500">Input (GB)</label>
                    <input id="dat-g" type="number" value="1" class="w-full bg-black border border-white/10 p-4 rounded text-white font-mono text-2xl">
                </div>
                <div class="grid grid-cols-2 gap-2 mt-8">
                    <div class="p-4 bg-white/5 border border-white/5 rounded text-left"><div class="text-[10px] uppercase text-stone-500">MB</div><div id="dat-m" class="font-mono">1024</div></div>
                    <div class="p-4 bg-white/5 border border-white/5 rounded text-left"><div class="text-[10px] uppercase text-stone-500">KB</div><div id="dat-k" class="font-mono">1048576</div></div>
                </div>
            </div>
        `;
        document.getElementById('dat-g').oninput = (e) => {
            const v = parseFloat(e.target.value) || 0;
            document.getElementById('dat-m').innerText = (v * 1024).toLocaleString();
            document.getElementById('dat-k').innerText = (v * 1024 * 1024).toLocaleString();
        };
    }

    renderReading() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Reading Pulse</h2>
                <textarea id="rea-in" placeholder="Linguistic payload..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-8 border border-white/5 bg-zinc-900 rounded-2xl">
                        <div id="rea-r" class="text-4xl font-bold">1 min</div>
                        <div class="text-[10px] uppercase text-stone-500">Reading Duration</div>
                    </div>
                    <div class="p-8 border border-white/5 bg-zinc-900 rounded-2xl">
                        <div id="rea-s" class="text-4xl font-bold">2 min</div>
                        <div class="text-[10px] uppercase text-stone-500">Speaking Duration</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('rea-in').oninput = (e) => {
            const words = e.target.value.trim().split(/\s+/).length;
            document.getElementById('rea-r').innerText = `${Math.ceil(words / 200)} min`;
            document.getElementById('rea-s').innerText = `${Math.ceil(words / 130)} min`;
        };
    }

    renderShuffle() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Shuffle Logic</h2>
                <textarea id="shu-in" placeholder="Lines to randomize..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <button id="shu-b" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg mb-4">Reorder Protocol</button>
                <textarea id="shu-out" readonly class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded text-stone-400 font-mono italic"></textarea>
            </div>
        `;
        document.getElementById('shu-b').onclick = () => {
            const lines = document.getElementById('shu-in').value.split('\n').filter(l => l.trim());
            for (let i = lines.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [lines[i], lines[j]] = [lines[j], lines[i]];
            }
            document.getElementById('shu-out').value = lines.join('\n');
        };
    }

    renderGrowth() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Growth Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Old Value</label><input id="gro-o" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">New Value</label><input id="gro-n" type="number" value="150" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div id="gro-r" class="p-12 border border-white/10 rounded-2xl bg-green-500/10 text-green-500">
                    <div class="text-6xl font-black">+50%</div>
                    <div class="text-[10px] uppercase tracking-widest font-bold">Variance Projection</div>
                </div>
            </div>
        `;
        const update = () => {
            const o = parseFloat(document.getElementById('gro-o').value);
            const n = parseFloat(document.getElementById('gro-n').value);
            const diff = ((n - o) / o) * 100;
            document.getElementById('gro-r').querySelector('.text-6xl').innerText = (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%';
        };
        ['gro-o', 'gro-n'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderBorrow() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Borrowing Power</h2>
                <div class="space-y-4 text-left">
                    <label class="text-[10px] uppercase text-stone-500">Max Monthly Payment ($)</label>
                    <input id="bor-p" type="number" value="2000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-4xl text-center">
                </div>
                <div class="mt-8 p-10 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="bor-r" class="text-5xl font-black text-white">$333,583</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Max Loan Amount (30yr @ 6%)</div>
                </div>
            </div>
        `;
        document.getElementById('bor-p').oninput = (e) => {
            const p = parseFloat(e.target.value) || 0;
            const r = 0.06 / 12; const n = 360;
            const loan = p * (1 - Math.pow(1 + r, -n)) / r;
            document.getElementById('bor-r').innerText = `$${Math.round(loan).toLocaleString()}`;
        };
    }

    renderAgeProgress() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Existence Progress</h2>
                <input type="number" id="age-p-in" value="25" class="w-full bg-black border border-white/10 p-6 rounded text-white text-center text-4xl mb-8">
                <div class="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div id="age-p-bar" class="h-full bg-gradient-to-r from-stone-800 to-white transition-all duration-1000 shadow-[0_0_15px_white]" style="width: 27.7%"></div>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-[0.5em] text-stone-500">Biological Mission: <span id="age-p-perc">27.7</span>% Complete</div>
            </div>
        `;
        document.getElementById('age-p-in').oninput = (e) => {
            const p = (e.target.value / 90) * 100;
            document.getElementById('age-p-bar').style.width = `${p}%`;
            document.getElementById('age-p-perc').innerText = p.toFixed(1);
        };
    }

    renderShadowText() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Shadow Text</h2>
                <div class="space-y-6">
                    <div id="sha-p" class="p-12 text-6xl font-black text-white bg-black border border-white/5 rounded-2xl" style="text-shadow: 2px 2px 10px rgba(0,0,0,0.5)">PHANTOM</div>
                    <div class="grid grid-cols-2 gap-4">
                        <input type="range" id="sha-x" min="-20" max="20" value="4" class="w-full accent-white">
                        <input type="range" id="sha-y" min="-20" max="20" value="4" class="w-full accent-white">
                    </div>
                    <div class="p-4 bg-zinc-900 border border-white/10 rounded font-mono text-xs text-stone-400" id="sha-code">text-shadow: 4px 4px 10px rgba(0,0,0,0.5);</div>
                </div>
            </div>
        `;
        const update = () => {
            const x = document.getElementById('sha-x').value;
            const y = document.getElementById('sha-y').value;
            const style = `${x}px ${y}px 10px rgba(255,255,255,0.3)`;
            document.getElementById('sha-p').style.textShadow = style;
            document.getElementById('sha-code').innerText = `text-shadow: ${style};`;
        };
        ['sha-x', 'sha-y'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderLinePurge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Line Purge</h2>
                <textarea id="lin-in" placeholder="Data block with breaks..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <textarea id="lin-out" readonly class="w-full h-32 bg-white/5 border border-white/10 p-6 rounded text-stone-400 font-mono italic"></textarea>
            </div>
        `;
        document.getElementById('lin-in').oninput = (e) => {
            document.getElementById('lin-out').value = e.target.value.replace(/\n/g, ' ');
        };
    }

    renderWSPurge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Whitespace Pulse</h2>
                <textarea id="ws-in" placeholder="String with spaces..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <textarea id="ws-out" readonly class="w-full h-32 bg-white/5 border border-white/10 p-6 rounded text-stone-400 font-mono italic"></textarea>
            </div>
        `;
        document.getElementById('ws-in').oninput = (e) => {
            document.getElementById('ws-out').value = e.target.value.replace(/\s/g, '');
        };
    }

    renderCapital() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Capital Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Shares (M)</label><input id="cap-s" type="number" value="10" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Price ($)</label><input id="cap-p" type="number" value="50" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-black">
                   <div class="text-[10px] uppercase text-stone-500 mb-2">Market Valuation</div>
                   <div id="cap-r" class="text-5xl font-black text-white">$500.0M</div>
                </div>
            </div>
        `;
        const update = () => {
            const res = parseFloat(document.getElementById('cap-s').value) * parseFloat(document.getElementById('cap-p').value);
            document.getElementById('cap-r').innerText = `$${res.toFixed(1)}M`;
        };
        ['cap-s', 'cap-p'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderROI() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Return Pivot</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Invested</label><input id="roi-i" type="number" value="1000" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Final Value</label><input id="roi-f" type="number" value="1500" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div id="roi-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 shadow-2xl">
                    <div class="text-6xl font-black text-white">50%</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Total Yield Return</div>
                </div>
            </div>
        `;
        const update = () => {
            const i = parseFloat(document.getElementById('roi-i').value);
            const f = parseFloat(document.getElementById('roi-f').value);
            document.getElementById('roi-r').querySelector('.text-6xl').innerText = `${(((f - i) / i) * 100).toFixed(1)}%`;
        };
        ['roi-i', 'roi-f'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderTDEE() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">TDEE Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="tde-w" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Activity Level</label>
                    <select id="tde-a" class="w-full bg-black border border-white/10 p-3 rounded">
                        <option value="1.2">Sedentary</option>
                        <option value="1.5">Moderate</option>
                        <option value="1.9">Elite Athlete</option>
                    </select></div>
                </div>
                <div class="p-12 border border-blue-500/20 rounded-2xl bg-blue-500/5">
                    <div id="tde-r" class="text-6xl font-black text-blue-400">2100</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Daily Maintenance Calories</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('tde-w').value);
            const a = parseFloat(document.getElementById('tde-a').value);
            const bmr = (10 * w) + 600; // Simplified
            document.getElementById('tde-r').innerText = Math.round(bmr * a);
        };
        ['tde-w', 'tde-a'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderFertility() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Fertility Pulse</h2>
                <label class="block text-[10px] uppercase text-stone-500 mb-2">Last Cycle Start</label>
                <input type="date" id="fer-d" class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8">
                <div id="fer-r" class="p-8 border border-white/10 rounded-xl bg-pink-500/10 text-pink-400 font-bold uppercase tracking-widest opacity-50">Select baseline date...</div>
            </div>
        `;
        document.getElementById('fer-d').oninput = (e) => {
            const date = new Date(e.target.value);
            if (isNaN(date.getTime())) return;
            const fertile = new Date(date.getTime() + (14 * 24 * 60 * 60 * 1000));
            document.getElementById('fer-r').innerText = `Peak Fertile Window: ${fertile.toDateString()}`;
            document.getElementById('fer-r').classList.remove('opacity-50');
        };
    }

    renderVAT() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">VAT Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Net Price</label><input id="vat-n" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">VAT (%)</label><input id="vat-p" type="number" value="20" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-zinc-900 shadow-2xl">
                    <div id="vat-r" class="text-6xl font-black text-white">$120.00</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Gross Pricing Protocol</div>
                </div>
            </div>
        `;
        const update = () => {
            const n = parseFloat(document.getElementById('vat-n').value);
            const p = parseFloat(document.getElementById('vat-p').value) / 100;
            document.getElementById('vat-r').innerText = `$${(n * (1 + p)).toFixed(2)}`;
        };
        ['vat-n', 'vat-p'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderDiscount() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Discount Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Original Price</label><input id="dis-p" type="number" value="200" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Discount (%)</label><input id="dis-d" type="number" value="15" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-green-500/20 rounded-2xl bg-green-500/5">
                    <div id="dis-r" class="text-6xl font-black text-white">$170.00</div>
                    <div class="text-[10px] uppercase tracking-widest text-green-500 mt-2">You Save: $30.00</div>
                </div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('dis-p').value);
            const d = parseFloat(document.getElementById('dis-d').value) / 100;
            const savings = p * d;
            document.getElementById('dis-r').innerText = `$${(p - savings).toFixed(2)}`;
            document.getElementById('dis-r').nextElementSibling.innerText = `You Save: $${savings.toFixed(2)}`;
        };
        ['dis-p', 'dis-d'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderTip() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Gratuity Logic</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Bill Total</label><input id="tip-t" type="number" value="50" class="w-full bg-black border border-white/10 p-4 rounded text-white font-mono"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Split Between</label><input id="tip-s" type="number" value="2" class="w-full bg-black border border-white/10 p-4 rounded text-white font-mono"></div>
                </div>
                <div class="mt-8 p-12 border border-white/5 bg-zinc-900 rounded-3xl">
                    <div id="tip-r" class="text-5xl font-black text-white">$30.00</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Per Human Coverage (20% Tip)</div>
                </div>
            </div>
        `;
        const update = () => {
            const t = parseFloat(document.getElementById('tip-t').value);
            const s = parseFloat(document.getElementById('tip-s').value);
            const total = t * 1.2;
            document.getElementById('tip-r').innerText = `$${(total / s).toFixed(2)}`;
        };
        ['tip-t', 'tip-s'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderHourly() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hourly Yield</h2>
                <input id="hou-a" type="number" value="60000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-center text-4xl mb-8">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-8 bg-white text-black rounded-2xl">
                        <div id="hou-h" class="text-4xl font-bold">$28.85</div>
                        <div class="text-[10px] uppercase font-bold">Per Hour</div>
                    </div>
                    <div class="p-8 border border-white/10 bg-zinc-900 rounded-2xl">
                        <div id="hou-m" class="text-4xl font-bold">$5,000</div>
                        <div class="text-[10px] uppercase text-stone-500">Per Month</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('hou-a').oninput = (e) => {
            const a = parseFloat(e.target.value) || 0;
            document.getElementById('hou-h').innerText = `$${(a / 2080).toFixed(2)}`;
            document.getElementById('hou-m').innerText = `$${Math.round(a / 12).toLocaleString()}`;
        };
    }

    renderBPM() {
        const container = document.getElementById('tool-content');
        let taps = [];
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">BPM Pulse</h2>
                <button id="bpm-tap" class="w-full h-64 bg-white/5 border-2 border-dashed border-white/20 rounded-3xl hover:bg-white/10 transition-all active:scale-95 flex flex-col items-center justify-center gap-4 group">
                    <div class="text-8xl font-black text-white group-active:text-blue-400" id="bpm-val">--</div>
                    <div class="text-[10px] uppercase tracking-[0.5em] text-stone-500">Tap Temporal Baseline</div>
                </button>
                <button id="bpm-res" class="mt-8 text-[10px] uppercase text-stone-600 hover:text-white transition-colors">Reset Protocol</button>
            </div>
        `;
        document.getElementById('bpm-tap').onclick = () => {
            const now = Date.now();
            taps.push(now);
            if (taps.length > 5) taps.shift();
            if (taps.length > 1) {
                const diffs = [];
                for (let i = 1; i < taps.length; i++) diffs.push(taps[i] - taps[i - 1]);
                const avg = diffs.reduce((a, b) => a + b) / diffs.length;
                document.getElementById('bpm-val').innerText = Math.round(60000 / avg);
            }
        };
        document.getElementById('bpm-res').onclick = () => { taps = []; document.getElementById('bpm-val').innerText = '--'; };
    }

    renderFreq() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Frequency Forge</h2>
                <select id="fre-n" class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8 text-center">
                    <option value="440">A4 (440Hz)</option>
                    <option value="261.63">C4 (261.6Hz)</option>
                    <option value="523.25">C5 (523.2Hz)</option>
                </select>
                <div class="p-12 border border-white/5 bg-zinc-900 rounded-2xl">
                    <div id="fre-r" class="text-6xl font-black text-white">440.0</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Acoustic Hertz Alignment</div>
                </div>
            </div>
        `;
        document.getElementById('fre-n').onchange = (e) => {
            document.getElementById('fre-r').innerText = e.target.value;
        };
    }

    renderAspect() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Aspect Logic</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Width</label><input id="asp-w" type="number" value="1920" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Height</label><input id="asp-h" type="number" value="1080" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-black">
                    <div id="asp-r" class="text-4xl font-bold text-white">16 : 9</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Reduced Dimensional Ratio</div>
                </div>
            </div>
        `;
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const update = () => {
            const w = parseInt(document.getElementById('asp-w').value);
            const h = parseInt(document.getElementById('asp-h').value);
            const common = gcd(w, h);
            document.getElementById('asp-r').innerText = `${w / common} : ${h / common}`;
        };
        ['asp-w', 'asp-h'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderLorem() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Lorem Forge</h2>
                <div class="flex gap-4 mb-8">
                    <input id="lor-n" type="number" value="3" class="w-24 bg-black border border-white/10 p-4 rounded text-white text-center">
                    <button id="lor-g" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:bg-stone-200">Synthesize Sentences</button>
                </div>
                <textarea id="lor-o" readonly class="w-full h-64 bg-white/5 border border-white/10 p-6 rounded text-stone-400 font-mono italic leading-loose"></textarea>
            </div>
        `;
        document.getElementById('lor-g').onclick = () => {
            const s = ["In the silence of the void, protocols align.", "Sovereignty is the ultimate human directive.", "Data streams flow through the cinematic noir of existence.", "Temporal coordinates shift as the mission expands.", "Digital atrophy must be met with absolute clarity."];
            let res = []; const n = document.getElementById('lor-n').value;
            for (let i = 0; i < n; i++) res.push(s[Math.floor(Math.random() * s.length)]);
            document.getElementById('lor-o').value = res.join(' ');
        };
    }

    renderKeyword() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Keyword Pulse</h2>
                <textarea id="key-in" placeholder="Payload for density audit..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div id="key-out" class="grid grid-cols-2 md:grid-cols-3 gap-2"></div>
            </div>
        `;
        document.getElementById('key-in').oninput = (e) => {
            const words = e.target.value.toLowerCase().match(/\w+/g) || [];
            const counts = {}; words.forEach(w => counts[w] = (counts[w] || 0) + 1);
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
            document.getElementById('key-out').innerHTML = sorted.map(([w, c]) => `
                <div class="p-4 border border-white/5 bg-zinc-900 rounded text-left">
                    <div class="text-[10px] text-stone-500 uppercase">${w}</div>
                    <div class="text-xl font-bold text-white">${c}</div>
                </div>
            `).join('');
        };
    }

    renderSlug() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Slug Forge</h2>
                <input id="slu-in" placeholder="Raw string payload..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-2xl mb-8 text-center">
                <div id="slu-out" class="p-8 border-2 border-dashed border-white/10 bg-white/5 rounded-2xl font-mono text-stone-500 italic">generated-slug-will-appear-here</div>
            </div>
        `;
        document.getElementById('slu-in').oninput = (e) => {
            document.getElementById('slu-out').innerText = e.target.value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        };
    }

    renderBinary() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Binary Signal</h2>
                <textarea id="bin-in" placeholder="Text to binary..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <textarea id="bin-out" readonly class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded text-blue-400 font-mono text-xs"></textarea>
            </div>
        `;
        document.getElementById('bin-in').oninput = (e) => {
            document.getElementById('bin-out').value = e.target.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        };
    }

    renderHex() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
             <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hex Signal</h2>
                <textarea id="hex-in" placeholder="Text to hex..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <textarea id="hex-out" readonly class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded text-purple-400 font-mono"></textarea>
            </div>
        `;
        document.getElementById('hex-in').oninput = (e) => {
            document.getElementById('hex-out').value = e.target.value.split('').map(c => c.charCodeAt(0).toString(16)).join(' ');
        };
    }

    renderMorse() {
        const container = document.getElementById('tool-content');
        const map = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----", " ": "/" };
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Morse Signal</h2>
                <input id="mor-in" placeholder="Signal text..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8 text-center uppercase">
                <div id="mor-out" class="p-12 bg-white/5 border border-white/10 rounded-2xl font-mono text-4xl tracking-[0.5em] text-white">... --- ...</div>
            </div>
        `;
        document.getElementById('mor-in').oninput = (e) => {
            document.getElementById('mor-out').innerText = e.target.value.toUpperCase().split('').map(c => map[c] || c).join(' ');
        };
    }

    renderCaesar() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Caesar Logic</h2>
                <div class="flex gap-4 mb-8">
                    <input id="cae-s" type="number" value="3" class="w-24 bg-black border border-white/10 p-4 rounded text-white text-center">
                    <input id="cae-in" placeholder="String to shift..." class="flex-1 bg-black border border-white/10 p-4 rounded text-white">
                </div>
                <div id="cae-out" class="p-8 border border-white/5 bg-zinc-900 rounded-2xl font-mono text-2xl text-stone-400 italic">Resulting Cipher</div>
            </div>
        `;
        document.getElementById('cae-in').oninput = () => {
            const s = parseInt(document.getElementById('cae-s').value);
            const v = document.getElementById('cae-in').value;
            document.getElementById('cae-out').innerText = v.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + s) % 26) + 65);
                if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + s) % 26) + 97);
                return c;
            }).join('');
        };
    }

    renderLogicGate() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Logic Gate</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <button class="gate-btn p-4 border border-white/10 rounded-lg hover:bg-white/5 active:bg-blue-500/20" data-op="AND">AND</button>
                    <button class="gate-btn p-4 border border-white/10 rounded-lg hover:bg-white/5" data-op="OR">OR</button>
                    <button class="gate-btn p-4 border border-white/10 rounded-lg hover:bg-white/5" data-op="XOR">XOR</button>
                    <button class="gate-btn p-4 border border-white/10 rounded-lg hover:bg-white/5" data-op="NOT">NOT</button>
                </div>
                <table id="log-t" class="w-full border-collapse border border-white/10 text-white font-mono">
                    <thead><tr class="bg-white/5"><th class="p-2 border border-white/10">A</th><th class="p-2 border border-white/10">B</th><th class="p-2 border border-white/10">OUT</th></tr></thead>
                    <tbody></tbody>
                </table>
            </div>
        `;
        const gen = (op) => {
            const body = document.querySelector('#log-t tbody');
            body.innerHTML = '';
            const rows = op === 'NOT' ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
            rows.forEach(r => {
                let res = 0;
                if (op === 'AND') res = r[0] && r[1];
                if (op === 'OR') res = r[0] || r[1];
                if (op === 'XOR') res = r[0] ^ r[1];
                if (op === 'NOT') res = r[0] ? 0 : 1;
                body.innerHTML += `<tr class="border border-white/10"><td class="p-2 border border-white/10">${r[0]}</td><td class="p-2 border border-white/10">${r[1] !== undefined ? r[1] : '-'}</td><td class="p-2 border border-white/10 font-bold ${res ? 'text-green-400' : 'text-red-400'}">${res}</td></tr>`;
            });
        };
        document.querySelectorAll('.gate-btn').forEach(b => b.onclick = () => gen(b.dataset.op));
        gen('AND');
    }

    renderClamp() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Clamp Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Min (px)</label><input id="cla-min" type="number" value="16" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Max (px)</label><input id="cla-max" type="number" value="48" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-8 border-2 border-dashed border-white/10 bg-zinc-900 rounded-2xl font-mono text-blue-400 text-sm" id="cla-out">clamp(1rem, 5vw, 3rem)</div>
            </div>
        `;
        const update = () => {
            const min = document.getElementById('cla-min').value;
            const max = document.getElementById('cla-max').value;
            const res = `clamp(${min}px, 5vw, ${max}px)`;
            document.getElementById('cla-out').innerText = res;
        };
        ['cla-min', 'cla-max'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderFavicon() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Favicon Forge</h2>
                <input id="fav-i" value="🎭" class="w-full bg-black border border-white/10 p-10 rounded-full text-center text-8xl mb-8">
                <button id="fav-d" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_white] transition-all">Extract Icon Protocol</button>
                <canvas id="fav-c" width="32" height="32" class="hidden"></canvas>
            </div>
        `;
        document.getElementById('fav-d').onclick = () => {
            const canvas = document.getElementById('fav-c');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, 32, 32);
            ctx.font = '24px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(document.getElementById('fav-i').value, 16, 18);
            const link = document.createElement('a');
            link.download = 'favicon.png';
            link.href = canvas.toDataURL();
            link.click();
        };
    }

    renderImage64() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Image Signal</h2>
                <div class="p-12 border-2 border-dashed border-white/10 bg-white/5 rounded-3xl hover:border-white/40 transition-all cursor-pointer relative group" id="img-drop">
                    <input type="file" id="img-f" class="absolute inset-0 opacity-0 cursor-pointer">
                    <div class="text-stone-500 group-hover:text-white transition-colors">Inject visual asset for Base64 signal extraction...</div>
                </div>
                <textarea id="img-out" readonly class="w-full h-48 bg-black border border-white/10 p-6 rounded mt-8 text-stone-500 font-mono text-xs overflow-hidden"></textarea>
            </div>
        `;
        document.getElementById('img-f').onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (re) => {
                document.getElementById('img-out').value = re.target.result;
                document.getElementById('img-out').classList.add('text-green-400');
            };
            reader.readAsDataURL(file);
        };
    }

    renderPrime() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Prime Audit</h2>
                <input id="pri-in" type="number" value="97" class="w-full bg-black border border-white/10 p-6 rounded text-white text-center text-4xl mb-8">
                <div id="pri-r" class="p-12 border border-green-500/20 bg-green-500/5 rounded-2xl text-green-500 font-bold uppercase tracking-[0.5em]">Prime Sovereignty: TRUE</div>
            </div>
        `;
        document.getElementById('pri-in').oninput = (e) => {
            const n = parseInt(e.target.value);
            let is = n > 1;
            for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { is = false; break; }
            const r = document.getElementById('pri-r');
            r.innerText = is ? "Prime Sovereignty: TRUE" : "Prime Sovereignty: FALSE";
            r.className = `p-12 border rounded-2xl font-bold uppercase tracking-[0.5em] ${is ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-red-500/20 bg-red-500/5 text-red-400'}`;
        };
    }

    renderLineCount() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Line Audit</h2>
                <textarea id="lin-in" placeholder="Data block with breaks..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-2xl">
                    <div id="lin-r" class="text-7xl font-black text-white">0</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Total Line Coordinates</div>
                </div>
            </div>
        `;
        document.getElementById('lin-in').oninput = (e) => {
            document.getElementById('lin-r').innerText = e.target.value ? e.target.value.split('\n').length : 0;
        };
    }

    renderCase() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Case Logic</h2>
                <input id="cas-in" placeholder="Standardize payload..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-2xl mb-8 text-center text-['Inter']">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button class="cas-btn p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10" data-c="upper">UPPER</button>
                    <button class="cas-btn p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10" data-c="lower">lower</button>
                    <button class="cas-btn p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10" data-c="snake">snake_case</button>
                    <button class="cas-btn p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10" data-c="camel">camelCase</button>
                </div>
                <div id="cas-out" class="mt-8 p-10 border border-white/10 rounded-2xl bg-black font-mono text-zinc-400 text-xl overflow-hidden truncate">...</div>
            </div>
        `;
        document.querySelectorAll('.cas-btn').forEach(b => b.onclick = () => {
            const v = document.getElementById('cas-in').value;
            const type = b.dataset.c;
            let res = v;
            if (type === 'upper') res = v.toUpperCase();
            if (type === 'lower') res = v.toLowerCase();
            if (type === 'snake') res = v.toLowerCase().replace(/\s+/g, '_');
            if (type === 'camel') res = v.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '');
            document.getElementById('cas-out').innerText = res;
        });
    }

    renderJSON() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">JSON Forge</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <textarea id="json-in" placeholder="Raw JSON signal..." class="h-96 bg-black border border-white/10 p-6 rounded text-white font-mono text-xs"></textarea>
                    <textarea id="json-out" readonly placeholder="Forged structure..." class="h-96 bg-zinc-900/50 border border-white/10 p-6 rounded text-blue-400 font-mono text-xs"></textarea>
                </div>
                <div class="flex gap-4">
                    <button id="json-b" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:shadow-[0_0_20px_white] transition-all">Beautify Protocol</button>
                    <button id="json-m" class="flex-1 py-4 border border-white/10 text-white font-bold uppercase tracking-widest rounded hover:bg-white/5">Minify Protocol</button>
                </div>
            </div>
        `;
        document.getElementById('json-b').onclick = () => {
            try { document.getElementById('json-out').value = JSON.stringify(JSON.parse(document.getElementById('json-in').value), null, 4); } catch (e) { alert("Invalid JSON Protocol."); }
        };
        document.getElementById('json-m').onclick = () => {
            try { document.getElementById('json-out').value = JSON.stringify(JSON.parse(document.getElementById('json-in').value)); } catch (e) { alert("Invalid JSON Protocol."); }
        };
    }

    renderURL() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">URL Pivot</h2>
                <input id="url-in" placeholder="https://protocol.com/?id=777..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-xl mb-8">
                <div id="url-out" class="grid grid-cols-1 gap-2 text-left"></div>
            </div>
        `;
        document.getElementById('url-in').oninput = (e) => {
            try {
                const params = new URL(e.target.value).searchParams;
                let html = '';
                params.forEach((v, k) => html += `<div class="p-4 border border-white/5 bg-zinc-900 rounded flex justify-between"><span class="text-stone-500 uppercase text-[10px]">${k}</span><span class="text-white font-mono">${v}</span></div>`);
                document.getElementById('url-out').innerHTML = html || '<div class="text-stone-700 italic text-center">No parameters detected in string.</div>';
            } catch (e) { document.getElementById('url-out').innerHTML = ''; }
        };
    }

    renderLuhn() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Luhn Audit</h2>
                <input id="luh-in" placeholder="#### #### #### ####" class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8 text-center font-mono">
                <div id="luh-r" class="p-10 border border-white/10 rounded-2xl bg-black text-stone-500 font-bold uppercase tracking-widest">Awaiting Transmission...</div>
            </div>
        `;
        document.getElementById('luh-in').oninput = (e) => {
            const v = e.target.value.replace(/\D/g, '');
            let sum = 0;
            for (let i = 0; i < v.length; i++) {
                let d = parseInt(v[v.length - 1 - i]);
                if (i % 2 === 1) d *= 2;
                if (d > 9) d -= 9;
                sum += d;
            }
            const is = sum % 10 === 0 && v.length >= 13;
            const r = document.getElementById('luh-r');
            r.innerText = is ? "Integrity: VERIFIED" : "Integrity: CORRUPT / INVALID";
            r.className = `p-10 border rounded-2xl font-bold uppercase tracking-widest ${is ? 'border-green-500/20 bg-green-500/5 text-green-400' : 'border-red-500/20 bg-red-500/5 text-red-400'}`;
        };
    }

    renderAfford() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Loan Horizon</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Max Monthly Budget ($)</label><input id="aff-m" type="number" value="2500" class="w-full bg-black border border-white/10 p-4 rounded text-white text-2xl font-mono"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Down Payment ($)</label><input id="aff-d" type="number" value="50000" class="w-full bg-black border border-white/10 p-4 rounded text-white text-2xl font-mono"></div>
                </div>
                <div class="mt-8 p-12 border border-white/10 rounded-3xl bg-white text-black">
                    <div id="aff-r" class="text-5xl font-black">$466,979</div>
                    <div class="text-[10px] uppercase tracking-widest font-bold mt-2">Maximum Purchasing Power</div>
                </div>
            </div>
        `;
        const update = () => {
            const m = parseFloat(document.getElementById('aff-m').value) || 0;
            const d = parseFloat(document.getElementById('aff-d').value) || 0;
            const r = 0.06 / 12; const n = 360;
            const loan = m * (1 - Math.pow(1 + r, -n)) / r;
            document.getElementById('aff-r').innerText = `$${Math.round(loan + d).toLocaleString()}`;
        };
        ['aff-m', 'aff-d'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderInflation() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Inflation Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Capital ($)</label><input id="inf-c" type="number" value="1000" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Years</label><input id="inf-y" type="number" value="10" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="inf-r" class="text-5xl font-bold text-white font-mono">$744</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Purchasing Value After Erosion (3%)</div>
                </div>
            </div>
        `;
        const update = () => {
            const c = parseFloat(document.getElementById('inf-c').value);
            const y = parseFloat(document.getElementById('inf-y').value);
            const res = c * Math.pow(1 - 0.03, y);
            document.getElementById('inf-r').innerText = `$${Math.round(res).toLocaleString()}`;
        };
        ['inf-c', 'inf-y'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderCrypto() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Satoshi Logic</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500 text-orange-400">Bitcoin (BTC)</label><input id="cry-b" type="number" value="1" class="w-full bg-black border border-orange-500/20 p-6 rounded text-white text-4xl font-mono text-center"></div>
                    <div class="text-center text-stone-800 text-4xl">↕</div>
                    <div><label class="text-[10px] uppercase text-stone-500">Satoshis (SAT)</label><input id="cry-s" type="number" value="100000000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-4xl font-mono text-center"></div>
                </div>
            </div>
        `;
        document.getElementById('cry-b').oninput = (e) => document.getElementById('cry-s').value = Math.round(e.target.value * 100000000);
        document.getElementById('cry-s').oninput = (e) => document.getElementById('cry-b').value = (e.target.value / 100000000).toFixed(8);
    }

    renderBMI() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">BMI Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="bmi-w" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Height (cm)</label><input id="bmi-h" type="number" value="175" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div id="bmi-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 shadow-2xl">
                    <div class="text-6xl font-black text-white">22.9</div>
                    <div class="text-[10px] uppercase tracking-[0.5em] text-green-500 mt-2">Optimal Balance</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('bmi-w').value);
            const h = parseFloat(document.getElementById('bmi-h').value) / 100;
            const res = w / (h * h);
            const status = res < 18.5 ? "Underweight" : res < 25 ? "Optimal Balance" : res < 30 ? "Overweight" : "Obese";
            const color = res < 18.5 ? "text-blue-400" : res < 25 ? "text-green-500" : res < 30 ? "text-orange-400" : "text-red-500";
            document.getElementById('bmi-r').innerHTML = `<div class="text-6xl font-black text-white">${res.toFixed(1)}</div><div class="text-[10px] uppercase tracking-[0.5em] ${color} mt-2">${status}</div>`;
        };
        ['bmi-w', 'bmi-h'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderWHR() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">WHR Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Waist (cm)</label><input id="whr-w" type="number" value="80" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Hip (cm)</label><input id="whr-h" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div id="whr-r" class="p-10 border border-white/10 rounded-xl bg-black">
                    <div class="text-5xl font-bold text-white">0.80</div>
                    <div class="text-[10px] uppercase text-green-500 mt-2">Low Metabolic Risk</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('whr-w').value);
            const h = parseFloat(document.getElementById('whr-h').value);
            const res = w / h;
            document.getElementById('whr-r').querySelector('.text-5xl').innerText = res.toFixed(2);
            document.getElementById('whr-r').querySelector('.text-[10px]').innerText = res < 0.9 ? "Low Metabolic Risk" : "Elevated Risk Protocol";
        };
        ['whr-w', 'whr-h'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderMacros() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Macro Pulse</h2>
                <input id="mac-c" type="number" value="2000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-4xl mb-8 text-center font-mono">
                <div class="grid grid-cols-3 gap-2">
                    <div class="p-4 border border-white/5 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Protein</div><div id="mac-p" class="font-bold">150g</div></div>
                    <div class="p-4 border border-white/5 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Carbs</div><div id="mac-v" class="font-bold">200g</div></div>
                    <div class="p-4 border border-white/5 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Fats</div><div id="mac-f" class="font-bold">67g</div></div>
                </div>
                <div class="mt-4 text-[10px] uppercase text-stone-700">Protocol: 30/40/30 Distribution</div>
            </div>
        `;
        document.getElementById('mac-c').oninput = (e) => {
            const c = parseFloat(e.target.value) || 0;
            document.getElementById('mac-p').innerText = `${Math.round((c * 0.3) / 4)}g`;
            document.getElementById('mac-v').innerText = `${Math.round((c * 0.4) / 4)}g`;
            document.getElementById('mac-f').innerText = `${Math.round((c * 0.3) / 9)}g`;
        };
    }

    renderColors() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Color Forge</h2>
                <button id="col-g" class="w-full py-8 bg-black border-2 border-dashed border-white/10 rounded-2xl mb-8 group hover:border-white transition-all">
                    <div class="text-[10px] uppercase tracking-[0.5em] text-stone-500 group-hover:text-white">Synthesize Chromatic Protocol</div>
                </button>
                <div id="col-r" class="grid grid-cols-1 md:grid-cols-5 gap-4"></div>
            </div>
        `;
        const gen = () => {
            let html = '';
            for (let i = 0; i < 5; i++) {
                const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                html += `
                    <div class="space-y-2">
                        <div class="h-48 rounded-xl shadow-2xl" style="background: ${hex}"></div>
                        <div class="font-mono text-zinc-400 text-xs">${hex.toUpperCase()}</div>
                    </div>
                `;
            }
            document.getElementById('col-r').innerHTML = html;
        };
        document.getElementById('col-g').onclick = gen;
        gen();
    }

    renderBorder() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Corner Forge</h2>
                <div class="p-12 border-2 border-white/10 bg-black mb-8 transition-all duration-500" id="bor-p" style="border-radius: 20px">
                    <div class="aspect-square bg-gradient-to-tr from-stone-800 to-white/20"></div>
                </div>
                <input type="range" id="bor-r" min="0" max="100" value="20" class="w-full accent-white mb-4">
                <div id="bor-code" class="p-4 bg-zinc-900 rounded font-mono text-stone-500 text-sm">border-radius: 20px;</div>
            </div>
        `;
        document.getElementById('bor-r').oninput = (e) => {
            const v = e.target.value;
            document.getElementById('bor-p').style.borderRadius = `${v}px`;
            document.getElementById('bor-code').innerText = `border-radius: ${v}px;`;
        };
    }

    renderAlpha() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Alpha Signal</h2>
                <div class="p-12 bg-white rounded-2xl mb-8 h-48 flex items-center justify-center transition-opacity" id="alp-p">
                    <div class="text-black font-black text-4xl">SOVEREIGN</div>
                </div>
                <input type="range" id="alp-s" min="0" max="100" value="100" class="w-full accent-black">
                <div id="alp-v" class="mt-4 font-mono text-zinc-500">Opacity: 1.00</div>
            </div>
        `;
        document.getElementById('alp-s').oninput = (e) => {
            const v = e.target.value / 100;
            document.getElementById('alp-p').style.opacity = v;
            document.getElementById('alp-v').innerText = `Opacity: ${v.toFixed(2)}`;
        };
    }

    renderRoman() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Roman Logic</h2>
                <input id="rom-in" type="number" value="7" class="w-full bg-black border border-white/10 p-6 rounded text-white text-7xl text-center mb-8 font-serif">
                <div id="rom-out" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 text-6xl font-serif text-white uppercase tracking-widest shadow-2xl">VII</div>
            </div>
        `;
        const toRoman = (num) => {
            const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
            let roman = '';
            for (let i in lookup) { while (num >= lookup[i]) { roman += i; num -= lookup[i]; } }
            return roman;
        };
        document.getElementById('rom-in').oninput = (e) => document.getElementById('rom-out').innerText = toRoman(parseInt(e.target.value) || 0) || 'Ø';
    }

    renderFactorial() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Factorial Pulse</h2>
                <input id="fac-in" type="number" value="5" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8">
                <div id="fac-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 text-6xl font-black text-white overflow-hidden text-ellipsis">120</div>
            </div>
        `;
        const f = (n) => n <= 1 ? 1 : n * f(n - 1);
        document.getElementById('fac-in').oninput = (e) => {
            const n = parseInt(e.target.value) || 0;
            document.getElementById('fac-r').innerText = n > 20 ? "Exceeds Range" : f(n).toLocaleString();
        };
    }

    renderRandom() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Entropy Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Minimum</label><input id="ran-min" type="number" value="1" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Maximum</label><input id="ran-max" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <button id="ran-g" class="w-full py-12 bg-white text-black font-black text-6xl rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform" id="ran-r">77</button>
            </div>
        `;
        const gen = () => {
            const min = parseInt(document.getElementById('ran-min').value);
            const max = parseInt(document.getElementById('ran-max').value);
            document.getElementById('ran-g').innerText = Math.floor(Math.random() * (max - min + 1)) + min;
        };
        document.getElementById('ran-g').onclick = gen;
    }

    renderStopwatch() {
        const container = document.getElementById('tool-content');
        let start = 0, elapsed = 0, timer = null;
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Precision Pulse</h2>
                <div id="sto-v" class="text-8xl font-black text-white font-mono mb-12 tabular-nums">00:00.00</div>
                <div class="flex gap-4">
                    <button id="sto-s" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg">Initialize</button>
                    <button id="sto-r" class="flex-1 py-4 border border-white/10 text-white font-bold uppercase tracking-widest rounded-lg">Reset</button>
                </div>
            </div>
        `;
        const update = () => {
            const d = new Date(Date.now() - start + elapsed);
            document.getElementById('sto-v').innerText = d.toISOString().slice(14, 22);
        };
        document.getElementById('sto-s').onclick = (e) => {
            if (timer) {
                clearInterval(timer); timer = null; elapsed += Date.now() - start;
                e.target.innerText = "Resume Protocol"; e.target.className = "flex-1 py-4 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg";
            } else {
                start = Date.now(); timer = setInterval(update, 10);
                e.target.innerText = "Interrogate"; e.target.className = "flex-1 py-4 bg-red-500 text-white font-bold uppercase tracking-widest rounded-lg";
            }
        };
        document.getElementById('sto-r').onclick = () => { clearInterval(timer); timer = null; elapsed = 0; document.getElementById('sto-v').innerText = "00:00.00"; document.getElementById('sto-s').innerText = "Initialize"; document.getElementById('sto-s').className = "flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg"; };
    }

    renderTimer() {
        const container = document.getElementById('tool-content');
        let timer = null, remaining = 60;
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Horizon Pulse</h2>
                <input id="tim-in" type="number" value="60" class="w-full bg-black border border-white/10 p-6 rounded text-white text-center text-7xl mb-8 font-mono tabular-nums">
                <div id="tim-v" class="text-8xl font-black text-white font-mono mb-8 hidden">60</div>
                <button id="tim-s" class="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.5em] rounded-2xl hover:bg-stone-200 transition-all">Engage Countdown</button>
            </div>
        `;
        const tick = () => {
            if (remaining <= 0) { clearInterval(timer); alert("Temporal Horizon Reached."); return; }
            remaining--; document.getElementById('tim-v').innerText = remaining;
        };
        document.getElementById('tim-s').onclick = (e) => {
            if (timer) { clearInterval(timer); timer = null; e.target.innerText = "Resume Protocol"; }
            else {
                remaining = parseInt(document.getElementById('tim-in').value);
                document.getElementById('tim-in').classList.add('hidden');
                document.getElementById('tim-v').classList.remove('hidden');
                document.getElementById('tim-v').innerText = remaining;
                timer = setInterval(tick, 1000); e.target.innerText = "Abort Mission";
            }
        };
    }

    renderBase64() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Base64 Decode</h2>
                <textarea id="b64-in" placeholder="Encoded signal..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4"></textarea>
                <textarea id="b64-out" readonly class="w-full h-48 bg-white/5 border border-white/10 p-6 rounded text-green-400 font-mono"></textarea>
            </div>
        `;
        document.getElementById('b64-in').oninput = (e) => {
            try { document.getElementById('b64-out').value = atob(e.target.value); } catch (e) { document.getElementById('b64-out').value = "Corrupt Signal."; }
        };
    }

    renderEntities() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Entity Forge</h2>
                <input id="ent-in" placeholder="String for entity extraction..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-2xl mb-8 text-center">
                <div id="ent-out" class="p-8 border border-white/10 bg-zinc-900 rounded-2xl font-mono text-blue-400 text-xl overflow-hidden truncate">...</div>
            </div>
        `;
        document.getElementById('ent-in').oninput = (e) => {
            const el = document.createElement('div'); el.innerText = e.target.value;
            document.getElementById('ent-out').innerText = el.innerHTML;
        };
    }

    renderXML() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">XML Logic</h2>
                <textarea id="xml-in" placeholder="Raw XML stream..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <button id="xml-f" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg mb-8">Format Transmission</button>
                <pre id="xml-out" class="p-6 bg-zinc-900 border border-white/5 rounded text-left text-xs text-stone-400 overflow-x-auto"></pre>
            </div>
        `;
        document.getElementById('xml-f').onclick = () => {
            const v = document.getElementById('xml-in').value;
            document.getElementById('xml-out').innerText = v.replace(/>\s*</g, '>\n<');
        };
    }

    renderUnit() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Unit Pivot</h2>
                <div class="flex items-center gap-4 mb-12">
                     <input id="uni-p" type="number" value="16" class="flex-1 bg-black border border-white/10 p-6 rounded text-white text-4xl text-center font-mono">
                     <div class="text-stone-700 text-2xl">PX</div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="uni-r" class="text-7xl font-black text-white">1.000</div>
                    <div class="text-[10px] uppercase tracking-widest text-stone-500 mt-2">Relative REM Magnitude (16px base)</div>
                </div>
            </div>
        `;
        document.getElementById('uni-p').oninput = (e) => {
            document.getElementById('uni-r').innerText = (e.target.value / 16).toFixed(3);
        };
    }

    renderHSL() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">HSL Signal</h2>
                <input id="hsl-h" value="#FFFFFF" class="w-full h-24 bg-black border border-white/10 p-4 rounded text-white text-center text-3xl font-mono mb-8">
                <div id="hsl-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 shadow-2xl">
                    <div class="text-4xl font-bold text-white font-mono">hsl(0, 0%, 100%)</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-4">Cylindrical Coordinate Map</div>
                </div>
            </div>
        `;
        const hexToHsl = (hex) => {
            let r = 0, g = 0, b = 0;
            if (hex.length === 4) { r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16); }
            else if (hex.length === 7) { r = parseInt(hex.slice(1, 3), 16); g = parseInt(hex.slice(3, 5), 16); b = parseInt(hex.slice(5, 7), 16); }
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) h = s = 0;
            else {
                const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) { case r: h = (g - b) / d + (g < b ? 6 : 0); break; case g: h = (b - r) / d + 2; break; case b: h = (r - g) / d + 4; break; }
                h /= 6;
            }
            return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        };
        document.getElementById('hsl-h').oninput = (e) => {
            try { document.getElementById('hsl-r').querySelector('.text-4xl').innerText = hexToHsl(e.target.value); } catch (e) { }
        };
    }

    renderGradient() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Gradient Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <input id="gra-1" type="color" value="#000000" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                    <input id="gra-2" type="color" value="#ffffff" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                </div>
                <div id="gra-p" class="h-48 rounded-2xl mb-8 shadow-2xl" style="background: linear-gradient(to right, #000000, #ffffff)"></div>
                <div id="gra-c" class="p-4 bg-zinc-900 rounded font-mono text-blue-400 text-xs text-left overflow-x-auto">linear-gradient(90deg, #000000, #ffffff)</div>
            </div>
        `;
        const update = () => {
            const c1 = document.getElementById('gra-1').value;
            const c2 = document.getElementById('gra-2').value;
            const res = `linear-gradient(90deg, ${c1}, ${c2})`;
            document.getElementById('gra-p').style.background = res;
            document.getElementById('gra-c').innerText = res;
        };
        ['gra-1', 'gra-2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderPaycheck() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Yield Audit</h2>
                <input id="pay-g" type="number" value="5000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div class="p-12 border border-white/10 rounded-3xl bg-white text-black">
                    <div id="pay-r" class="text-6xl font-black">$3,750</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Estimated Net Yield (25% Deduction Protocol)</div>
                </div>
            </div>
        `;
        document.getElementById('pay-g').oninput = (e) => {
            document.getElementById('pay-r').innerText = `$${Math.round(e.target.value * 0.75).toLocaleString()}`;
        };
    }

    renderROI() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">ROI Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Principal</label><input id="roi-p" type="number" value="1000" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Final Value</label><input id="roi-f" type="number" value="1500" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-green-500/20 bg-green-500/5 rounded-2xl">
                    <div id="roi-r" class="text-7xl font-black text-green-500">50.0%</div>
                    <div class="text-[10px] uppercase tracking-widest text-green-700 mt-2">Capital Appreciation Efficiency</div>
                </div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('roi-p').value);
            const f = parseFloat(document.getElementById('roi-f').value);
            const res = ((f - p) / p) * 100;
            const r = document.getElementById('roi-r');
            r.innerText = `${res.toFixed(1)}%`;
            r.className = `text-7xl font-black ${res >= 0 ? 'text-green-500' : 'text-red-500'}`;
        };
        ['roi-p', 'roi-f'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderCompound() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Compound Logic</h2>
                <div class="grid grid-cols-3 gap-2 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Princ.</label><input id="com-p" type="number" value="1000" class="w-full bg-black border border-white/10 p-2 rounded text-xs"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Rate (%)</label><input id="com-r" type="number" value="7" class="w-full bg-black border border-white/10 p-2 rounded text-xs"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Years</label><input id="com-y" type="number" value="10" class="w-full bg-black border border-white/10 p-2 rounded text-xs"></div>
                </div>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="com-o" class="text-5xl font-bold text-white font-mono">$1,967</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Future Capital Projection</div>
                </div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('com-p').value);
            const r = parseFloat(document.getElementById('com-r').value) / 100;
            const y = parseFloat(document.getElementById('com-y').value);
            const res = p * Math.pow(1 + r, y);
            document.getElementById('com-o').innerText = `$${Math.round(res).toLocaleString()}`;
        };
        ['com-p', 'com-r', 'com-y'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderSleep() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Sleep Pulse</h2>
                <label class="block text-[10px] uppercase text-stone-500 mb-2">Desired Wake Time</label>
                <input id="sle-w" type="time" value="07:00" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div id="sle-r" class="grid grid-cols-2 gap-2"></div>
            </div>
        `;
        document.getElementById('sle-w').oninput = (e) => {
            const [h, m] = e.target.value.split(':').map(Number);
            const d = new Date(); d.setHours(h, m, 0);
            let html = '';
            for (let i = 6; i >= 3; i--) {
                const t = new Date(d.getTime() - (i * 90 * 60 * 1000));
                html += `<div class="p-4 border border-white/5 bg-zinc-900 rounded"><div class="text-[10px] text-stone-600">${i} Cycles</div><div class="font-bold text-white">${t.toTimeString().slice(0, 5)}</div></div>`;
            }
            document.getElementById('sle-r').innerHTML = html;
        };
    }

    renderSteps() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Stride Pulse</h2>
                <input id="ste-i" type="number" value="10000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-6xl text-center mb-8 font-mono">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-8 border border-white/10 bg-zinc-900 rounded-2xl">
                        <div id="ste-k" class="text-4xl font-bold">7.6</div>
                        <div class="text-[10px] uppercase text-stone-500">Kilometers</div>
                    </div>
                    <div class="p-8 border border-white/10 bg-zinc-900 rounded-2xl">
                        <div id="ste-m" class="text-4xl font-bold">4.7</div>
                        <div class="text-[10px] uppercase text-stone-500">Miles</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('ste-i').oninput = (e) => {
            const s = e.target.value;
            document.getElementById('ste-k').innerText = (s * 0.000762).toFixed(1);
            document.getElementById('ste-m').innerText = (s * 0.000473).toFixed(1);
        };
    }

    renderHydration() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Hydration Pulse</h2>
                <div class="relative h-64 w-32 mx-auto border-2 border-white/10 rounded-3xl overflow-hidden mb-8">
                    <div id="wat-f" class="absolute bottom-0 w-full bg-blue-500/40 transition-all duration-1000" style="height: 40%"></div>
                    <div class="absolute inset-0 flex items-center justify-center text-4xl font-black text-white" id="wat-p">40%</div>
                </div>
                <div class="flex gap-4">
                    <button class="wat-btn flex-1 py-4 bg-white/5 border border-white/10 rounded hover:bg-white/10" data-v="250">+250ml</button>
                    <button class="wat-btn flex-1 py-4 bg-white/5 border border-white/10 rounded hover:bg-white/10" data-v="500">+500ml</button>
                </div>
                <button id="wat-r" class="mt-8 text-[10px] uppercase text-stone-700 hover:text-white transition-colors">Reset Protocol</button>
            </div>
        `;
        let total = 1000;
        const update = () => {
            const p = Math.min(100, (total / 2500) * 100);
            document.getElementById('wat-f').style.height = `${p}%`;
            document.getElementById('wat-p').innerText = `${Math.round(p)}%`;
        };
        document.querySelectorAll('.wat-btn').forEach(b => b.onclick = () => { total += parseInt(b.dataset.v); update(); });
        document.getElementById('wat-r').onclick = () => { total = 0; update(); };
    }

    renderAge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Epoch Pulse</h2>
                <input type="date" id="age-d" class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8">
                <div id="age-r" class="grid grid-cols-2 gap-2 text-left"></div>
            </div>
        `;
        document.getElementById('age-d').oninput = (e) => {
            const b = new Date(e.target.value); if (isNaN(b)) return;
            const diff = Date.now() - b.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            document.getElementById('age-r').innerHTML = `
                <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Days</div><div class="font-bold text-white text-2xl">${days.toLocaleString()}</div></div>
                <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Hours</div><div class="font-bold text-white text-2xl">${hours.toLocaleString()}</div></div>
            `;
        };
    }

    renderDay() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Day Logic</h2>
                <input type="date" id="day-i" class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl mb-8">
                <div id="day-r" class="p-12 border border-white/10 rounded-2xl bg-zinc-900 text-5xl font-black text-white uppercase tracking-widest">Protocol Date</div>
            </div>
        `;
        document.getElementById('day-i').oninput = (e) => {
            const d = new Date(e.target.value);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            document.getElementById('day-r').innerText = days[d.getDay()] || "INVALID";
        };
    }

    renderList() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">List Forge</h2>
                <textarea id="lst-i" placeholder="Item 1\nItem 2\nItem 3..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <textarea id="lst-o" readonly class="w-full h-32 bg-zinc-900/50 border border-white/10 p-4 rounded text-blue-400 font-mono text-xs overflow-hidden"></textarea>
            </div>
        `;
        document.getElementById('lst-i').oninput = (e) => {
            const arr = e.target.value.split('\n').filter(l => l.trim());
            document.getElementById('lst-o').value = JSON.stringify(arr);
        };
    }

    renderMarkdown() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest text-center">Markdown Pulse</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <textarea id="md-in" placeholder="# Protocol Title\n\n- Entity 1\n- Entity 2" class="h-96 bg-black border border-white/10 p-6 rounded text-white font-mono text-sm"></textarea>
                    <div id="md-out" class="h-96 bg-white/5 border border-white/10 p-8 rounded overflow-y-auto prose prose-invert max-w-none text-stone-400">
                        <div class="italic opacity-30">Forged output will appear here...</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('md-in').oninput = (e) => {
            const v = e.target.value;
            let html = v.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 font-[\'Cinzel\'] text-white">$1</h1>')
                .replace(/^## (.*$)/gim, '<h3 class="text-xl font-bold mb-2 text-white">$1</h3>')
                .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
                .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
            document.getElementById('md-out').innerHTML = html || '<div class="italic opacity-30">Forged output will appear here...</div>';
        };
    }

    renderPercent() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Percent Logic</h2>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                         <input id="per-x" type="number" value="25" class="flex-1 bg-black border border-white/10 p-4 rounded text-white text-center">
                         <div class="text-[10px] uppercase text-stone-600">IS WHAT % OF</div>
                         <input id="per-y" type="number" value="200" class="flex-1 bg-black border border-white/10 p-4 rounded text-white text-center">
                    </div>
                </div>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl mt-8">
                    <div id="per-r" class="text-7xl font-black text-white">12.5%</div>
                </div>
            </div>
        `;
        const update = () => {
            const x = parseFloat(document.getElementById('per-x').value);
            const y = parseFloat(document.getElementById('per-y').value);
            document.getElementById('per-r').innerText = `${((x / y) * 100).toFixed(1)}%`;
        };
        ['per-x', 'per-y'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderMean() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Mean Signal</h2>
                <input id="mea-i" placeholder="10, 20, 30, 40..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-4xl text-center mb-8 font-mono">
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="mea-r" class="text-7xl font-black text-white">0</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Arithmetic Dataset Center</div>
                </div>
            </div>
        `;
        document.getElementById('mea-i').oninput = (e) => {
            const nums = e.target.value.split(',').map(Number).filter(n => !isNaN(n));
            const res = nums.length ? nums.reduce((a, b) => a + b) / nums.length : 0;
            document.getElementById('mea-r').innerText = res.toFixed(1);
        };
    }

    renderGratuity() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Gratuity Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Bill ($)</label><input id="gra-b" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Tip (%)</label><input id="gra-t" type="number" value="18" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 border border-white/10 rounded-2xl bg-white text-black">
                    <div id="gra-o" class="text-6xl font-black">$118.00</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Total Combined Gratuity</div>
                </div>
            </div>
        `;
        ['gra-b', 'gra-t'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderYAML() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">YAML Pivot</h2>
                <textarea id="yam-i" placeholder="key: value\nlist:\n  - item" class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <textarea id="yam-o" readonly class="w-full h-32 bg-zinc-900/50 border border-white/10 p-4 rounded text-blue-400 font-mono text-xs overflow-hidden"></textarea>
            </div>
        `;
        document.getElementById('yam-i').oninput = (e) => {
            const lines = e.target.value.split('\n');
            const obj = {};
            lines.forEach(l => {
                const parts = l.split(':');
                if (parts.length >= 2) {
                    const k = parts[0].trim();
                    const v = parts.slice(1).join(':').trim();
                    if (k && v) obj[k] = v;
                }
            });
            document.getElementById('yam-o').value = JSON.stringify(obj, null, 2);
        };
    }

    renderENV() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Environment Forge</h2>
                <div class="space-y-4 text-left">
                    <div class="p-4 bg-zinc-900 rounded border border-white/5 font-mono text-xs text-stone-500">
                        DATABASE_URL=postgres://user:pass@localhost:5432/db<br>
                        API_KEY=sk_test_51...<br>
                        SECRET_KEY=${Math.random().toString(36).slice(2)}
                    </div>
                    <button id="env-g" class="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:shadow-[0_0_20px_white] transition-all">Extract Secure Template</button>
                    <div id="env-notif" class="text-center text-[10px] text-green-500 opacity-0 transition-opacity">Protocol Saved to Disk</div>
                </div>
            </div>
        `;
        document.getElementById('env-g').onclick = () => {
            const blob = new Blob(["DATABASE_URL=\nAPI_KEY=\nSECRET_KEY="], { type: 'text/plain' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = '.env.example'; a.click();
            document.getElementById('env-notif').className = "text-center text-[10px] text-green-500 opacity-100";
        };
    }

    renderDocker() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Container Logic</h2>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-2xl text-left font-mono text-sm leading-relaxed text-blue-400">
                    <div>FROM node:18-alpine</div>
                    <div>WORKDIR /app</div>
                    <div>COPY package*.json ./</div>
                    <div>RUN npm install</div>
                    <div>COPY . .</div>
                    <div>EXPOSE 3000</div>
                    <div>CMD ["npm", "start"]</div>
                </div>
                <div class="mt-6 text-[10px] uppercase tracking-widest text-stone-600 italic">Universal Node.js System Architecture</div>
            </div>
        `;
    }

    renderGit() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Version Pulse</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div class="p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all"><div class="text-[10px] text-stone-500 uppercase">Commit All</div><div class="text-xs font-mono text-white">git add . && git commit -m "update"</div></div>
                    <div class="p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all"><div class="text-[10px] text-stone-500 uppercase">New Branch</div><div class="text-xs font-mono text-white">git checkout -b feature/name</div></div>
                    <div class="p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all"><div class="text-[10px] text-stone-500 uppercase">Push Origin</div><div class="text-xs font-mono text-white">git push origin main</div></div>
                    <div class="p-4 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all"><div class="text-[10px] text-stone-500 uppercase">Revert Command</div><div class="text-xs font-mono text-white">git checkout -- file.name</div></div>
                </div>
            </div>
        `;
    }

    renderNginx() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Gateway Forge</h2>
                <div class="p-8 bg-black border border-white/10 rounded-2xl text-left font-mono text-xs text-stone-500 leading-normal">
                    server {<br>
                    &nbsp;&nbsp;listen 80;<br>
                    &nbsp;&nbsp;server_name domain.com;<br><br>
                    &nbsp;&nbsp;location / {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;proxy_pass http://localhost:3000;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;proxy_set_header Host $host;<br>
                    &nbsp;&nbsp;}<br>
                    }
                </div>
            </div>
        `;
    }

    renderHeart() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Heart Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Age</label><input id="hea-a" type="number" value="25" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">RHR</label><input id="hea-r" type="number" value="60" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div id="hea-o" class="p-8 border-2 border-dashed border-white/10 rounded-2xl">
                    <div class="text-5xl font-black text-white">154 BPM</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Target Zone (70% Intensity)</div>
                </div>
            </div>
        `;
        const update = () => {
            const a = parseInt(document.getElementById('hea-a').value);
            const r = parseInt(document.getElementById('hea-r').value);
            const max = 220 - a;
            const target = ((max - r) * 0.7) + r;
            document.getElementById('hea-o').querySelector('.text-5xl').innerText = Math.round(target) + " BPM";
        };
        ['hea-a', 'hea-r'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderLean() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Lean Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="lea-w" type="number" value="80" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Fat (%)</label><input id="lea-f" type="number" value="15" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-10 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="lea-r" class="text-6xl font-black text-white">68.0 kg</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Biological Lean Body Mass</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('lea-w').value);
            const f = parseFloat(document.getElementById('lea-f').value) / 100;
            document.getElementById('lea-r').innerText = (w * (1 - f)).toFixed(1) + " kg";
        };
        ['lea-w', 'lea-f'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    render1RM() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Force Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight</label><input id="one-w" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Reps</label><input id="one-r" type="number" value="5" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-12 bg-white text-black rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    <div id="one-o" class="text-7xl font-black">116</div>
                    <div class="text-[10px] uppercase font-bold tracking-widest">One Repetition Maximum</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('one-w').value);
            const r = parseFloat(document.getElementById('one-r').value);
            document.getElementById('one-o').innerText = Math.round(w * (1 + r / 30));
        };
        ['one-w', 'one-r'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderPace() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Tempo Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Time (min)</label><input id="pac-t" type="number" value="25" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Dist (km)</label><input id="pac-d" type="number" value="5" class="w-full bg-black border border-white/10 p-3 rounded"></div>
                </div>
                <div class="p-10 border border-white/10 rounded-2xl bg-zinc-900">
                    <div id="pac-o" class="text-6xl font-black text-white">5:00</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Minutes Per Kilometer</div>
                </div>
            </div>
        `;
        const update = () => {
            const t = parseFloat(document.getElementById('pac-t').value);
            const d = parseFloat(document.getElementById('pac-d').value);
            if (!t || !d) return;
            const pace = t / d;
            const m = Math.floor(pace);
            const s = Math.round((pace - m) * 60).toString().padStart(2, '0');
            document.getElementById('pac-o').innerText = `${m}:${s}`;
        };
        ['pac-t', 'pac-d'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderPlasma() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Plasma Pulse</h2>
                <input id="pla-w" type="number" value="70" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8">
                <div class="p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl">
                    <div id="pla-o" class="text-6xl font-black text-blue-400">42.0 L</div>
                    <div class="text-[10px] uppercase text-blue-700 mt-2">Estimated Total Body Water</div>
                </div>
            </div>
        `;
        const el = document.getElementById('pla-w');
        if (el) el.oninput = (e) => {
            document.getElementById('pla-o').innerText = (e.target.value * 0.6).toFixed(1) + " L";
        };
    }

    renderBreakEven() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Equilibrium Pulse</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Fixed Costs ($)</label><input id="bre-f" type="number" value="1000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Price/Unit ($)</label><input id="bre-p" type="number" value="50" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Cost/Unit ($)</label><input id="bre-c" type="number" value="30" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="mt-8 p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="bre-o" class="text-6xl font-black text-white">50</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Units Required for Equilibrium</div>
                </div>
            </div>
        `;
        const update = () => {
            const f = parseFloat(document.getElementById('bre-f').value);
            const p = parseFloat(document.getElementById('bre-p').value);
            const c = parseFloat(document.getElementById('bre-c').value);
            const res = f / (p - c);
            document.getElementById('bre-o').innerText = isFinite(res) && res > 0 ? Math.ceil(res) : "∞";
        };
        ['bre-f', 'bre-p', 'bre-c'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderMargin() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Margin Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Cost ($)</label><input id="mar-c" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Price ($)</label><input id="mar-p" type="number" value="150" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Margin</div><div id="mar-m" class="text-2xl font-bold text-white">33.3%</div></div>
                    <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Markup</div><div id="mar-u" class="text-2xl font-bold text-white">50.0%</div></div>
                </div>
            </div>
        `;
        const update = () => {
            const c = parseFloat(document.getElementById('mar-c').value);
            const p = parseFloat(document.getElementById('mar-p').value);
            document.getElementById('mar-m').innerText = (((p - c) / p) * 100).toFixed(1) + "%";
            document.getElementById('mar-u').innerText = (((p - c) / c) * 100).toFixed(1) + "%";
        };
        ['mar-c', 'mar-p'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderTax() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Levy Signal</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                     <div><label class="text-[10px] uppercase text-stone-500">Yield ($)</label><input id="tax-y" type="number" value="1000" class="w-full bg-black border border-white/10 p-3 rounded text-white font-mono"></div>
                     <div><label class="text-[10px] uppercase text-stone-500">Rate (%)</label><input id="tax-r" type="number" value="20" class="w-full bg-black border border-white/10 p-3 rounded text-white font-mono"></div>
                </div>
                <div class="p-12 border border-red-500/20 bg-red-500/5 rounded-3xl">
                    <div id="tax-o" class="text-6xl font-black text-red-500">$200</div>
                    <div class="text-[10px] uppercase text-red-700 mt-2">Estimated Extraction Liability</div>
                </div>
            </div>
        `;
        const update = () => {
            const y = parseFloat(document.getElementById('tax-y').value);
            const r = parseFloat(document.getElementById('tax-r').value) / 100;
            document.getElementById('tax-o').innerText = "$" + Math.round(y * r).toLocaleString();
        };
        ['tax-y', 'tax-r'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderSaving() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Propensity Pulse</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Target Goal ($)</label><input id="sav-t" type="number" value="10000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Months</label><input id="sav-m" type="number" value="12" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="mt-8 p-12 border border-white/10 bg-white text-black rounded-3xl">
                    <div id="sav-o" class="text-6xl font-black">$833</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Monthly Retention Frequency</div>
                </div>
            </div>
        `;
        const update = () => {
            const t = parseFloat(document.getElementById('sav-t').value);
            const m = parseFloat(document.getElementById('sav-m').value);
            document.getElementById('sav-o').innerText = "$" + Math.round(t / m).toLocaleString();
        };
        ['sav-t', 'sav-m'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderDebt() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Leverage Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Monthly Debt</label><input id="deb-d" type="number" value="500" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Gross Income</label><input id="deb-i" type="number" value="3000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div id="deb-r" class="p-10 border rounded-2xl bg-zinc-900 border-green-500/20">
                    <div class="text-6xl font-black text-white">16.7%</div>
                    <div class="text-[10px] uppercase text-green-500 mt-2">Sustainable Leverage</div>
                </div>
            </div>
        `;
        const update = () => {
            const d = parseFloat(document.getElementById('deb-d').value);
            const i = parseFloat(document.getElementById('deb-i').value);
            const res = (d / i) * 100;
            const r = document.getElementById('deb-r');
            r.querySelector('.text-6xl').innerText = res.toFixed(1) + "%";
            const color = res < 36 ? "text-green-500" : "text-red-500";
            const status = res < 36 ? "Sustainable Leverage" : "Critical Exposure Risk";
            r.querySelector('.text-[10px]').innerText = status;
            r.querySelector('.text-[10px]').className = `text-[10px] uppercase ${color} mt-2`;
        };
        ['deb-d', 'deb-i'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderUUID() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Identity Forge</h2>
                <button id="uui-g" class="w-full py-12 bg-black border-2 border-dashed border-white/10 rounded-3xl mb-8 group hover:border-white transition-all">
                    <div id="uui-o" class="text-3xl font-mono text-zinc-500 group-hover:text-blue-400">00000000-0000-4000-0000-000000000000</div>
                    <div class="text-[10px] uppercase text-stone-700 mt-4">Randomize Human Identifier</div>
                </button>
            </div>
        `;
        const gen = () => {
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            document.getElementById('uui-o').innerText = uuid;
        };
        const el = document.getElementById('uui-g');
        if (el) el.onclick = gen;
        gen();
    }

    renderString() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Entropy Pulse</h2>
                <div class="flex gap-4 mb-8">
                    <input id="str-l" type="number" value="32" class="w-24 bg-black border border-white/10 p-4 rounded text-white text-center">
                    <button id="str-g" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:shadow-[0_0_20px_white] transition-all">Synthesize Pulse</button>
                </div>
                <textarea id="str-o" readonly class="w-full h-32 bg-zinc-900/50 border border-white/10 p-6 rounded text-green-400 font-mono text-sm break-all"></textarea>
            </div>
        `;
        const btn = document.getElementById('str-g');
        if (btn) btn.onclick = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            let res = ''; const l = parseInt(document.getElementById('str-l').value);
            for (let i = 0; i < l; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
            document.getElementById('str-o').value = res;
        };
    }

    renderWordCount() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Lexicon Audit</h2>
                <textarea id="wor-i" placeholder="Paste linguistic signal..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div class="grid grid-cols-3 gap-4">
                    <div class="p-6 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Words</div><div id="wor-w" class="text-2xl font-bold text-white">0</div></div>
                    <div class="p-6 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Chars</div><div id="wor-c" class="text-2xl font-bold text-white">0</div></div>
                    <div class="p-6 bg-zinc-900 rounded"><div class="text-[10px] text-stone-500">Spaces</div><div id="wor-s" class="text-2xl font-bold text-white">0</div></div>
                </div>
            </div>
        `;
        const el = document.getElementById('wor-i');
        if (el) el.oninput = (e) => {
            const v = e.target.value;
            document.getElementById('wor-w').innerText = v.trim() ? v.trim().split(/\s+/).length : 0;
            document.getElementById('wor-c').innerText = v.length;
            document.getElementById('wor-s').innerText = (v.match(/ /g) || []).length;
        };
    }

    renderCharFreq() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Density Pulse</h2>
                <textarea id="den-i" placeholder="Input character set..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div id="den-o" class="grid grid-cols-4 md:grid-cols-8 gap-2"></div>
            </div>
        `;
        const el = document.getElementById('den-i');
        if (el) el.oninput = (e) => {
            const v = e.target.value;
            const counts = {};[...v].forEach(c => { if (c.trim()) counts[c] = (counts[c] || 0) + 1; });
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 16);
            document.getElementById('den-o').innerHTML = sorted.map(([c, count]) => `
                 <div class="p-2 border border-white/5 bg-zinc-900 rounded">
                    <div class="text-[10px] text-stone-700 font-mono">${c === ' ' ? 'SPC' : c}</div>
                    <div class="font-bold text-white text-xs">${count}</div>
                 </div>
             `).join('');
        };
    }

    renderReverse() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Inverse Logic</h2>
                <textarea id="rev-i" placeholder="Item Alpha\nItem Beta\nItem Gamma..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <textarea id="rev-o" readonly class="w-full h-64 bg-zinc-900/50 border border-white/10 p-6 rounded text-stone-500 italic font-mono"></textarea>
            </div>
        `;
        const el = document.getElementById('rev-i');
        if (el) el.oninput = (e) => {
            document.getElementById('rev-o').value = e.target.value.split('\n').reverse().join('\n');
        };
    }

    renderMortgage() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Mortgage Audit</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Principal ($)</label><input id="mor-p" type="number" value="300000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Rate (%)</label><input id="mor-r" type="number" value="6.5" class="w-full bg-black border border-white/10 p-3 rounded text-white" step="0.1"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Years</label><input id="mor-y" type="number" value="30" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="mt-8 p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="mor-o" class="text-5xl font-black text-white">$1,896</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Estimated Monthly Principal & Interest</div>
                </div>
            </div>
        `;
        const update = () => {
            const p = parseFloat(document.getElementById('mor-p').value);
            const r = parseFloat(document.getElementById('mor-r').value) / 100 / 12;
            const n = parseFloat(document.getElementById('mor-y').value) * 12;
            const res = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
            document.getElementById('mor-o').innerText = "$" + Math.round(res || 0).toLocaleString();
        };
        ['mor-p', 'mor-r', 'mor-y'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderCredit() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Interest Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Balance ($)</label><input id="cre-b" type="number" value="5000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">APR (%)</label><input id="cre-a" type="number" value="24" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-10 border border-red-500/20 bg-red-500/5 rounded-3xl">
                    <div id="cre-o" class="text-5xl font-black text-red-500">$100.00</div>
                    <div class="text-[10px] uppercase text-red-700 mt-2">Monthly Interest Extraction</div>
                </div>
            </div>
        `;
        const update = () => {
            const b = parseFloat(document.getElementById('cre-b').value);
            const a = parseFloat(document.getElementById('cre-a').value) / 100 / 12;
            document.getElementById('cre-o').innerText = "$" + (b * a).toFixed(2);
        };
        ['cre-b', 'cre-a'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderBudget() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Budget Logic</h2>
                <input id="bud-i" type="number" value="5000" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div class="space-y-2">
                    <div class="p-4 bg-zinc-900 border border-white/5 rounded flex justify-between items-center">
                        <span class="text-[10px] uppercase text-stone-500">Necessities (50%)</span>
                        <span id="bud-n" class="font-bold text-white">$2,500</span>
                    </div>
                    <div class="p-4 bg-zinc-900 border border-white/5 rounded flex justify-between items-center">
                        <span class="text-[10px] uppercase text-stone-500">Wants (30%)</span>
                        <span id="bud-w" class="font-bold text-white">$1,500</span>
                    </div>
                    <div class="p-4 bg-zinc-900 border border-white/5 rounded flex justify-between items-center">
                        <span class="text-[10px] uppercase text-stone-500">Savings/Debt (20%)</span>
                        <span id="bud-s" class="font-bold text-white">$1,000</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('bud-i').oninput = (e) => {
            const i = parseFloat(e.target.value) || 0;
            document.getElementById('bud-n').innerText = "$" + Math.round(i * 0.5).toLocaleString();
            document.getElementById('bud-w').innerText = "$" + Math.round(i * 0.3).toLocaleString();
            document.getElementById('bud-s').innerText = "$" + Math.round(i * 0.2).toLocaleString();
        };
    }

    renderCalories() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Thermal Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="cal-w" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">MET Value</label><input id="cal-m" type="number" value="8" class="w-full bg-black border border-white/10 p-3 rounded text-white" step="0.5"></div>
                </div>
                <div><label class="text-[10px] uppercase text-stone-500 block text-left mb-1">Duration (min)</label><input id="cal-d" type="number" value="60" class="w-full bg-black border border-white/10 p-3 rounded text-white mb-8"></div>
                <div class="p-12 border border-orange-500/20 bg-orange-500/5 rounded-3xl">
                    <div id="cal-o" class="text-6xl font-black text-orange-500">588</div>
                    <div class="text-[10px] uppercase text-orange-700 mt-2">Activity Energy Expenditure (Kcal)</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('cal-w').value);
            const m = parseFloat(document.getElementById('cal-m').value);
            const d = parseFloat(document.getElementById('cal-d').value);
            document.getElementById('cal-o').innerText = Math.round(m * 3.5 * w / 200 * d);
        };
        ['cal-w', 'cal-m', 'cal-d'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderBloodPressure() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Vessel Audit</h2>
                <div class="flex items-center justify-center gap-4 mb-8">
                    <input id="bp-s" type="number" value="120" class="w-32 bg-black border border-white/10 p-4 rounded text-white text-4xl text-center font-mono">
                    <div class="text-stone-700 text-4xl">/</div>
                    <input id="bp-d" type="number" value="80" class="w-32 bg-black border border-white/10 p-4 rounded text-white text-4xl text-center font-mono">
                </div>
                <div id="bp-r" class="p-12 border rounded-2xl bg-zinc-900 border-green-500/20">
                    <div class="text-3xl font-bold text-white uppercase tracking-widest">Normal</div>
                    <div class="text-[10px] text-stone-500 mt-4 lowercase">protocol within optimal biological range</div>
                </div>
            </div>
        `;
        const update = () => {
            const s = parseInt(document.getElementById('bp-s').value);
            const d = parseInt(document.getElementById('bp-d').value);
            const r = document.getElementById('bp-r');
            let status = "Normal", color = "green";

            if (s >= 180 || d >= 120) { status = "Crisis"; color = "red"; }
            else if (s >= 140 || d >= 90) { status = "Stage 2"; color = "orange"; }
            else if (s >= 130 || d >= 80) { status = "Stage 1"; color = "yellow"; }
            else if (s >= 120 && d < 80) { status = "Elevated"; color = "blue"; }

            r.className = `p-12 border rounded-2xl bg-zinc-900 border-${color}-500/20`;
            r.querySelector('.text-3xl').innerText = status;
            r.querySelector('.text-3xl').className = `text-3xl font-bold text-${color}-400 uppercase tracking-widest`;
        };
        ['bp-s', 'bp-d'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderTDEE() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Metabolic Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (kg)</label><input id="td-w" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Height (cm)</label><input id="td-h" type="number" value="175" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Age</label><input id="td-a" type="number" value="25" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Activity Multiplier</label>
                        <select id="td-m" class="w-full bg-black border border-white/10 p-3 rounded text-white text-xs">
                            <option value="1.2">Sedentary</option>
                            <option value="1.375">Lightly Active</option>
                            <option value="1.55" selected>Moderately Active</option>
                            <option value="1.725">Very Active</option>
                        </select>
                    </div>
                </div>
                <div class="p-12 border border-white/10 bg-white text-black rounded-3xl">
                    <div id="td-o" class="text-6xl font-black">2,580</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Daily Maintenance Threshold (Kcal)</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('td-w').value);
            const h = parseFloat(document.getElementById('td-h').value);
            const a = parseFloat(document.getElementById('td-a').value);
            const m = parseFloat(document.getElementById('td-m').value);
            const bmr = (10 * w) + (6.25 * h) - (5 * a) + 5; // Mifflin-St Jeor (Male default)
            document.getElementById('td-o').innerText = Math.round(bmr * m).toLocaleString();
        };
        ['td-w', 'td-h', 'td-a', 'td-m'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.oninput = update;
        });
    }

    renderCron() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Temporal Forge</h2>
                <div class="grid grid-cols-5 gap-2 mb-8">
                    <div><label class="text-[8px] uppercase text-stone-500">Min</label><input id="cro-1" value="*" class="w-full bg-black border border-white/10 p-2 rounded text-center text-sm font-mono text-white"></div>
                    <div><label class="text-[8px] uppercase text-stone-500">Hour</label><input id="cro-2" value="*" class="w-full bg-black border border-white/10 p-2 rounded text-center text-sm font-mono text-white"></div>
                    <div><label class="text-[8px] uppercase text-stone-500">Day</label><input id="cro-3" value="*" class="w-full bg-black border border-white/10 p-2 rounded text-center text-sm font-mono text-white"></div>
                    <div><label class="text-[8px] uppercase text-stone-500">Month</label><input id="cro-4" value="*" class="w-full bg-black border border-white/10 p-2 rounded text-center text-sm font-mono text-white"></div>
                    <div><label class="text-[8px] uppercase text-stone-500">DOW</label><input id="cro-5" value="*" class="w-full bg-black border border-white/10 p-2 rounded text-center text-sm font-mono text-white"></div>
                </div>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-2xl font-mono text-blue-400 text-xl tracking-widest mb-4">
                    <span id="cro-o">* * * * *</span>
                </div>
                <div class="text-[10px] text-stone-500 uppercase tracking-widest">Protocol Execution Frequency</div>
            </div>
        `;
        const update = () => {
            const res = [1, 2, 3, 4, 5].map(i => document.getElementById(`cro-${i}`).value).join(' ');
            document.getElementById('cro-o').innerText = res;
        };
        [1, 2, 3, 4, 5].forEach(i => document.getElementById(`cro-${i}`).oninput = update);
    }

    renderShadow() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Shadow Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">X-Offset</label><input id="sha-x" type="number" value="10" class="w-full bg-black border border-white/10 p-2 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Y-Offset</label><input id="sha-y" type="number" value="10" class="w-full bg-black border border-white/10 p-2 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Blur</label><input id="sha-b" type="number" value="20" class="w-full bg-black border border-white/10 p-2 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Opacity</label><input id="sha-o" type="number" value="0.5" class="w-full bg-black border border-white/10 p-2 rounded text-white" step="0.1"></div>
                </div>
                <div class="flex items-center justify-center p-20 bg-zinc-900 rounded-3xl mb-8">
                    <div id="sha-p" class="w-24 h-24 bg-white rounded-xl shadow-[10px_10px_20px_rgba(0,0,0,0.5)]"></div>
                </div>
                <div id="sha-c" class="p-4 bg-zinc-900 rounded font-mono text-blue-400 text-xs text-left overflow-x-auto">box-shadow: 10px 10px 20px rgba(0,0,0,0.5);</div>
            </div>
        `;
        const update = () => {
            const x = document.getElementById('sha-x').value;
            const y = document.getElementById('sha-y').value;
            const b = document.getElementById('sha-b').value;
            const o = document.getElementById('sha-o').value;
            const res = `box-shadow: ${x}px ${y}px ${b}px rgba(0,0,0,${o});`;
            document.getElementById('sha-p').style.boxShadow = `${x}px ${y}px ${b}px rgba(0,0,0,${o})`;
            document.getElementById('sha-c').innerText = res;
        };
        ['sha-x', 'sha-y', 'sha-b', 'sha-o'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderFlex() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Layout Forge</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Justify Content</label>
                        <select id="flx-j" class="w-full bg-black border border-white/10 p-2 rounded text-white text-xs">
                            <option value="flex-start">flex-start</option>
                            <option value="center" selected>center</option>
                            <option value="flex-end">flex-end</option>
                            <option value="space-between">space-between</option>
                            <option value="space-around">space-around</option>
                        </select>
                    </div>
                    <div><label class="text-[10px] uppercase text-stone-500">Align Items</label>
                        <select id="flx-a" class="w-full bg-black border border-white/10 p-2 rounded text-white text-xs">
                            <option value="flex-start">flex-start</option>
                            <option value="center" selected>center</option>
                            <option value="flex-end">flex-end</option>
                            <option value="stretch">stretch</option>
                        </select>
                    </div>
                </div>
                <div id="flx-p" class="h-48 bg-zinc-900 border border-white/5 rounded-2xl flex items-center justify-center gap-4 mb-8">
                    <div class="w-12 h-12 bg-white/20 border border-white/20 rounded"></div>
                    <div class="w-12 h-12 bg-white/40 border border-white/20 rounded"></div>
                    <div class="w-12 h-12 bg-white/60 border border-white/20 rounded"></div>
                </div>
                <div id="flx-c" class="p-4 bg-zinc-900 rounded font-mono text-blue-400 text-xs text-left">display: flex; justify-content: center; align-items: center;</div>
            </div>
        `;
        const update = () => {
            const j = document.getElementById('flx-j').value;
            const a = document.getElementById('flx-a').value;
            const p = document.getElementById('flx-p');
            p.style.justifyContent = j;
            p.style.alignItems = a;
            document.getElementById('flx-c').innerText = `display: flex; justify-content: ${j}; align-items: ${a};`;
        };
        ['flx-j', 'flx-a'].forEach(id => document.getElementById(id).onchange = update);
    }

    renderGridStyle() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Grid Signal</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Columns</label><input id="gri-c" type="number" value="3" class="w-full bg-black border border-white/10 p-2 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Gap (px)</label><input id="gri-g" type="number" value="16" class="w-full bg-black border border-white/10 p-2 rounded text-white"></div>
                </div>
                <div id="gri-p" class="p-4 bg-zinc-900 border border-white/5 rounded-2xl grid grid-cols-3 gap-4 mb-8">
                    ${Array(6).fill('<div class="h-20 bg-white/10 border border-white/10 rounded"></div>').join('')}
                </div>
                <div id="gri-f" class="p-4 bg-zinc-900 rounded font-mono text-blue-400 text-xs text-left">display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;</div>
            </div>
        `;
        const update = () => {
            const c = document.getElementById('gri-c').value;
            const g = document.getElementById('gri-g').value;
            const p = document.getElementById('gri-p');
            p.style.gridTemplateColumns = `repeat(${c}, 1fr)`;
            p.style.gap = `${g}px`;
            document.getElementById('gri-f').innerText = `display: grid; grid-template-columns: repeat(${c}, 1fr); gap: ${g}px;`;
        };
        ['gri-c', 'gri-g'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderMix() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Synthesis Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <input id="mix-1" type="color" value="#0000ff" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                    <input id="mix-2" type="color" value="#ff0000" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                </div>
                <div id="mix-o" class="h-32 rounded-3xl border border-white/10 mb-8 flex items-center justify-center text-white font-mono text-xl" style="background: #800080">#800080</div>
                <div class="text-[10px] uppercase tracking-widest text-stone-500">Proportional Protocol Intersection</div>
            </div>
        `;
        const update = () => {
            const c1 = document.getElementById('mix-1').value;
            const c2 = document.getElementById('mix-2').value;
            const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
            const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
            const rm = Math.round((r1 + r2) / 2), gm = Math.round((g1 + g2) / 2), bm = Math.round((b1 + b2) / 2);
            const hex = "#" + [rm, gm, bm].map(v => v.toString(16).padStart(2, '0')).join('');
            document.getElementById('mix-o').style.background = hex;
            document.getElementById('mix-o').innerText = hex.toUpperCase();
        };
        ['mix-1', 'mix-2'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderGeometry() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Geometric Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Shape</label>
                        <select id="geo-s" class="w-full bg-black border border-white/10 p-3 rounded text-white text-xs">
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle (Equi)</option>
                        </select>
                    </div>
                    <div><label class="text-[10px] uppercase text-stone-500">Dimension (r/s)</label><input id="geo-d" type="number" value="10" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Area</div><div id="geo-a" class="text-2xl font-bold">314.16</div></div>
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Perim.</div><div id="geo-p" class="text-2xl font-bold">62.83</div></div>
                </div>
            </div>
        `;
        const update = () => {
            const s = document.getElementById('geo-s').value;
            const d = parseFloat(document.getElementById('geo-d').value);
            let area = 0, perim = 0;
            if (s === 'circle') { area = Math.PI * d * d; perim = 2 * Math.PI * d; }
            else if (s === 'square') { area = d * d; perim = 4 * d; }
            else if (s === 'triangle') { area = (Math.sqrt(3) / 4) * d * d; perim = 3 * d; }
            document.getElementById('geo-a').innerText = area.toFixed(2);
            document.getElementById('geo-p').innerText = perim.toFixed(2);
        };
        ['geo-s', 'geo-d'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderStDev() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Variance Signal</h2>
                <textarea id="std-i" placeholder="10, 20, 30, 40, 50..." class="w-full h-32 bg-black border border-white/10 p-4 rounded text-white font-mono mb-8 text-center text-xl"></textarea>
                <div class="grid grid-cols-2 gap-2">
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Std Deviation</div><div id="std-s" class="text-2xl font-bold text-white">14.14</div></div>
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Variance</div><div id="std-v" class="text-2xl font-bold text-white">200.00</div></div>
                </div>
            </div>
        `;
        document.getElementById('std-i').oninput = (e) => {
            const nums = e.target.value.split(',').map(Number).filter(n => !isNaN(n));
            if (nums.length < 2) return;
            const mean = nums.reduce((a, b) => a + b) / nums.length;
            const vari = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (nums.length - 1);
            document.getElementById('std-s').innerText = Math.sqrt(vari).toFixed(2);
            document.getElementById('std-v').innerText = vari.toFixed(2);
        };
    }

    renderBinary() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Logic Stream</h2>
                <input id="bin-i" type="number" value="255" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div id="bin-o" class="p-8 bg-zinc-900 border border-white/10 rounded-2xl font-mono text-green-400 text-3xl tracking-[0.2em] break-all">
                    11111111
                </div>
                <div class="mt-4 text-[10px] uppercase text-stone-500">8-Bit Data Distribution Protocol</div>
            </div>
        `;
        document.getElementById('bin-i').oninput = (e) => {
            const v = parseInt(e.target.value);
            document.getElementById('bin-o').innerText = isNaN(v) ? "00000000" : v.toString(2).padStart(8, '0');
        };
    }

    renderASCII() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">ASCII Signal</h2>
                <input id="asc-i" placeholder="A..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono" maxlength="10">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Decimal</div><div id="asc-d" class="text-3xl font-bold text-white">65</div></div>
                    <div class="p-8 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Hex</div><div id="asc-h" class="text-3xl font-bold text-white">0x41</div></div>
                </div>
            </div>
        `;
        document.getElementById('asc-i').oninput = (e) => {
            const v = e.target.value;
            if (!v) return;
            const codes = [...v].map(c => c.charCodeAt(0));
            document.getElementById('asc-d').innerText = codes.join(', ');
            document.getElementById('asc-h').innerText = codes.map(c => '0x' + c.toString(16).toUpperCase()).join(', ');
        };
    }

    renderSlug() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Slug Pulse</h2>
                <input id="slu-i" placeholder="Protocol Title Here..." class="w-full bg-black border border-white/10 p-6 rounded text-white text-3xl text-center mb-8">
                <div id="slu-o" class="p-8 bg-zinc-900 border border-white/10 rounded-2xl font-mono text-stone-400 text-xl overflow-hidden truncate">protocol-title-here</div>
                <div class="mt-4 text-[10px] uppercase text-stone-700">URL-Safe Structural Protocol</div>
            </div>
        `;
        document.getElementById('slu-i').oninput = (e) => {
            document.getElementById('slu-o').innerText = e.target.value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        };
    }

    renderSort() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Order Logic</h2>
                <div class="flex gap-2 mb-4">
                    <button id="srt-a" class="flex-1 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10">Alphabetical</button>
                    <button id="srt-l" class="flex-1 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10">Length</button>
                    <button id="srt-r" class="flex-1 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10">Reverse</button>
                </div>
                <textarea id="srt-i" placeholder="Gamma\nAlpha\nBeta..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
            </div>
        `;
        const el = document.getElementById('srt-i');
        document.getElementById('srt-a').onclick = () => { el.value = el.value.split('\n').sort().join('\n'); };
        document.getElementById('srt-l').onclick = () => { el.value = el.value.split('\n').sort((a, b) => a.length - b.length).join('\n'); };
        document.getElementById('srt-r').onclick = () => { el.value = el.value.split('\n').reverse().join('\n'); };
    }

    renderDedupe() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Distinct Pulse</h2>
                <textarea id="ded-i" placeholder="Item 1\nItem 1\nItem 2..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div id="ded-c" class="text-[10px] uppercase text-stone-500">Filtered 0 Redundant Protocols</div>
            </div>
        `;
        document.getElementById('ded-i').oninput = (e) => {
            const lines = e.target.value.split('\n');
            const unique = [...new Set(lines)];
            document.getElementById('ded-c').innerText = `Filtered ${lines.length - unique.length} Redundant Protocols`;
            if (e.target.dataset.updating) return; e.target.dataset.updating = "true";
            e.target.value = unique.join('\n');
            setTimeout(() => delete e.target.dataset.updating, 10);
        };
    }

    renderWordFreq() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Lexicon Density</h2>
                <textarea id="wfr-i" placeholder="Paste data block..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div id="wfr-o" class="grid grid-cols-2 md:grid-cols-4 gap-2"></div>
            </div>
        `;
        document.getElementById('wfr-i').oninput = (e) => {
            const words = e.target.value.toLowerCase().match(/\w+/g) || [];
            const counts = {}; words.forEach(w => counts[w] = (counts[w] || 0) + 1);
            const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 12);
            document.getElementById('wfr-o').innerHTML = sorted.map(([w, count]) => `
                 <div class="p-4 border border-white/5 bg-zinc-900 rounded font-mono">
                    <div class="text-[10px] text-stone-600 truncate">${w}</div>
                    <div class="font-bold text-white">${count}</div>
                 </div>
             `).join('');
        };
    }

    renderScratch() {
        const container = document.getElementById('tool-content');
        const saved = localStorage.getItem('omni-scratch') || "";
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Scratch Protocol</h2>
                <textarea id="scr-i" placeholder="Ephemeral data storage..." class="w-full h-[500px] bg-black border border-white/10 p-8 rounded text-stone-400 font-mono focus:border-white focus:outline-none transition-all">${saved}</textarea>
                <div class="mt-4 flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-700">
                    <span>Persistent Local State Active</span>
                    <button id="scr-c" class="hover:text-red-500 transition-colors">Clear Protocol</button>
                </div>
            </div>
        `;
        const el = document.getElementById('scr-i');
        el.oninput = (e) => { localStorage.setItem('omni-scratch', e.target.value); };
        document.getElementById('scr-c').onclick = () => { el.value = ""; localStorage.removeItem('omni-scratch'); };
    }

    renderAspectRatio() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Aspect Signal</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Width</label><input id="asp-w" type="number" value="1920" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Height</label><input id="asp-h" type="number" value="1080" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="asp-r" class="text-5xl font-black text-white">16:9</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Simplified Aspect Protocol</div>
                </div>
            </div>
        `;
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const update = () => {
            const w = parseInt(document.getElementById('asp-w').value);
            const h = parseInt(document.getElementById('asp-h').value);
            const common = gcd(w, h);
            document.getElementById('asp-r').innerText = `${w / common}:${h / common}`;
        };
        ['asp-w', 'asp-h'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderRemToPx() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Root Pivot</h2>
                <div class="flex items-center gap-4 mb-8">
                     <input id="rem-v" type="number" value="1" step="0.1" class="flex-1 bg-black border border-white/10 p-6 rounded text-white text-5xl text-center font-mono">
                     <div class="text-stone-700 text-2xl uppercase">REM</div>
                </div>
                <div class="p-12 border border-white/10 bg-white text-black rounded-3xl">
                    <div id="rem-o" class="text-7xl font-black">16px</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Absolute Pixel Protocol (Base 16)</div>
                </div>
            </div>
        `;
        document.getElementById('rem-v').oninput = (e) => {
            document.getElementById('rem-o').innerText = (e.target.value * 16) + "px";
        };
    }

    renderGolden() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Golden Signal</h2>
                <div class="space-y-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Known Dimension</label><input id="gol-i" type="number" value="100" class="w-full bg-black border border-white/10 p-4 rounded text-white text-2xl"></div>
                </div>
                <div class="grid grid-cols-2 gap-2 mt-8">
                    <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Major (x1.618)</div><div id="gol-ma" class="text-2xl font-bold text-white">161.8</div></div>
                    <div class="p-6 bg-zinc-900 rounded border border-white/5"><div class="text-[10px] text-stone-600">Minor (/1.618)</div><div id="gol-mi" class="text-2xl font-bold text-white">61.8</div></div>
                </div>
            </div>
        `;
        document.getElementById('gol-i').oninput = (e) => {
            const v = parseFloat(e.target.value) || 0;
            const phi = 1.61803398875;
            document.getElementById('gol-ma').innerText = (v * phi).toFixed(1);
            document.getElementById('gol-mi').innerText = (v / phi).toFixed(1);
        };
    }

    renderContrast() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Contrast Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-8">
                    <input id="con-f" type="color" value="#ffffff" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                    <input id="con-b" type="color" value="#000000" class="w-full h-16 bg-black border border-white/10 p-1 rounded cursor-pointer">
                </div>
                <div id="con-p" class="p-12 rounded-3xl mb-8 border border-white/10" style="background: #000; color: #fff; border-color: rgba(255,255,255,0.1)">
                    <div class="text-4xl font-bold mb-2">Protocol Sample</div>
                    <div class="text-sm opacity-70">The quick brown fox jumps over the lazy dog.</div>
                </div>
                <div id="con-r" class="p-8 border rounded-2xl bg-zinc-900 border-green-500/20">
                    <div class="text-4xl font-black text-white">21.0:1</div>
                    <div class="text-[10px] uppercase text-green-500 mt-2">Pass (AAA)</div>
                </div>
            </div>
        `;
        const getLuminance = (hex) => {
            const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
            const low = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
            return low[0] * 0.2126 + low[1] * 0.7152 + low[2] * 0.0722;
        };
        const update = () => {
            const f = document.getElementById('con-f').value;
            const b = document.getElementById('con-b').value;
            const l1 = getLuminance(f), l2 = getLuminance(b);
            const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
            const r = document.getElementById('con-r');
            const p = document.getElementById('con-p');
            p.style.backgroundColor = b; p.style.color = f;
            r.querySelector('.text-4xl').innerText = ratio.toFixed(1) + ":1";
            const status = ratio >= 7 ? "Pass (AAA)" : (ratio >= 4.5 ? "Pass (AA)" : "Fail");
            const color = ratio >= 4.5 ? "green" : "red";
            r.querySelector('.text-[10px]').innerText = status;
            r.className = `p-8 border rounded-2xl bg-zinc-900 border-${color}-500/20`;
            r.querySelector('.text-[10px]').className = `text-[10px] uppercase text-${color}-500 mt-2`;
        };
        ['con-f', 'con-b'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderCaseForge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Linguistic Pivot</h2>
                <div class="flex flex-wrap gap-2 mb-4 justify-center">
                    <button class="cas-btn px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded" data-t="cap">Uppercase</button>
                    <button class="cas-btn px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded" data-t="low">Lowercase</button>
                    <button class="cas-btn px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded" data-t="cam">camelCase</button>
                    <button class="cas-btn px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded" data-t="pas">PascalCase</button>
                    <button class="cas-btn px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded" data-t="sna">snake_case</button>
                </div>
                <textarea id="cas-i" placeholder="Paste linguistic stream..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
            </div>
        `;
        document.querySelectorAll('.cas-btn').forEach(btn => {
            btn.onclick = () => {
                const el = document.getElementById('cas-i');
                const v = el.value;
                const mode = btn.dataset.t;
                if (mode === 'cap') el.value = v.toUpperCase();
                else if (mode === 'low') el.value = v.toLowerCase();
                else {
                    const words = v.toLowerCase().match(/\w+/g) || [];
                    if (mode === 'cam') el.value = words.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('');
                    else if (mode === 'pas') el.value = words.map(w => w[0].toUpperCase() + w.slice(1)).join('');
                    else if (mode === 'sna') el.value = words.join('_');
                }
            };
        });
    }

    renderTrim() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Prune Pulse</h2>
                <div class="flex gap-2 mb-4">
                    <button id="tri-w" class="flex-1 py-3 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded">Trim Whitespace</button>
                    <button id="tri-e" class="flex-1 py-3 bg-white/5 border border-white/10 text-[10px] uppercase hover:bg-white/10 rounded">Prune Empty Lines</button>
                </div>
                <textarea id="tri-i" placeholder="Paste data block with noise..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
            </div>
        `;
        const el = document.getElementById('tri-i');
        document.getElementById('tri-w').onclick = () => { el.value = el.value.split('\n').map(l => l.trim()).join('\n'); };
        document.getElementById('tri-e').onclick = () => { el.value = el.value.split('\n').filter(l => l.trim()).join('\n'); };
    }

    renderPrefix() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Append Signal</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <input id="pre-p" placeholder="Prefix..." class="bg-black border border-white/10 p-3 rounded text-white font-mono text-sm">
                    <input id="pre-s" placeholder="Suffix..." class="bg-black border border-white/10 p-3 rounded text-white font-mono text-sm">
                </div>
                <textarea id="pre-i" placeholder="Line 1\nLine 2..." class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div class="flex gap-2">
                     <button id="pre-g" class="flex-1 py-4 bg-white text-black font-bold uppercase tracking-widest rounded hover:shadow-[0_0_20px_white] transition-all">Execute Injection</button>
                </div>
            </div>
        `;
        document.getElementById('pre-g').onclick = () => {
            const p = document.getElementById('pre-p').value;
            const s = document.getElementById('pre-s').value;
            const el = document.getElementById('pre-i');
            el.value = el.value.split('\n').map(l => p + l + s).join('\n');
        };
    }

    renderROT13() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">ROT13 Cipher</h2>
                <textarea id="rot-i" placeholder="Paste data stream..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-4 text-center text-xl"></textarea>
                <div class="p-8 bg-zinc-900 border border-white/10 rounded-2xl font-mono text-blue-400 text-xl overflow-hidden truncate" id="rot-o">ROT13 Protocol Output</div>
            </div>
        `;
        document.getElementById('rot-i').oninput = (e) => {
            const v = e.target.value;
            document.getElementById('rot-o').innerText = v.replace(/[a-zA-Z]/g, c => {
                return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
            });
        };
    }

    renderJsonToYaml() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-4xl mx-auto animate-fade-in">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest text-center">Structure Pivot</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <textarea id="jty-i" placeholder='{"protocol": "alpha"}' class="h-96 bg-black border border-white/10 p-6 rounded text-white font-mono text-sm"></textarea>
                    <textarea id="jty-o" readonly class="h-96 bg-zinc-900/50 border border-white/10 p-6 rounded text-stone-500 font-mono text-xs italic"></textarea>
                </div>
            </div>
        `;
        document.getElementById('jty-i').oninput = (e) => {
            try {
                const obj = JSON.parse(e.target.value);
                const toYaml = (val, indent = 0) => {
                    if (typeof val !== 'object' || val === null) return String(val);
                    return Object.entries(val).map(([k, v]) => {
                        const spacer = ' '.repeat(indent);
                        if (typeof v === 'object' && v !== null) {
                            return `${spacer}${k}:\n${toYaml(v, indent + 2)}`;
                        }
                        return `${spacer}${k}: ${v}`;
                    }).join('\n');
                };
                document.getElementById('jty-o').value = toYaml(obj);
            } catch (err) { document.getElementById('jty-o').value = "Invalid JSON Protocol Signal."; }
        };
    }

    renderCSSMinify() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Compression Signal</h2>
                <textarea id="csm-i" placeholder=".protocol { margin: 0; }" class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <div class="p-4 bg-zinc-900 border border-white/5 rounded font-mono text-blue-400 text-xs text-left" id="csm-o">.protocol{margin:0}</div>
            </div>
        `;
        document.getElementById('csm-i').oninput = (e) => {
            document.getElementById('csm-o').innerText = e.target.value.replace(/\s+/g, ' ').replace(/\s?([\{\}:;,])\s?/g, '$1').replace(/\/\*.*?\*\//g, '').trim();
        };
    }

    renderSQL() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Query Audit</h2>
                <textarea id="sql-i" placeholder="SELECT * FROM protocols WHERE status='active'" class="w-full h-64 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8"></textarea>
                <textarea id="sql-o" readonly class="w-full h-32 bg-zinc-900/50 border border-white/10 p-4 rounded text-blue-400 font-mono text-xs"></textarea>
            </div>
        `;
        document.getElementById('sql-i').oninput = (e) => {
            const v = e.target.value;
            document.getElementById('sql-o').value = v.replace(/\b(SELECT|FROM|WHERE|INSERT|INTO|UPDATE|SET|DELETE|AND|OR|GROUP|BY|ORDER|LIMIT|JOIN|LEFT|RIGHT|INNER|ON|AS)\b/gi, m => m.toUpperCase() + '\n  ').trim();
        };
    }

    renderPayback() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Payback Pulse</h2>
                <div class="grid grid-cols-2 gap-4 mb-8 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Initial Cost ($)</label><input id="pay-c" type="number" value="10000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Monthly Gain ($)</label><input id="pay-g" type="number" value="500" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="pay-o" class="text-6xl font-black text-white">20.0</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Months to Capital Equilibrium</div>
                </div>
            </div>
        `;
        const update = () => {
            const c = parseFloat(document.getElementById('pay-c').value);
            const g = parseFloat(document.getElementById('pay-g').value);
            document.getElementById('pay-o').innerText = (c / g).toFixed(1);
        };
        ['pay-c', 'pay-g'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderDividend() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Yield Logic</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Annual Div ($)</label><input id="div-a" type="number" value="5" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Share Price ($)</label><input id="div-p" type="number" value="100" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-12 border border-green-500/20 bg-green-500/5 rounded-3xl">
                    <div id="div-o" class="text-7xl font-black text-green-400">5.0%</div>
                    <div class="text-[10px] uppercase text-green-700 mt-2">Capital Dividend Yield Protocol</div>
                </div>
            </div>
        `;
        const update = () => {
            const a = parseFloat(document.getElementById('div-a').value);
            const p = parseFloat(document.getElementById('div-p').value);
            document.getElementById('div-o').innerText = ((a / p) * 100).toFixed(2) + "%";
        };
        ['div-a', 'div-p'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderProfit() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Net Margin Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Revenue ($)</label><input id="pro-r" type="number" value="10000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Net Profit ($)</label><input id="pro-p" type="number" value="2000" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-12 border border-white/10 bg-white text-black rounded-3xl">
                    <div id="pro-o" class="text-7xl font-black">20.0%</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Absolute Profit Efficiency Protocol</div>
                </div>
            </div>
        `;
        const update = () => {
            const r = parseFloat(document.getElementById('pro-r').value);
            const p = parseFloat(document.getElementById('pro-p').value);
            document.getElementById('pro-o').innerText = ((p / r) * 100).toFixed(1) + "%";
        };
        ['pro-r', 'pro-p'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderBMIImperial() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Imperial Audit</h2>
                <div class="grid grid-cols-2 gap-4 mb-4 text-left">
                    <div><label class="text-[10px] uppercase text-stone-500">Weight (lbs)</label><input id="bmi-i-w" type="number" value="160" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                    <div><label class="text-[10px] uppercase text-stone-500">Height (in)</label><input id="bmi-i-h" type="number" value="70" class="w-full bg-black border border-white/10 p-3 rounded text-white"></div>
                </div>
                <div class="p-12 border border-white/10 bg-zinc-900 rounded-3xl">
                    <div id="bmi-i-o" class="text-6xl font-black text-white">22.9</div>
                    <div class="text-[10px] uppercase text-stone-500 mt-2">Body Mass Index (Imperial Protocol)</div>
                </div>
            </div>
        `;
        const update = () => {
            const w = parseFloat(document.getElementById('bmi-i-w').value);
            const h = parseFloat(document.getElementById('bmi-i-h').value);
            const res = (w / (h * h)) * 703;
            document.getElementById('bmi-i-o').innerText = res.toFixed(1);
        };
        ['bmi-i-w', 'bmi-i-h'].forEach(id => document.getElementById(id).oninput = update);
    }

    renderWaterDemand() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Vessel Demand</h2>
                <input id="wat-d-w" type="number" value="70" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div class="p-12 border border-blue-500/20 bg-blue-500/5 rounded-3xl">
                    <div id="wat-d-o" class="text-6xl font-black text-blue-400">2.3 L</div>
                    <div class="text-[10px] uppercase text-blue-700 mt-2">Recommended Daily Aqueous Signal</div>
                </div>
            </div>
        `;
        document.getElementById('wat-d-w').oninput = (e) => {
            const w = parseFloat(e.target.value) || 0;
            document.getElementById('wat-d-o').innerText = (w * 0.033).toFixed(1) + " L";
        };
    }

    renderProtein() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-md mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Synthesis Logic</h2>
                <input id="pro-s-w" type="number" value="70" class="w-full bg-black border border-white/10 p-6 rounded text-white text-5xl text-center mb-8 font-mono">
                <div class="p-12 border border-white/10 bg-white text-black rounded-3xl">
                    <div id="pro-s-o" class="text-6xl font-black">112g</div>
                    <div class="text-[10px] uppercase font-bold mt-2">Daily Protein Requirement (1.6g/kg)</div>
                </div>
            </div>
        `;
        document.getElementById('pro-s-w').oninput = (e) => {
            const w = parseFloat(e.target.value) || 0;
            document.getElementById('pro-s-o').innerText = Math.round(w * 1.6) + "g";
        };
    }

    renderRandomChoice() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Selection Logic</h2>
                <textarea id="rnd-i" placeholder="Entity 1\nEntity 2\nEntity 3..." class="w-full h-48 bg-black border border-white/10 p-6 rounded text-white font-mono mb-8 text-center"></textarea>
                <div class="p-12 bg-white text-black rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    <div id="rnd-o" class="text-4xl font-black uppercase tracking-widest">Protocol Ready</div>
                </div>
                <button id="rnd-g" class="w-full mt-4 py-4 bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">Extract Random Signal</button>
            </div>
        `;
        document.getElementById('rnd-g').onclick = () => {
            const lines = document.getElementById('rnd-i').value.split('\n').filter(l => l.trim());
            if (!lines.length) return;
            document.getElementById('rnd-o').innerText = lines[Math.floor(Math.random() * lines.length)];
        };
    }

    renderImageForge() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Visual Forge</h2>
                <div class="p-12 border-2 border-dashed border-white/10 rounded-3xl mb-8 group hover:border-white transition-all">
                    <input type="file" id="img-i" class="hidden">
                    <label for="img-i" class="cursor-pointer">
                        <div class="text-stone-500 group-hover:text-blue-400 transition-colors">upload visual entity</div>
                    </label>
                </div>
                <textarea id="img-o" readonly class="w-full h-48 bg-zinc-900/50 border border-white/10 p-4 rounded text-stone-500 font-mono text-xs italic overflow-hidden"></textarea>
            </div>
        `;
        document.getElementById('img-i').onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (re) => {
                document.getElementById('img-o').value = re.target.result;
            };
            reader.readAsDataURL(file);
        };
    }

    renderLorem() {
        const container = document.getElementById('tool-content');
        container.innerHTML = `
            <div class="max-w-2xl mx-auto animate-fade-in text-center">
                <h2 class="text-3xl font-bold font-['Cinzel'] mb-12 tracking-widest">Filler Signal</h2>
                <div class="flex gap-4 mb-4">
                     <input id="lor-n" type="number" value="3" class="w-24 bg-black border border-white/10 p-3 rounded text-white text-center">
                     <button id="lor-g" class="flex-1 py-3 bg-white text-black font-bold uppercase tracking-widest rounded">Generate Noise</button>
                </div>
                <textarea id="lor-o" readonly class="w-full h-64 bg-zinc-900/50 border border-white/10 p-6 rounded text-stone-400 italic font-mono"></textarea>
            </div>
        `;
        const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(' ');
        document.getElementById('lor-g').onclick = () => {
            const n = parseInt(document.getElementById('lor-n').value);
            let res = "";
            for (let i = 0; i < n; i++) {
                let s = ""; for (let j = 0; j < 15; j++) s += words[Math.floor(Math.random() * words.length)] + " ";
                res += s.charAt(0).toUpperCase() + s.slice(1).trim() + ".\n\n";
            }
            document.getElementById('lor-o').value = res.trim();
        };
    }
}
