// MADE AUTOMATICALLY by "Website only/build-legal-pages.py" from the documents in legal-review/source files/.
// Do not edit: change the original document and run the script again.

export type Span = { t: string; b?: boolean };
export type Block =
  | { k: "h"; level: number; text: string }
  | { k: "p"; s: Span[] }
  | { k: "lines"; lines: Span[][] }
  | { k: "ul"; items: Span[][] };
export type LegalDoc = { title: string; updated: string; blocks: Block[] };

/** True while any document still has a [blank] to fill in. The site must not be published until this is false. */
export const HAS_BLANKS = false;

export const LEGAL: Record<"terms" | "privacy" | "health", LegalDoc> = {
 "terms": {
  "title": "Terms of Service",
  "updated": "October 5, 2026",
  "blocks": [
   {
    "k": "p",
    "s": [
     {
      "t": "These Terms are an agreement between you and Directive LLC, a Kentucky limited liability company (\"Directive\", \"we\", \"us\"). They cover the Directive mobile app (the \"App\") and the website at directivefitness.com (the \"Website\"). Together we call them the \"Service\"."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App is available for iPhone. Where these Terms mention Android, Health Connect or Google Play, they apply once the App is available on Android."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You agree to these Terms and to our Privacy Policy when you tick the box in the App that says you agree, when you join the beta test, or when you submit an application or a message on the Website. If you do not agree, do not use the Service."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "1. Who can use Directive"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Directive is for adults. You must be at least 18 years old to use the Service. Before you can use the App you are asked to consent to it handling your health information on your device; without that consent the App cannot be used, and you can withdraw it at any time in the App's Settings. The App requests an age-range signal from your device's operating system or app store, asks for your date of birth as a second measure, and will not continue for anyone under 18."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App is offered in the United States. If you use it elsewhere, you are responsible for following your local law."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "2. Health and safety: please read this"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Directive is an informational tool designed to assist with personal fitness, nutrition planning, and macro-tracking. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified physician or healthcare professional before beginning any new diet, caloric deficit program, or exercise regimen, particularly if you are managing a medical condition, taking prescription medications such as GLP-1 agonists, or experiencing rapid weight changes.",
      "b": true
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The Service's calculations are based on general nutritional formulas. They have not been clinically validated, including for people with medical conditions or people using medications that affect appetite, weight or metabolism."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "California notice (Business and Professions Code section 2068): NOTICE: State law allows any person to provide nutritional advice or give advice concerning proper nutrition—which is the giving of advice as to the role of food and food ingredients, including dietary supplements. This state law does NOT confer authority to practice medicine or to undertake the diagnosis, prevention, treatment, or cure of any disease, pain, deformity, injury, or physical or mental condition and specifically does not authorize any person other than one who is a licensed health practitioner to state that any product might cure any disease, disorder, or condition."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Directive is not a medical device. It is not intended to diagnose, treat, cure or prevent any disease or condition."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "What the App gives you are estimates. Your calorie and macronutrient targets, your weight trend, your body-fat estimate, your projected dates and every recommendation are calculated from the figures you enter or import and from general formulas. They can be wrong for you. The App does not know your medical history."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App advises; you decide. It includes settings that produce a large calorie deficit, including a short-term mode called Afterburner. The App may warn you about such a setting, but it will not stop you from choosing it. A recommendation in the App is never an instruction, and nothing changes in your plan unless you choose it."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Do not use Directive to restrict your eating, to lose weight, or to increase your training without first getting the approval of a qualified healthcare professional if any of these apply to you:",
      "b": true
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "you are pregnant, trying to become pregnant, or breastfeeding;"
      }
     ],
     [
      {
       "t": "you have, or have had, an eating disorder or disordered eating;"
      }
     ],
     [
      {
       "t": "you have diabetes, heart, kidney or liver disease, or any other condition affected by diet or exercise;"
      }
     ],
     [
      {
       "t": "you take prescription medication, including GLP-1 or other appetite-modulating medication;"
      }
     ],
     [
      {
       "t": "you are underweight, or you have been told by a healthcare professional not to lose weight."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Stop and seek medical help if you feel faint, dizzy or unwell, or if you have chest pain or trouble breathing during exercise. In an emergency, call 911."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "A report created by the App, including one labeled for a doctor, trainer or nutritionist, is a summary of the figures you entered. It is not a medical record and it is not a diagnosis."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "YOU USE THE SERVICE AT YOUR OWN RISK. YOU ARE RESPONSIBLE FOR YOUR OWN DECISIONS ABOUT DIET, EXERCISE, MEDICATION AND HEALTH. YOU UNDERSTAND THAT CHANGING YOUR DIET, LOSING OR GAINING WEIGHT, AND EXERCISING CARRY INHERENT RISKS, INCLUDING THE RISK OF INJURY AND ILLNESS, AND YOU VOLUNTARILY ASSUME THOSE RISKS. TO THE FULLEST EXTENT ALLOWED BY LAW, YOU RELEASE US FROM ALL CLAIMS FOR PERSONAL INJURY, ILLNESS OR ANY OTHER HEALTH OUTCOME ARISING FROM YOUR USE OF THE SERVICE, INCLUDING CLAIMS ARISING FROM OUR OWN NEGLIGENCE. THIS RELEASE DOES NOT APPLY TO OUR GROSS NEGLIGENCE, RECKLESSNESS OR INTENTIONAL MISCONDUCT, OR TO ANY LIABILITY THAT CANNOT BE RELEASED BY LAW.",
      "b": true
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "3. Your data stays on your device"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App has no accounts and no sign-in. Everything you enter is stored on your own device. We do not hold a copy, and the App does not send it to us."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Information leaves your device only in the ways our Privacy Policy describes: a file you choose to create and share; your device's own backup, if you have it turned on; the subscription record kept by the app store and by our subscription provider once paid plans are available, which contains no health information; and what your app store's beta testing service collects during the beta."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "That means:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "If you delete the App, use \"Delete all my data\" in its Settings, or lose, reset or replace your device, your data is gone unless you kept a backup.",
       "b": true
      },
      {
       "t": " We cannot recover it for you."
      }
     ],
     [
      {
       "t": "The App lets you save a backup file and restore from it. The file is encrypted with a password you choose. "
      },
      {
       "t": "We do not keep that password and cannot recover it: if you lose it, the backup cannot be opened.",
       "b": true
      },
      {
       "t": " Keeping the file and its password safe is your responsibility."
      }
     ],
     [
      {
       "t": "Other files the App can create for you (a report, a spreadsheet, a calendar file) are not encrypted. Anyone who can open one can read it."
      }
     ],
     [
      {
       "t": "You are responsible for the accuracy of what you enter, and for keeping your own device secure."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Our Privacy Policy explains this in full."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "4. Your license to use the App"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We give you a personal, non-exclusive, non-transferable, revocable license to install and use the App on devices that you own or control (Apple-branded devices, if you got the App from Apple's App Store), for your own personal, non-commercial use, as allowed by the rules of the app store you got it from, including Apple's Usage Rules in the Apple Media Services Terms and Conditions. The App is licensed to you, not sold. A subscription gives you access to paid features for as long as the subscription is active; it does not give you ownership of the App or of any part of it."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You may not:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "copy, modify, or create derivative works from the App;"
      }
     ],
     [
      {
       "t": "reverse engineer or decompile the App, except where the law does not allow this restriction;"
      }
     ],
     [
      {
       "t": "sell, rent, lease, sublicense or redistribute the App;"
      }
     ],
     [
      {
       "t": "remove any proprietary notice;"
      }
     ],
     [
      {
       "t": "use the App or the Website in a way that breaks the law or harms us or anyone else;"
      }
     ],
     [
      {
       "t": "attempt to get around the App's subscription or feature limits."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "5. Ownership"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The Service, including its software, design, text, graphics, calculations and the Directive name and logo, belongs to us or our licensors and is protected by law. These Terms do not give you any right in it other than the license in section 4."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The information you enter is yours."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you send us feedback, ideas or suggestions, you allow us to use them freely, without payment or obligation to you."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "6. The beta test"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Before public release, the App is offered as a free beta test through your app store's beta testing service (Apple's TestFlight on iPhone). If you take part:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "The beta is provided for testing. It may contain errors, lose data, change without notice, or stop working. Keep a backup file if your data matters to you."
      }
     ],
     [
      {
       "t": "Every feature is unlocked during the beta, and nothing is sold. "
      },
      {
       "t": "This is temporary.",
       "b": true
      },
      {
       "t": " When paid plans are introduced, some features will require a subscription, as described in section 7. Taking part in the beta does not give you a right to keep any feature free afterwards."
      }
     ],
     [
      {
       "t": "We may end the beta, or your access to it, at any time."
      }
     ],
     [
      {
       "t": "The beta testing service's own terms also apply to your use of the beta."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "7. Plans, the free trial and subscriptions"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "This section applies once paid plans are available in the App."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Plans.",
      "b": true
     },
     {
      "t": " The App has a free plan and two paid plans, called Cruise and Pro. The features in each plan, and the price, are shown in the App before you subscribe. At the time of writing the prices in the United States are $2.99 a month for Cruise and $6.99 a month for Pro. We may change prices for new subscribers. We will not raise the price of a subscription you already have without clear notice between 7 and 30 days before the new price applies. The notice states the new price and how to cancel, and it is given by the app store and in the App. If you do not want to pay the new price, cancel before it applies and you will not be charged it."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The free trial.",
      "b": true
     },
     {
      "t": " When you first install the App you get 14 days of Pro features at no charge. You do not need to give payment details, and you are not charged when the trial ends. When it ends, the App moves to the free plan unless you choose to subscribe. The trial is offered once per installation."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Subscriptions renew automatically.",
      "b": true
     },
     {
      "t": " A paid plan is a monthly subscription taken out through your app store account (your Apple Account or your Google account) using the app store's in-app purchase. "
     },
     {
      "t": "Payment is charged to your app store account when you confirm the purchase. The subscription renews automatically every month, at the price then in effect, until you cancel. To avoid being charged for the next month, cancel at least 24 hours before the end of the current period. Your app store account is charged for the renewal within 24 hours before the end of the current period.",
      "b": true
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "How to cancel.",
      "b": true
     },
     {
      "t": " You can cancel at any time in your device's subscription settings. On an iPhone: open Settings, tap your name, then Subscriptions, then Directive, then Cancel Subscription. On Android: open the Google Play app, tap your profile picture, then Payments and subscriptions, then Subscriptions, then Directive, then Cancel subscription. Deleting the App does not cancel a subscription. When you cancel, you keep the paid features until the end of the period you have paid for."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Refunds.",
      "b": true
     },
     {
      "t": " Payments are processed by the app store you subscribed through (Apple's App Store or Google Play), and refund requests are handled under that app store's policies. We cannot issue refunds ourselves. To ask for a refund of an App Store subscription, use Apple's refund page at reportaproblem.apple.com. To ask for a refund of a Google Play subscription, use Google Play's refund help page at support.google.com/googleplay/answer/2479637. You can cancel at any time in your device's subscription settings; canceling stops the next renewal. Except where the law requires it, payments are not refundable and we do not give refunds or credits for part of a subscription period. If the law where you live gives you a right to cancel and receive a refund, nothing in these Terms limits that right."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "When a paid plan or the trial ends.",
      "b": true
     },
     {
      "t": " The features of that plan stop. If a Pro-only program (a Targeted Refeed or Afterburner) is running at that moment, it ends, and the App goes back to calculating your ordinary daily targets. Your recorded data stays on your device; ending a plan deletes nothing."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Changing plans.",
      "b": true
     },
     {
      "t": " You can change between Cruise and Pro in your app store's subscription settings. The app store decides when the change takes effect and how any difference is charged."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "8. Charter applications on the Website"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The Website lets you apply for Charter Access by giving your email address and answering some questions. Charter Access is offered in limited groups. Applying records your place and your priority for the current intake; it does not guarantee access, a place in the beta, or any price or benefit. We may change the number of places or the timing at our discretion. You can withdraw your application at any time by emailing privacy@directivefitness.com."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "9. Changes to the Service"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We may add, change or remove features, and we may stop offering the App or the Website. If we remove a paid feature for which you have a current subscription, your remedy is to cancel the subscription, and you may ask the app store for a refund."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "10. Third-party services"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App can read information from your device's health service (Apple Health on iPhone, Health Connect on Android) if you allow it, and it uses the app store's in-app purchase and a subscription service called RevenueCat. Other products you may use with it, such as a smart scale, a watch or a fitness tracker, are provided by other companies. We are not responsible for those products or for the accuracy of the data they produce."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "11. Ending these Terms"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You can stop using the Service at any time by deleting the App. To end a subscription you must also cancel it as described in section 7."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We may suspend or end your right to use the Service if you break these Terms. Sections 2, 5, 12 to 16 and 18 continue to apply after these Terms end."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "12. Disclaimer of warranties"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "THE SERVICE IS PROVIDED FOR INFORMATIONAL PURPOSES ONLY AND IS NOT MEDICAL ADVICE. THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\". TO THE FULLEST EXTENT ALLOWED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ACCURATE, UNINTERRUPTED OR ERROR-FREE, THAT YOUR DATA WILL NOT BE LOST, OR THAT USING THE SERVICE WILL PRODUCE ANY PARTICULAR RESULT, INCLUDING ANY WEIGHT, BODY-COMPOSITION, FITNESS OR HEALTH RESULT.",
      "b": true
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Some states do not allow certain warranties to be excluded, so some of the above may not apply to you."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "13. Limitation of liability"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "TO THE FULLEST EXTENT ALLOWED BY LAW, WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF DATA, ARISING FROM OR RELATED TO THE SERVICE OR THESE TERMS, EVEN IF WE HAVE BEEN TOLD THAT SUCH DAMAGES ARE POSSIBLE. THIS LIMITATION DOES NOT APPLY TO LIABILITY ARISING FROM OUR GROSS NEGLIGENCE, RECKLESSNESS OR INTENTIONAL MISCONDUCT, OR TO ANY LIABILITY THAT CANNOT BE LIMITED BY LAW, INCLUDING LIABILITY FOR PERSONAL INJURY WHERE THE LAW DOES NOT ALLOW IT TO BE LIMITED.",
      "b": true
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICE OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID FOR THE APP IN THE 12 MONTHS BEFORE THE CLAIM AROSE, OR (B) US $100. THIS CAP DOES NOT APPLY TO LIABILITY ARISING FROM OUR GROSS NEGLIGENCE, RECKLESSNESS OR INTENTIONAL MISCONDUCT, OR TO ANY LIABILITY THAT CANNOT BE LIMITED BY LAW.",
      "b": true
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Some states do not allow certain limitations of liability, so some of the above may not apply to you. Nothing in these Terms limits liability that cannot be limited by law."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "14. Your responsibility to us"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "To the extent the law allows, you agree to cover our reasonable losses and costs, including legal fees, arising from a claim by someone else that results from your breach of these Terms or your misuse of the Service."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "15. Governing law and disputes"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "These Terms are governed by the laws of the Commonwealth of Kentucky, without regard to its conflict-of-law rules."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you have a dispute with us, please contact us first at legal@directivefitness.com. We will try to resolve it informally within 60 days. If we cannot, any claim must be brought exclusively in the state or federal courts located in Fayette County, Kentucky, and you and we agree to the exclusive jurisdiction of those courts. Either of us may instead bring an individual claim in small claims court where you live, if it qualifies. Nothing in this section takes away any right the law of the place where you live gives you to bring a claim there."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "16. Terms required by Apple"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "This section applies if you got the App from Apple's App Store."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "These Terms are between you and us, not Apple. Apple is not responsible for the App or its content."
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "Support.",
       "b": true
      },
      {
       "t": " We are solely responsible for support and maintenance of the App. Apple has no obligation to provide any."
      }
     ],
     [
      {
       "t": "Warranty.",
       "b": true
      },
      {
       "t": " If the App fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price, if any. To the fullest extent allowed by law, Apple has no other warranty obligation for the App."
      }
     ],
     [
      {
       "t": "Claims.",
       "b": true
      },
      {
       "t": " We, not Apple, are responsible for addressing any claims relating to the App, including product liability claims, claims that the App fails to conform to a legal requirement, and consumer protection or privacy claims."
      }
     ],
     [
      {
       "t": "Intellectual property.",
       "b": true
      },
      {
       "t": " If someone claims that the App infringes their intellectual property rights, we, not Apple, are responsible for dealing with that claim."
      }
     ],
     [
      {
       "t": "Legal compliance.",
       "b": true
      },
      {
       "t": " You confirm that you are not located in a country subject to a US Government embargo or designated as a \"terrorist supporting\" country, and that you are not on any US Government list of prohibited or restricted parties."
      }
     ],
     [
      {
       "t": "Third-party beneficiary.",
       "b": true
      },
      {
       "t": " Apple and its subsidiaries are third-party beneficiaries of these Terms. Once you accept these Terms, Apple has the right to enforce them against you as a third-party beneficiary."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "17. Changes to these Terms"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We may update these Terms. When we do, we will change the date at the top. If a change is material, we will give you notice before it takes effect, through a prominent notice in the App and on the Website, at least 30 days in advance unless the law requires the change sooner. When a material change takes effect, the App asks you to agree to the updated Terms before you continue using it. A change does not apply to a dispute that arose before it took effect. If you keep using the Service after a change takes effect, you accept the updated Terms. If you do not agree, stop using the Service and cancel any subscription."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "18. General"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If a court finds part of these Terms unenforceable, the rest remains in effect. If we do not enforce a term, that is not a waiver of it. You may not transfer your rights under these Terms; we may transfer ours as part of a sale or reorganization of the business. These Terms and the Privacy Policy are the entire agreement between you and us about the Service."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "19. Contact"
   },
   {
    "k": "lines",
    "lines": [
     [
      {
       "t": "Directive LLC"
      }
     ],
     [
      {
       "t": "952 Winchester Rd, Unit #308, Lexington, KY 40505"
      }
     ],
     [
      {
       "t": "Legal questions: legal@directivefitness.com"
      }
     ],
     [
      {
       "t": "Support: support@directivefitness.com, or the support form at directivefitness.com/support"
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "California residents. Under California Civil Code section 1789.3, California users are entitled to the following consumer rights notice. The Service is provided by Directive LLC, 952 Winchester Rd, Unit #308, Lexington, KY 40505. The Website is free to use. The App's plans and prices are described in section 7. If you have a complaint about the Service, or want more information about using it, contact us at legal@directivefitness.com. You may also contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834, or by telephone at (800) 952-5210."
     }
    ]
   }
  ]
 },
 "privacy": {
  "title": "Privacy Policy",
  "updated": "October 5, 2026",
  "blocks": [
   {
    "k": "p",
    "s": [
     {
      "t": "This policy explains what information Directive handles and what happens to it. It covers the Directive mobile app (the \"App\") and the website at directivefitness.com (the \"Website\"). Directive is published by Directive LLC, 952 Winchester Rd, Unit #308, Lexington, KY 40505 (\"Directive\", \"we\", \"us\")."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "In this policy, \"personal information\" means information that identifies you, relates to you, or could reasonably be linked to you. It includes the health and fitness information described in sections 1 and 2. It does not include information that has been de-identified or combined so that it can no longer reasonably be linked to you."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App is available for iPhone. Where this policy mentions Android, Health Connect or Google Play, it applies once the App is available on Android."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "The short version"
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "Everything you enter into the App, and everything it reads from your device's health service (Apple Health on iPhone, Health Connect on Android), is collected and stored only on your own device. The App does not transmit it to us or to anyone else, and we have no access to it. Your device's own backup may include it, as explained in section 6. Please review our separate Consumer Health Data Privacy Policy for the categories of health data we process, our specific purposes for collecting it, and your rights to access or delete your information. It applies to every user, and it gives residents of Washington, Nevada, Connecticut and other states with specific health privacy protections the disclosures those laws require. We do not collect or process your consumer health data without your explicit, separate opt-in consent."
      }
     ],
     [
      {
       "t": "The App has no accounts and no sign-in, and we run no server that receives your App data."
      }
     ],
     [
      {
       "t": "The App contains no advertising and no analytics or tracking software. When paid plans are available, we use RevenueCat to manage subscriptions and process purchase-related data, as described in section 4 below. RevenueCat never receives your health information, and it is not started until you have given your consent."
      }
     ],
     [
      {
       "t": "We never sell your information. Health information is never used for advertising or marketing and is never given to data brokers."
      }
     ],
     [
      {
       "t": "If you buy a subscription, the app store you bought it from (Apple's App Store or Google Play) and our subscription provider, RevenueCat, process the purchase. They do not receive your health information."
      }
     ],
     [
      {
       "t": "The Website collects only what you type into its application form or support form."
      }
     ],
     [
      {
       "t": "Directive is for adults aged 18 and over."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "1. The App: information you enter"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "To work, the App asks for or lets you record:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "Profile:",
       "b": true
      },
      {
       "t": " sex, height and date of birth."
      }
     ],
     [
      {
       "t": "Body data:",
       "b": true
      },
      {
       "t": " weight, target weight, and waist, neck and hip measurements, from which the App estimates your body fat."
      }
     ],
     [
      {
       "t": "Nutrition:",
       "b": true
      },
      {
       "t": " the food and drink you log, as calories, protein, carbohydrate, fat, alcohol and fluids."
      }
     ],
     [
      {
       "t": "Activity and recovery:",
       "b": true
      },
      {
       "t": " steps, workouts, resting heart rate and sleep."
      }
     ],
     [
      {
       "t": "Optional health details:",
       "b": true
      },
      {
       "t": " your menstrual cycle start dates, cycle length and period length; your menopause status; and whether you use a GLP-1 or other appetite-modulating medication."
      }
     ],
     [
      {
       "t": "Preferences and plans:",
       "b": true
      },
      {
       "t": " your goal, pace, dietary style, training schedule and planned events."
      }
     ],
     [
      {
       "t": "A profile photo",
       "b": true
      },
      {
       "t": ", if you choose one."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App uses this information for one purpose: to calculate and show your own figures, such as your weight trend, your calorie and macronutrient targets, and your weekly review."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App collects and stores this information only on your own device, in the App's own storage. The App does not transmit it to us or to anyone else, and we have no access to it.",
      "b": true
     },
     {
      "t": " Your device's own backup may include it, as explained in section 6."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Your consent comes first.",
      "b": true
     },
     {
      "t": " Before you can enter any of this, the App shows a separate screen that lists the health information it collects and what it is used for, and asks for your consent. Nothing is entered, imported or started until you tap \"I CONSENT\". The App records the date of your consent and the version of the Consumer Health Data Privacy Policy you were shown. If that policy changes in a material way, the App asks for your consent again. If you do not consent, the App cannot be used."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The optional health details are optional. You can use the App without entering them, and you can switch cycle tracking off at any time in the App."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "2. The App: your device's health service"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you choose to connect your device's health service (Apple Health on iPhone, Health Connect on Android), the App asks your permission to "
     },
     {
      "t": "read",
      "b": true
     },
     {
      "t": " these, and only these:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "body weight,"
      }
     ],
     [
      {
       "t": "step count,"
      }
     ],
     [
      {
       "t": "sleep,"
      }
     ],
     [
      {
       "t": "resting heart rate,"
      }
     ],
     [
      {
       "t": "workouts."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App uses them to fill in your daily log so that you do not have to type the figures. They are stored on your device with the rest of your data."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "What the App does not do:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "It does not read body fat, lean body mass, body mass index or any other body-composition figure, even if your scale records one."
      }
     ],
     [
      {
       "t": "It does not write anything to your device's health service."
      }
     ],
     [
      {
       "t": "It does not send information from the health service to us or to any third party."
      }
     ],
     [
      {
       "t": "It does not use information from the health service for advertising, marketing or data mining, and it does not sell it."
      }
     ],
     [
      {
       "t": "The App does not use iCloud or any other cloud service to sync or store your data across devices. Your data, including anything read from your device's health service, is included in your device's own backup (for example, iCloud Backup on an iPhone) if you have that feature turned on. Section 6 explains this and how to turn it off."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "A figure you type yourself is never replaced by an imported one."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You choose which of the five types the App may read, on your device's own permission screen. You can change or withdraw that permission at any time in your device's settings for the health service."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you use a fitness tracker, a smart scale or another product, you may be able to have that product share its data with your device's health service. Directive then receives the data through the health service, under the rules above. That sharing is controlled by you and by those companies, not by us."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "3. The App: photos"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you choose a profile photo, the App asks permission to open your photo library. The picture you choose stays on your device. The App does not read your other photos."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "4. The App: purchases and RevenueCat"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "During the beta test, every feature is free and nothing is sold. No purchase information is collected."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "When paid plans are available, they are sold through your app store's in-app purchase (Apple's App Store or Google Play). We use a service called RevenueCat to check whether a subscription is active. When you buy or restore a subscription:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "The app store",
       "b": true
      },
      {
       "t": " processes the payment. We never receive your payment card details."
      }
     ],
     [
      {
       "t": "RevenueCat is not started until you have given the consent described in section 1."
      }
     ],
     [
      {
       "t": "RevenueCat",
       "b": true
      },
      {
       "t": " receives a random identifier created for your installation of the App, the product you bought, the dates and status of the subscription, and basic technical information such as your device type, operating system, App version, and language and currency settings. We do not ask RevenueCat to collect an advertising identifier, and it does not receive your name, your email address, your location, your payment details, or any health information. We can see that subscription record."
      }
     ],
     [
      {
       "t": "Neither the app store's purchase system nor RevenueCat receives the health, fitness or profile information you enter in the App."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The identifier is not your name or your email address, and we do not link it to you."
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "Apple's privacy policy: https://www.apple.com/legal/privacy/"
      }
     ],
     [
      {
       "t": "Google's privacy policy: https://policies.google.com/privacy"
      }
     ],
     [
      {
       "t": "RevenueCat's privacy policy: https://www.revenuecat.com/privacy"
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "5. The App: when information leaves your device"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Only when you choose to send it. The App can create:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "a "
      },
      {
       "t": "backup file",
       "b": true
      },
      {
       "t": " holding all of your Directive data,"
      }
     ],
     [
      {
       "t": "a "
      },
      {
       "t": "PDF report",
       "b": true
      },
      {
       "t": " of your history (in versions labeled for a doctor, a trainer or a nutritionist),"
      }
     ],
     [
      {
       "t": "a "
      },
      {
       "t": "spreadsheet (CSV) file",
       "b": true
      },
      {
       "t": " of your history,"
      }
     ],
     [
      {
       "t": "a "
      },
      {
       "t": "calendar file",
       "b": true
      },
      {
       "t": " of your training schedule."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Each opens your device's share sheet. You decide whether to send or save the file, and where. Once you share or save a file, it is governed by the service or the person you gave it to, not by this policy."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "About the backup file.",
      "b": true
     },
     {
      "t": " It contains everything you have entered or imported, including your health details. It is "
     },
     {
      "t": "encrypted with a password you choose",
      "b": true
     },
     {
      "t": " when you save it, using AES-256 encryption, and it cannot be read or restored without that password. We do not keep the password and cannot recover it: if you lose it, the backup cannot be opened. Choose a long password, and store the file somewhere only you can open."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "About the other files.",
      "b": true
     },
     {
      "t": " The PDF report, the spreadsheet and the calendar file are "
     },
     {
      "t": "not encrypted",
      "b": true
     },
     {
      "t": ": anyone who can open one can read it. Before it creates any of them, the App tells you so and asks you to confirm. Treat these files like any private document."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "About cycle information in reports.",
      "b": true
     },
     {
      "t": " Cycle information is left out of PDF reports unless you switch it on for that report."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "6. The App: your device's own backups"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App's data is included in your device's own backups (for example, iCloud Backup on an iPhone, or a backup to your computer) if you have those turned on. This is what lets your data return when you restore or replace your device. Those backups are made, stored and protected by the company that makes your device and by you, under your own account with them. We have no access to them."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you would rather your Directive data were not included in your device's cloud backup, you can switch Directive off in your device's backup settings, in the list of apps included in the backup."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "7. The App: beta testing"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If you take part in the beta, you install the App through your app store's beta testing service (Apple's TestFlight on iPhone). That service collects information about how the beta runs, such as crash reports and how often it is used, and shares it with us so that we can fix problems. If you send feedback or a screenshot through it, we receive it together with the email address you used to join. The service handles this under its own privacy policy. It does not include your health information unless you put it in a screenshot or a message you send us."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "8. The Website"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Charter applications.",
      "b": true
     },
     {
      "t": " If you apply for Charter Access on the Website, we collect your email address and the answers you choose or write. We use them only to manage the Charter intake and to contact you about Directive. They are stored in a private database that only we can access. The application is also sent to us by email."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Support messages.",
      "b": true
     },
     {
      "t": " If you use the support form or email us, we receive your email address and your message, and we use them to reply."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Service providers.",
      "b": true
     },
     {
      "t": " To run the Website we use Vercel to host it, Supabase to store applications, and Resend to deliver the form emails to us. They process the information above on our behalf and may not use it for their own purposes. Like any website host, Vercel records standard technical information about each visit, such as your IP address, browser type and the time of the request, for security and to keep the site running."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Cookies and tracking.",
      "b": true
     },
     {
      "t": " The Website does not use advertising cookies or analytics, and it does not track you across other sites."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "How long we keep it.",
      "b": true
     },
     {
      "t": " We keep Charter applications until the Charter program ends and for one year after that, or until you ask us to delete yours, whichever comes first. We keep support messages for two years after your request is resolved, so that we have a record of what was asked and answered, unless a longer period is required by law. You can ask us to delete your information at any time, as described in section 12."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "9. What we never do"
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "We never sell your personal information."
      }
     ],
     [
      {
       "t": "We never share it for advertising, including cross-context behavioral advertising."
      }
     ],
     [
      {
       "t": "We never give health information to data brokers."
      }
     ],
     [
      {
       "t": "We never use health information, including anything read from your device's health service, for advertising, marketing or any purpose other than providing the App's features to you."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "10. Security"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We use reasonable technical and organizational safeguards to protect your information. The information in the App is stored only in the App's private storage on your device, which other apps cannot read, and is protected by the device's built-in encryption when the device is locked with a passcode, Face ID, fingerprint or your device's equivalent. The App does not send your health information anywhere; its only internet connection, for subscriptions once paid plans are available, uses encrypted HTTPS. The backup file the App can create is encrypted with AES-256 and a password you choose (section 5). Because this protection depends on your device being locked, keep it protected with a passcode."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Website information is sent over an encrypted connection (HTTPS) and stored with providers that restrict access. No system is completely secure, and we cannot guarantee absolute security. Health information in the App is held only on your device, not by us. If we learn of a security breach affecting personal information we do hold, such as Charter applications or support messages, we will notify you and any authorities as required by applicable law, without unreasonable delay."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "11. Keeping and deleting your information"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "In the App.",
      "b": true
     },
     {
      "t": " Your information stays on your device until you delete it. \"Delete all my data\" in the App's Settings erases everything the App stored on the device, and so does deleting the App. Copies you made yourself (a backup file, a report, a spreadsheet) and your device's own backup are yours to delete. Because we hold no copy of the information in the App, we cannot recover it for you, and there is nothing of it for us to delete on our side."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Subscription records.",
      "b": true
     },
     {
      "t": " RevenueCat and the app store keep records of purchases. To ask about or delete a RevenueCat record, email us at privacy@directivefitness.com. We will tell you how to find the identifier for your installation so that we can locate the record."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "On the Website.",
      "b": true
     },
     {
      "t": " To see, correct or delete your Charter application or a support message, email privacy@directivefitness.com. We will acknowledge your request within 10 business days and respond within 30 days."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "12. Your choices and rights"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Depending on where you live, you may have the right to know what personal information a business holds about you, to get a copy of it, to correct it, to delete it, and not to be discriminated against for using those rights."
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "For information in the App, you can do all of these yourself: view and edit it in the App, export it (the backup file or the spreadsheet), or delete it with \"Delete all my data\" in the App's Settings or by deleting the App."
      }
     ],
     [
      {
       "t": "To withdraw your consent",
       "b": true
      },
      {
       "t": " to the App handling your health information, use \"Withdraw health data consent\" in the App's Settings. The App asks whether you also want to delete your data, and you can do both in one step. It then stops and shows the consent screen until you consent again. If you choose to keep your data, it stays on your device until you delete it with \"Delete all my data\"."
      }
     ],
     [
      {
       "t": "For Website information or a subscription record, email privacy@directivefitness.com. We will acknowledge your request within 10 business days and respond within 30 days. We may need to confirm that the request is from you."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If we decline a request, you may ask us to reconsider by replying to our response. You may also contact the attorney general of your state."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We do not sell or share personal information as those terms are defined in California law, and we do not use sensitive personal information for any purpose other than providing the Service."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "13. Age and children's privacy"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The App and the Website are intended for use by adults aged 18 and over. The App requests a standardized age-bracket signal from your device's operating system or app store to confirm your age range, asks for a date of birth as a secondary measure, and refuses access to anyone younger than 18. We treat the received age signal as the primary indicator of age for compliance with California privacy laws. The signal is an age range, not your exact age or date of birth. We use it only for this check: we do not store it, and we do not share it with anyone. If your device does not provide a signal, or you choose not to share it, the App relies on the date of birth you enter."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We do not knowingly collect personal information from anyone under 18, including children under 13. If we learn that a child under 13, or anyone under 18, has sent us personal information through the Website, we will delete it promptly and will not retain it. Information entered in the App is stored only on the device and is not held by us; it can be erased with \"Delete all my data\" in the App's Settings, or by deleting the App."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Parents or guardians with questions, or who wish to review or delete their child's information, may contact us at Directive LLC, 952 Winchester Rd, Unit #308, Lexington, KY 40505, or by email at privacy@directivefitness.com."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "14. Not medical advice"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Directive is an informational tool designed to assist with personal fitness, nutrition planning, and macro-tracking. It does not provide medical advice, diagnosis, or treatment. Our Terms of Service explain this in full."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "15. Where information is processed"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We are based in the United States, and the Website's providers process information in the United States. The App is offered in the United States."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "16. Features planned for later"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We plan to add, in later versions:"
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "An Android version of the App",
       "b": true
      },
      {
       "t": ", reading from Health Connect in the same way the iPhone version reads from Apple Health."
      }
     ],
     [
      {
       "t": "Direct sign-in to Google Health",
       "b": true
      },
      {
       "t": ", so that Fitbit and Google Health data can be read without going through your device's health service. This would involve signing in with your Google account, and Google supplying the data you approve."
      }
     ]
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Neither exists today. Before either is switched on, we will update this policy and ask for your permission in the App."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "17. Changes to this policy"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "When we change this policy we will update the date at the top. If a change affects how health information is handled, or is otherwise significant, we will tell you in the App or on the Website before it takes effect. If the Consumer Health Data Privacy Policy changes in a material way, the App asks for your consent again before the change applies to you."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "18. Contact"
   },
   {
    "k": "lines",
    "lines": [
     [
      {
       "t": "Directive LLC"
      }
     ],
     [
      {
       "t": "952 Winchester Rd, Unit #308, Lexington, KY 40505"
      }
     ],
     [
      {
       "t": "Privacy questions and requests: privacy@directivefitness.com"
      }
     ],
     [
      {
       "t": "Support: support@directivefitness.com, or the support form at directivefitness.com/support"
      }
     ]
    ]
   }
  ]
 },
 "health": {
  "title": "Consumer Health Data Privacy Policy",
  "updated": "October 5, 2026",
  "blocks": [
   {
    "k": "p",
    "s": [
     {
      "t": "This policy supplements our Privacy Policy. It is for residents of Washington State, Nevada, California and other places with consumer health data laws, and it describes how Directive handles consumer health data."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Notice at Collection"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The app processes consumer health data to provide fitness and nutrition services. We obtain your express, affirmative consent before any such processing begins. This policy serves as our Notice at Collection, detailing that we process health-related sensitive personal information solely for the purpose of providing the app's features. We do not sell or share this data. Your health data stays on your phone and is not sent to our servers. It is kept until you delete it in the app or delete the app."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "The health data we collect, and where it comes from"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We collect the following categories of consumer health data: body weight and target weight, body measurements (waist, neck, hip) and a body-fat estimate calculated from them, height, date of birth and sex, the food and drink you log (calories, protein, carbohydrate, fat, alcohol and fluids), workouts (type, duration and intensity), steps, resting heart rate and sleep data, and, only if you choose to enter them, menstrual cycle dates, cycle length and period length, menopause status, and GLP-1 or other appetite-modulating medication use."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "This data is sourced directly from you (what you type into the app) and, if you choose to connect it, from your device's health service (Apple Health on iPhone, Health Connect on Android), from which the app reads only body weight, step count, sleep, resting heart rate and workouts. The app never reads body fat, lean body mass or body mass index from your device's health service."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Local processing only"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "All of this information is collected and stored only on your own phone. It is not transmitted to Directive, and Directive has no access to it. We do not store or maintain consumer health data from the app on any external systems or cloud infrastructure under our control."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Your consent"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Before you can enter any health information, the app shows a separate consent screen. It lists the information above and what it is used for, and nothing is entered, imported or started until you tap \"I CONSENT\". This consent is separate from any permission your phone itself asks for. The app records the date of your consent and the version of this policy. If you do not consent, the app cannot be used."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "If we make a material change to this policy, we will notify you in the app and ask for your consent again before the change applies to you. The app shows the consent screen again whenever the version of this policy changes."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You can withdraw your consent at any time with \"Withdraw health data consent\" in the app's Settings. The app asks whether you also want to delete your data, and you can do both in one step. The app then stops until you consent again. If you choose to keep your data, it stays on your phone until you delete it with \"Delete all my data\" in the app's Settings."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "How it is used"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We process the Consumer Health Data categories listed above for the following purposes: to provide and maintain the app's functionality on your device; to calculate and display your personal fitness and nutrition metrics, such as weight trends and daily calorie and macronutrient targets; to produce your weekly review; to import data from your device's health service (Apple Health on iPhone, Health Connect on Android) at your direction; and to create the backup, report, and spreadsheet files you request. We do not use Consumer Health Data to improve our products, for advertising, or for any other purpose."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Data retention criteria"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We retain Consumer Health Data only for as long as the App remains installed on your device, or until you erase it with \"Delete all my data\" in the App's Settings. Because data is stored locally on your phone, deleting the App deletes all Consumer Health Data stored within it. We do not maintain copies of your health data on our own servers. Copies in your phone's own cloud or computer backup, and any backup file, report or spreadsheet you saved or sent, are under your control and are not deleted by deleting the App."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Sharing, and categories of third parties and affiliates"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "We do not share Consumer Health Data with any third party or any affiliate, so there are no categories to list. We do not sell Consumer Health Data, and we will not do so."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Health data leaves your phone only at your direction: in a file the app creates for you, or through your phone's own device backup if you have it turned on. The backup file the app creates is encrypted with a password you choose. The report, the spreadsheet and the calendar file are not encrypted, and the app warns you and asks you to confirm before it creates any of them."
     }
    ]
   },
   {
    "k": "p",
    "s": [
     {
      "t": "Our subscription provider, RevenueCat, and the app store's purchase system (Apple's App Store or Google Play) do not receive Consumer Health Data. The companies that run our website do not receive Consumer Health Data from the app."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "The website"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "The website at directivefitness.com does not ask for health data. If you choose to include health information in a Charter application or a support message, we use it only to respond to you, and you can ask us to delete it."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Your rights"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "You have the right to confirm whether we collect, share, or sell your consumer health data and to access such data, including a list of all third parties and affiliates with whom we have shared or sold the data and an email address or other online mechanism to contact them. You also have the right to withdraw consent, to have your data deleted, to correct any inaccurate health data, and to limit our use and disclosure of your sensitive personal information. We have not shared or sold your consumer health data with any third party or affiliate, so there is no such list to provide."
     }
    ]
   },
   {
    "k": "ul",
    "items": [
     [
      {
       "t": "In the app, you control your data. You can view and edit it within the app, switch cycle tracking off, withdraw your consent in the app's Settings, and withdraw the health service's permission in your phone's settings. To delete the data stored in the app, use \"Delete all my data\" in the app's Settings, or delete the app. Three things are not removed by either, and are under your control: (1) your phone's own cloud or computer backup, which may include the app's data until that backup is replaced or deleted; (2) any backup file, report or spreadsheet you created and saved or sent; and (3) data held in your device's health service (Apple Health on iPhone, Health Connect on Android). Directive only reads from that service and never writes to it, so nothing of ours is stored there. We do not store your health data on our servers and there are no accounts, so there is nothing for us to delete on our side."
      }
     ],
     [
      {
       "t": "For anything you sent us through the website, email privacy@directivefitness.com. We will acknowledge your request within 10 business days and respond within 30 days. If we decline your request, you may appeal by replying to our response, and we will answer within 45 days. If your appeal is declined, you may contact your state's attorney general. Washington residents: www.atg.wa.gov/file-complaint."
      }
     ]
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "California Confidentiality of Medical Information Act (CMIA)"
   },
   {
    "k": "p",
    "s": [
     {
      "t": "To the extent the California Confidentiality of Medical Information Act (Cal. Civ. Code Section 56 et seq.) applies to the app, we comply with it. We do not disclose your medical information, including reproductive health information such as menstrual cycle details, to any third party: it is stored only on your device and we have no access to it. If that ever changed, we would first obtain your authorization as Section 56.11 requires, unless the disclosure is otherwise required by law. The app contains no advertising or tracking technology, and it does not send your information to any artificial intelligence service or other outside service. Cycle information is left out of the reports you create unless you choose to include it."
     }
    ]
   },
   {
    "k": "h",
    "level": 2,
    "text": "Contact"
   },
   {
    "k": "lines",
    "lines": [
     [
      {
       "t": "Directive LLC"
      }
     ],
     [
      {
       "t": "952 Winchester Rd, Unit #308, Lexington, KY 40505"
      }
     ],
     [
      {
       "t": "privacy@directivefitness.com"
      }
     ]
    ]
   }
  ]
 }
};
