import React, { useState } from 'react';
import { 
  Parcel, 
  UserProfile 
} from '../../types';
import { 
  User, 
  Search, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  DollarSign, 
  Coins, 
  ShieldCheck, 
  Camera, 
  Upload, 
  HelpCircle,
  Globe,
  Sparkles,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';

interface CitizenDashboardProps {
  user: UserProfile;
  parcels: Parcel[];
}

export const LANGUAGES = [
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', sampleVoice: 'ಖಾತೆ ಸಂಖ್ಯೆ 142/B ಪರಿಹಾರ ಸ್ಥಿತಿ' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', sampleVoice: 'खसरा संख्या 142/B मुआवजा स्थिति' },
  { code: 'en', label: 'English', native: 'English', sampleVoice: 'Survey Number 142/B compensation status' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', sampleVoice: 'சர்வே எண் 142/B இழப்பீடு நிலை' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', sampleVoice: 'सर्व्हे क्र. 142/B भरपाई स्थिती' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', sampleVoice: 'দাগ নং 142/B ক্ষতিপূরণ স্থিতি' },
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];

interface DashboardTranslation {
  portalTitle: string;
  portalSub: string;
  badge: string;
  searchPlaceholder: string;
  micSearch: string;
  micListening: string;
  lookupBtn: string;
  audioPlay: string;
  audioPlaying: string;
  audioSummaryText: string;
  khatedar: string;
  aadhaar: string;
  extent: string;
  hectares: string;
  baseRateTitle: string;
  baseRateSub: string;
  solatiumTitle: string;
  solatiumSub: string;
  interestTitle: string;
  interestSub: string;
  assetsTitle: string;
  assetsSub: string;
  totalAwardTitle: string;
  totalAwardSub: string;
  pfmsTitle: string;
  pfmsRef: string;
  aadhaarAcc: string;
  possessionStatusTitle: string;
  possessionAuthorized: string;
  possessionProtected: string;
  pfmsHelp: string;
  fieldVerifyTitle: string;
  fieldVerifySub: string;
  inspectorReportTitle: string;
  inspectorReportNotes: string;
  photoUploaded: string;
  photoUploadBtn: string;
  photoUploadSub: string;
}

const TRANSLATIONS: Record<LanguageCode, DashboardTranslation> = {
  kn: {
    portalTitle: 'ಸಾರ್ವಜನಿಕ ಭೂಮಾಲೀಕರ ಪಾರದರ್ಶಕ ಪೋರ್ಟಲ್',
    portalSub: 'ಭೂ ಸಂಪನ್ಮೂಲ ಇಲಾಖೆ (DoLR) • ಪರಿಹಾರ ಹಾಗೂ ಡಿಬಿಟಿ ಸ್ಥಿತಿ',
    badge: 'ಶೂನ್ಯ ಆಡಳಿತಾತ್ಮಕ ಅಪಾಯ • ಸಾರ್ವಜನಿಕ ಪಾರದರ್ಶಕತೆ',
    searchPlaceholder: 'ಉದಾ: KA-BLR-0982 ಅಥವಾ ಸರ್ವೇ ನಂ 142/B',
    micSearch: 'ಧ್ವನಿ ಹುಡುಕಾಟ (ಭಾಷಿಣಿ AI)',
    micListening: 'ಭಾಷಿಣಿ ಆಲಿಸುತ್ತಿದೆ...',
    lookupBtn: 'ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ',
    audioPlay: 'ಧ್ವನಿ ಸಾರಾಂಶ ಆಲಿಸಿ',
    audioPlaying: 'ಭಾಷಿಣಿ ಮಾತನಾಡುತ್ತಿದೆ...',
    audioSummaryText: 'ಖಾತೆದಾರರಾದ ಸವಿತಾ ಕುಲಕರ್ಣಿ, RFCTLARR 2013 ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಒಟ್ಟು ಪರಿಹಾರ ಮೊತ್ತ ₹58,40,000 ಆಗಿದೆ. ಶೇ. 100 ರಷ್ಟು ಸಾಂತ್ವನ ಧನ ಜಮೆಯಾಗಿದೆ.',
    khatedar: 'ಖಾತೆದಾರರು',
    aadhaar: 'ಆಧಾರ್',
    extent: 'ವಿಸ್ತೀರ್ಣ',
    hectares: 'ಹೆಕ್ಟೇರ್',
    baseRateTitle: '1. ಮೂಲ ಮಾರುಕಟ್ಟೆ ದರ (ಮಾರ್ಗದರ್ಶಿ ಮೌಲ್ಯ)',
    baseRateSub: 'ಆರ್‌ಎಫ್‌ಸಿಟಿಎಲ್ಎಆರ್‌ಆರ್ ಕಾಯ್ದೆ ಕಲಂ 26 ರ ಪ್ರಕಾರ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ',
    solatiumTitle: '2. 100% ಶಾಸನಬದ್ಧ ಸಾಂತ್ವನ ಧನ (ಸೊಲೇಶಿಯಂ)',
    solatiumSub: 'ಕಡ್ಡಾಯ ಭೂಸ್ವಾಧೀನಕ್ಕೆ ಖಾತರಿಪಡಿಸಿದ ಪರಿಹಾರ (ಕಲಂ 30(1))',
    interestTitle: '3. ವಾರ್ಷಿಕ 12% ಶಾಸನಬದ್ಧ ಬಡ್ಡಿ',
    interestSub: 'ಎಸ್‌ಐಎ ಅಧಿಸೂಚನೆಯಿಂದ ಅಂತಿಮ ಅವಾರ್ಡ್ ಪ್ರಕಟಣೆವರೆಗೆ (ಕಲಂ 30(3))',
    assetsTitle: '4. ಲಗತ್ತಿಸಲಾದ ಆಸ್ತಿಗಳ ಮೌಲ್ಯಮಾಪನ',
    assetsSub: 'ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ ಪ್ರಮಾಣೀಕರಿಸಿದ ತೋಟಗಾರಿಕಾ ಮರಗಳು ಮತ್ತು ಕೊಳವೆಬಾವಿ',
    totalAwardTitle: 'ಮೊದಲ ಅನುಸೂಚಿ ಒಟ್ಟು ಶಾಸನಬದ್ಧ ಅವಾರ್ಡ್',
    totalAwardSub: 'ಖಾತೆದಾರರಿಗೆ ನೇರವಾಗಿ ಪಾವತಿಸಬೇಕಾದ ನಿವ್ವಳ ಪರಿಹಾರ',
    pfmsTitle: 'ಪಿಎಫ್‌ಎಂಎಸ್ ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT) ಸ್ಥಿತಿ',
    pfmsRef: 'ಪಿಎಫ್‌ಎಂಎಸ್ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ:',
    aadhaarAcc: 'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಖಾತೆ:',
    possessionStatusTitle: 'ಭೌತಿಕ ಸ್ವಾಧೀನದ ಸ್ಥಿತಿ:',
    possessionAuthorized: 'ಸ್ವಾಧೀನ ಹಸ್ತಾಂತರ ಅನುಮೋದಿಸಲಾಗಿದೆ',
    possessionProtected: 'ರಕ್ಷಿಸಲಾಗಿದೆ (ಕಲಂ 38 ಕಾನೂನು ಲಾಕ್ ಸಕ್ರಿಯ)',
    pfmsHelp: 'ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ ಆಧಾರ್ ಲಿಂಕ್ ಆಗದಿದ್ದರೆ, ದಯವಿಟ್ಟು ಸಿಎಎಲ್‌ಎ ಕಚೇರಿ ಅಥವಾ ತಾಲೂಕು ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    fieldVerifyTitle: 'ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಸ್ಥಳ ಪರಿಶೀಲನಾ ವರದಿ',
    fieldVerifySub: 'ಕಂದಾಯ ನಿರೀಕ್ಷಕರ ಸ್ಥಳ ಭೇಟಿಯ ಅಧಿಕೃತ ಪರಿಶೀಲನಾ ಟಿಪ್ಪಣಿಗಳು:',
    inspectorReportTitle: 'ನಿರೀಕ್ಷಕರ ತನಿಖಾ ವರದಿ:',
    inspectorReportNotes: 'ಜಿಪಿಎಸ್ ಕಲ್ಲು ನಿರ್ದೇಶಾಂಕಗಳೊಂದಿಗೆ ಗಡಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಬೆಳೆಗಳು ಮತ್ತು ನೀರಾವರಿ ಆಸ್ತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
    photoUploaded: '✓ ಜಿಯೋ-ಟ್ಯಾಗ್ ಮಾಡಿದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ',
    photoUploadBtn: 'ಸ್ಥಳ ಪರಿಶೀಲನೆಗೆ ಗಡಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    photoUploadSub: 'ಜಿಯೋ-ಟ್ಯಾಗ್ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಪರಿಶೀಲನೆ'
  },
  hi: {
    portalTitle: 'नागरिक एवं भू-स्वामी पारदर्शिता पोर्टल',
    portalSub: 'भूमि संसाधन विभाग (DoLR) • प्रत्यक्ष लाभ अंतरण एवं मुआवजा स्थिति',
    badge: 'शून्य प्रशासनिक जोखिम • सार्वजनिक पारदर्शिता',
    searchPlaceholder: 'उदा. KA-BLR-0982 या खसरा संख्या 142/B',
    micSearch: 'ध्वनि खोज (भाषिणी AI)',
    micListening: 'भाषिणी सुन रही है...',
    lookupBtn: 'स्थिति देखें',
    audioPlay: 'ऑडियो सारांश सुनें',
    audioPlaying: 'भाषिणी बोल रही है...',
    audioSummaryText: 'खातेदार सविता कुलकर्णी, RFCTLARR 2013 के तहत आपका कुल वैधानिक मुआवजा ₹58,40,000 है। 100% तोष राशि PFMS के माध्यम से अंतरित की जा चुकी है।',
    khatedar: 'खातेदार',
    aadhaar: 'आधार',
    extent: 'क्षेत्रफल',
    hectares: 'हेक्टेयर',
    baseRateTitle: '1. आधार बाज़ार दर (सर्कल रेट)',
    baseRateSub: 'RFCTLARR धारा 26 के तहत निर्धारित',
    solatiumTitle: '2. 100% वैधानिक सोलेटियम (तोष राशि)',
    solatiumSub: 'अनिवार्य अधिग्रहण की गारंटीकृत क्षतिपूर्ति (धारा 30(1))',
    interestTitle: '3. 12% वार्षिक वैधानिक ब्याज',
    interestSub: 'SIA अधिसूचना से अंतिम पंचाट घोषणा तक (धारा 30(3))',
    assetsTitle: '4. संलग्न परिसंपत्ति मूल्यांकन',
    assetsSub: 'लोक निर्माण विभाग द्वारा प्रमाणित फलदार वृक्ष व सिंचाई बोरवेल',
    totalAwardTitle: 'प्रथम अनुसूची कुल वैधानिक पंचाट राशि',
    totalAwardSub: 'खातेदार को सीधे देय शुद्ध मुआवजा राशि',
    pfmsTitle: 'PFMS प्रत्यक्ष बैंक खाता अंतरण (DBT) स्थिति',
    pfmsRef: 'PFMS संदर्भ संख्या:',
    aadhaarAcc: 'आधार लिंक्ड बैंक खाता:',
    possessionStatusTitle: 'भौतिक कब्ज़ा स्थिति:',
    possessionAuthorized: 'कब्ज़ा हस्तांतरण अधिकृत',
    possessionProtected: 'संरक्षित (धारा 38 कानूनी रोक सक्रिय)',
    pfmsHelp: 'यदि आपका बैंक खाता या आधार संख्या असंबद्ध है, तो कृपया सक्षम प्राधिकारी (CALA) हेल्पडेस्क से संपर्क करें।',
    fieldVerifyTitle: 'राजस्व निरीक्षक स्थलीय सत्यापन लेखापरीक्षा',
    fieldVerifySub: 'राजस्व निरीक्षक के स्थलीय निरीक्षण की आधिकारिक रिपोर्ट:',
    inspectorReportTitle: 'निरीक्षक लेखापरीक्षा रिपोर्ट:',
    inspectorReportNotes: 'GPS पाषाण निर्देशांकों द्वारा सीमा सत्यापित। खड़ी फसल और सिंचाई परिसंपत्तियों का निरीक्षण पूर्ण।',
    photoUploaded: '✓ जियो-टैग्ड फ़ोटो अपलोड की गई',
    photoUploadBtn: 'सत्यापन हेतु सीमा फ़ोटो अपलोड करें',
    photoUploadSub: 'जियो-टैग्ड लेखापरीक्षा सत्यापन'
  },
  en: {
    portalTitle: 'Public Citizen & Landowner Transparency Portal',
    portalSub: 'Department of Land Resources (DoLR) • Direct Benefit Transfer & Title Verification',
    badge: 'Zero Admin Access • Public Transparency',
    searchPlaceholder: 'e.g. KA-BLR-0982 or Survey No. 142/B',
    micSearch: 'Voice Search (Bhashini AI)',
    micListening: 'Listening (Bhashini AI)...',
    lookupBtn: 'Track Status',
    audioPlay: 'Play Audio Summary',
    audioPlaying: 'Bhashini Speaking (Audio)...',
    audioSummaryText: 'Khatedar Savita Kulkarni, your total statutory award under RFCTLARR 2013 is ₹58,40,000. 100% solatium and interest have been credited via PFMS gateway.',
    khatedar: 'Khatedar',
    aadhaar: 'Aadhaar',
    extent: 'Extent',
    hectares: 'Hectares',
    baseRateTitle: '1. Base Market Rate (Circle Rate)',
    baseRateSub: 'Determined under RFCTLARR Section 26',
    solatiumTitle: '2. 100% Statutory Solatium Multiplier',
    solatiumSub: 'Guaranteed compulsory acquisition compensation (§30(1))',
    interestTitle: '3. 12% Per Annum Statutory Interest',
    interestSub: 'From SIA notification to final award declaration (§30(3))',
    assetsTitle: '4. Attached Assets Valuation',
    assetsSub: 'Horticultural trees & irrigation borewell certified by PWD',
    totalAwardTitle: 'Total First Schedule Statutory Award',
    totalAwardSub: 'Net compensation payable directly to khatedar',
    pfmsTitle: 'PFMS Direct Benefit Transfer Status',
    pfmsRef: 'PFMS Ref Number:',
    aadhaarAcc: 'Aadhaar Linked Account:',
    possessionStatusTitle: 'Physical Possession Status:',
    possessionAuthorized: 'Handover Authorized',
    possessionProtected: 'Protected (Section 38 Lock Active)',
    pfmsHelp: 'If your bank account or Aadhaar number is unlinked, please contact the CALA helpdesk or visit your nearest Tehsil office.',
    fieldVerifyTitle: 'Revenue Inspector Ground Verification Audit',
    fieldVerifySub: 'Official verification notes from Revenue Inspector field visit:',
    inspectorReportTitle: 'Inspector Audit Report:',
    inspectorReportNotes: 'Boundary verified with GPS stone coordinates. Standing crops and irrigation assets inspected.',
    photoUploaded: '✓ Geo-Tagged Photo Uploaded',
    photoUploadBtn: 'Upload Boundary Photo for Audit',
    photoUploadSub: 'Geo-tagged audit verification'
  },
  ta: {
    portalTitle: 'பொது குடிமக்கள் மற்றும் நில உரிமையாளர் வெளிப்படைத்தன்மை போர்டல்',
    portalSub: 'நில வளங்கள் துறை (DoLR) • நேரடி பயன் பரிமாற்றம் (DBT) மற்றும் இழப்பீட்டு நிலை',
    badge: 'பூஜ்ஜிய நிர்வாக ஆபத்து • பொது வெளிப்படைத்தன்மை',
    searchPlaceholder: 'எ.கா. KA-BLR-0982 அல்லது சர்வே எண் 142/B',
    micSearch: 'குரல் தேடல் (பாஷினி AI)',
    micListening: 'பாஷினி கேட்கிறது...',
    lookupBtn: 'நிலையை காண்க',
    audioPlay: 'ஆடியோ சுருக்கம் கேட்க',
    audioPlaying: 'பாஷினி பேசுகிறது...',
    audioSummaryText: 'நில உரிமையாளர் சவிதா குல்கர்னி, RFCTLARR 2013-ன் கீழ் உங்கள் மொத்த சட்டப்பூர்வ இழப்பீடு ₹58,40,000 ஆகும். 100% சோலேடியம் வங்கி கணக்கில் வரவு வைக்கப்பட்டுள்ளது.',
    khatedar: 'நில உரிமையாளர்',
    aadhaar: 'ஆதார்',
    extent: 'பரப்பளவு',
    hectares: 'ஹெக்டேர்',
    baseRateTitle: '1. அடிப்படை சந்தை மதிப்பு (வழிகாட்டி மதிப்பு)',
    baseRateSub: 'RFCTLARR சட்டம் பிரிவு 26-ன் கீழ் நிர்ணயிக்கப்பட்டது',
    solatiumTitle: '2. 100% சட்டப்பூர்வ ஆறுதல் தொகை (சோலேடியம்)',
    solatiumSub: 'கட்டாய கையகப்படுத்துதலுக்கான உத்தரவாத இழப்பீடு (§30(1))',
    interestTitle: '3. ஆண்டுக்கு 12% சட்டப்பூர்வ வட்டி',
    interestSub: 'SIA அறிவிப்பு முதல் இறுதி ஆணை வரை கணக்கிடப்பட்டது (§30(3))',
    assetsTitle: '4. இணைக்கப்பட்ட சொத்துகளின் மதிப்பு',
    assetsSub: 'PWD சான்றளித்த பழ மரங்கள் மற்றும் பாசன ஆழ்துளை கிணறு',
    totalAwardTitle: 'முதல் அட்டவணை மொத்த சட்டப்பூர்வ இழப்பீட்டுத் தொகை',
    totalAwardSub: 'உரிமையாளருக்கு நேரடியாக செலுத்தப்படும் நிகர இழப்பீடு',
    pfmsTitle: 'PFMS நேரடி வங்கி கணக்கு பரிமாற்ற (DBT) நிலை',
    pfmsRef: 'PFMS குறிப்பு எண்:',
    aadhaarAcc: 'ஆதார் இணைக்கப்பட்ட வங்கி கணக்கு:',
    possessionStatusTitle: 'உரிமை ஒப்படைப்பு நிலை:',
    possessionAuthorized: 'கையகப்படுத்தல் அனுமதிக்கப்பட்டது',
    possessionProtected: 'பாதுகாக்கப்பட்டது (பிரிவு 38 தடை அமலில் உள்ளது)',
    pfmsHelp: 'உங்கள் வங்கி கணக்கு அல்லது ஆதார் எண் இணைக்கப்படவில்லை என்றால், CALA உதவி மையத்தை அணுகவும்.',
    fieldVerifyTitle: 'வருவாய் ஆய்வாளர் கள சரிபார்ப்பு தணிக்கை',
    fieldVerifySub: 'வருவாய் ஆய்வாளரின் கள ஆய்வின் அதிகாரப்பூர்வ அறிக்கை:',
    inspectorReportTitle: 'ஆய்வாளர் தணிக்கை அறிக்கை:',
    inspectorReportNotes: 'GPS எல்லைக் கற்கள் மூலம் எல்லை சரிபார்க்கப்பட்டது. பயிர்கள் மற்றும் பாசன சொத்துக்கள் ஆய்வு செய்யப்பட்டன.',
    photoUploaded: '✓ புவிக்குறியிடப்பட்ட புகைப்படம் பதிவேற்றப்பட்டது',
    photoUploadBtn: 'சரிபார்ப்பிற்காக எல்லை புகைப்படத்தை பதிவேற்றவும்',
    photoUploadSub: 'புவிக்குறியீட்டு தணிக்கை சரிபார்ப்பு'
  },
  mr: {
    portalTitle: 'नागरिक व भूधारक पारदर्शकता पोर्टल',
    portalSub: 'भूमी संसाधन विभाग (DoLR) • थेट लाभ हस्तांतरण (DBT) व भरपाई स्थिती',
    badge: 'शून्य प्रशासकीय जोखीम • सार्वजनिक पारदर्शकता',
    searchPlaceholder: 'उदा. KA-BLR-0982 किंवा सर्व्हे क्र. 142/B',
    micSearch: 'ध्वनी शोध (भाषिणी AI)',
    micListening: 'भाषिणी ऐकत आहे...',
    lookupBtn: 'स्थिती तपासा',
    audioPlay: 'ऑडिओ सारांश ऐका',
    audioPlaying: 'भाषिणी बोलत आहे...',
    audioSummaryText: 'खातेदार सविता कुलकर्णी, RFCTLARR 2013 अंतर्गत आपली एकूण भरपाई रक्कम ₹58,40,000 आहे. 100% सोलेशियम PFMS द्वारे जमा झाले आहे.',
    khatedar: 'खातेदार',
    aadhaar: 'आधार',
    extent: 'क्षेत्रफळ',
    hectares: 'हेक्टर',
    baseRateTitle: '1. मूळ बाजारभाव दर (रेडी रेकनर दर)',
    baseRateSub: 'RFCTLARR कलम 26 अंतर्गत निर्धारित',
    solatiumTitle: '2. 100% वैधानिक सोलेशियम (दिलासा रक्कम)',
    solatiumSub: 'सक्तीच्या भूसंपादनासाठी हमी दिलेली भरपाई (कलम 30(1))',
    interestTitle: '3. 12% वार्षिक वैधानिक व्याज',
    interestSub: 'SIA अधिसूचनेपासून अंतिम निवाड्यापर्यंत (कलम 30(3))',
    assetsTitle: '4. संलग्न मालमत्तांचे मूल्यांकन',
    assetsSub: 'सार्वजनिक बांधकाम विभागाने प्रमाणित केलेली फळझाडे व बोअरवेल',
    totalAwardTitle: 'पहिली अनुसूची एकूण वैधानिक निवाडा रक्कम',
    totalAwardSub: 'खातेदाराला थेट देय असलेली निव्वळ भरपाई रक्कम',
    pfmsTitle: 'PFMS थेट बँक खात्यात हस्तांतरण (DBT) स्थिती',
    pfmsRef: 'PFMS संदर्भ क्रमांक:',
    aadhaarAcc: 'आधार जोडलेले बँक खाते:',
    possessionStatusTitle: 'भौतिक ताबा स्थिती:',
    possessionAuthorized: 'ताबा हस्तांतरण अधिकृत',
    possessionProtected: 'संरक्षित (कलम 38 कायदेशीर निर्बंध सक्रिय)',
    pfmsHelp: 'आपले बँक खाते किंवा आधार लिंक नसल्यास, कृपया CALA कार्यालय किंवा तहसील कार्यालयाशी संपर्क साधा.',
    fieldVerifyTitle: 'महसूल निरीक्षक स्थळ पाहणी लेखापरीक्षण',
    fieldVerifySub: 'महसूल निरीक्षकांच्या प्रत्यक्ष भेटीचा अधिकृत अहवाल:',
    inspectorReportTitle: 'निरीक्षक लेखापरीक्षण अहवाल:',
    inspectorReportNotes: 'GPS दगडांच्या निर्देशांकांद्वारे सीमा पडताळली. उभी पिके व सिंचन मालमत्तेची तपासणी पूर्ण.',
    photoUploaded: '✓ जिओ-टॅग केलेला फोटो अपलोड झाला',
    photoUploadBtn: 'तपासणीसाठी सीमेचा फोटो अपलोड करा',
    photoUploadSub: 'जिओ-टॅग लेखापरीक्षण पडताळणी'
  },
  bn: {
    portalTitle: 'নাগরিক ও ভূমির মালিক স্বচ্ছতা পোর্টাল',
    portalSub: 'ভূমি সম্পদ বিভাগ (DoLR) • প্রত্যক্ষ সুবিধা হস্তান্তর (DBT) ও ক্ষতিপূরণ স্থিতি',
    badge: 'শূন্য প্রশাসনিক ঝুঁকি • জনস্বচ্ছতা',
    searchPlaceholder: 'যেমন KA-BLR-0982 বা দাগ নং 142/B',
    micSearch: 'ভয়েস অনুসন্ধান (ভাষিণী AI)',
    micListening: 'ভাষিণী শুনছে...',
    lookupBtn: 'স্থিতি দেখুন',
    audioPlay: 'অডিও সারাংশ শুনুন',
    audioPlaying: 'ভাষিণী বলছে...',
    audioSummaryText: 'জমি মালিক সবিতা কুলকার্নি, RFCTLARR 2013-এর অধীনে আপনার মোট সংবিধিবদ্ধ ক্ষতিপূরণ ₹58,40,000। 100% সোলেশিয়াম PFMS মারফত প্রদান করা হয়েছে।',
    khatedar: 'খতিয়ানদার / মালিক',
    aadhaar: 'আধার',
    extent: 'পরিমাণ',
    hectares: 'হেক্টর',
    baseRateTitle: '1. ভিত্তি বাজার মূল্য (সার্কেল রেট)',
    baseRateSub: 'RFCTLARR ধারা 26 অনুযায়ী নির্ধারিত',
    solatiumTitle: '2. 100% সংবিধিবদ্ধ সোলেশিয়াম (তোষণ অনুদান)',
    solatiumSub: 'বাধ্যতামূলক অধিগ্রহণের জন্য নিশ্চিত ক্ষতিপূরণ (§30(1))',
    interestTitle: '3. বার্ষিক 12% সংবিধিবদ্ধ সুদ',
    interestSub: 'SIA বিজ্ঞপ্তি থেকে চূড়ান্ত রোয়েদাদ ঘোষণা পর্যন্ত (§30(3))',
    assetsTitle: '4. সংযুক্ত সম্পত্তির মূল্যায়ন',
    assetsSub: 'পূর্ত বিভাগ দ্বারা প্রত্যয়িত ফলের গাছ ও সেচ নলকূপ',
    totalAwardTitle: 'প্রথম তফসিল মোট সংবিধিবদ্ধ রোয়েদাদ অর্থ',
    totalAwardSub: 'খতিয়ানদারকে সরাসরি প্রদেয় নেট ক্ষতিপূরণ',
    pfmsTitle: 'PFMS প্রত্যক্ষ সুবিধা হস্তান্তর (DBT) স্থিতি',
    pfmsRef: 'PFMS রেফারেন্স নম্বর:',
    aadhaarAcc: 'আধার সংযুক্ত ব্যাংক অ্যাকাউন্ট:',
    possessionStatusTitle: 'শারীরিক দখল স্থিতি:',
    possessionAuthorized: 'দখল হস্তান্তর অনুমোদিত',
    possessionProtected: 'সুরক্ষিত (ধারা 38 আইনি স্থগিতাদেশ সক্রিয়)',
    pfmsHelp: 'আপনার ব্যাংক অ্যাকাউন্ট বা আধার লিংক করা না থাকলে, অনুগ্রহ করে CALA হেল্পডেস্কে যোগাযোগ করুন।',
    fieldVerifyTitle: 'রাজস্ব পরিদর্শক ক্ষেত্র যাচাইকরণ নিরীক্ষা',
    fieldVerifySub: 'রাজস্ব পরিদর্শকের পরিদর্শনের অফিসিয়াল যাচাই রিপোর্ট:',
    inspectorReportTitle: 'পরিদর্শক নিরীক্ষা রিপোর্ট:',
    inspectorReportNotes: 'GPS সীমানা পাথর স্থানাঙ্ক দ্বারা সীমানা যাচাই করা হয়েছে। ফসল এবং সেচ সম্পদ পরিদর্শন সম্পন্ন।',
    photoUploaded: '✓ জিও-ট্যাগ করা ছবি আপলোড হয়েছে',
    photoUploadBtn: 'যাচাইয়ের জন্য সীমানার ছবি আপলোড করুন',
    photoUploadSub: 'জিও-ট্যাগ অডিট যাচাইকরণ'
  }
};

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  user,
  parcels
}) => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('kn'); // Default Kannada for Dharwad demo
  const [searchQuery, setSearchQuery] = useState('KA-BLR-0982');
  const [activeParcel, setActiveParcel] = useState<Parcel>(parcels[0]);
  const [micListening, setMicListening] = useState(false);
  const [voiceTranscribedText, setVoiceTranscribedText] = useState('');
  const [speechSynthesisPlaying, setSpeechSynthesisPlaying] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const activeLangMeta = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  const handleVoiceSearch = () => {
    setMicListening(true);
    setVoiceTranscribedText('');
    setTimeout(() => {
      setMicListening(false);
      setSearchQuery('KA-BLR-0982');
      setActiveParcel(parcels[0]);
      setVoiceTranscribedText(`Bhashini Transcribed: "${activeLangMeta.sampleVoice}" -> Parcel ULPIN KA-BLR-0982`);
    }, 1800);
  };

  const handlePlayVoiceSummary = () => {
    setSpeechSynthesisPlaying(true);
    setTimeout(() => {
      setSpeechSynthesisPlaying(false);
    }, 4500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = parcels.find(p => 
      p.ulpin.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.surveyNumber.includes(searchQuery)
    );
    if (found) {
      setActiveParcel(found);
    } else {
      alert(`No parcel found matching "${searchQuery}". Showing sample parcel KA-BLR-0982.`);
      setActiveParcel(parcels[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Multilingual Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                  {t.portalTitle}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.portalSub} • {t.khatedar}: <span className="font-semibold text-slate-800">{user.name}</span>
              </p>
            </div>
          </div>

          {/* Bhashini Multilingual Language Switcher - Fully visible across all devices */}
          <div className="w-full lg:w-auto bg-slate-100 p-2 sm:p-2.5 rounded-2xl border border-slate-200 shrink-0">
            <div className="flex items-center justify-between gap-2 mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="text-[11px] font-bold text-slate-700">
                  Bhashini AI Language ({LANGUAGES.length} Indian Languages):
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
                Active: {activeLangMeta.native}
              </span>
            </div>

            {/* 6 Language Buttons: 3 cols on mobile, flex on desktop - 100% visible, no hidden scroll! */}
            <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500/60 scale-[1.02]'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className="leading-tight text-xs">{lang.native}</span>
                    <span className={`text-[9px] font-normal leading-none mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {lang.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Search & Voice Inquiry Bar */}
        <form onSubmit={handleSearch} className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 sm:py-3 pl-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                micListening 
                  ? 'bg-rose-100 text-rose-800 border-rose-400 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
            >
              <Mic className={`w-4 h-4 shrink-0 ${micListening ? 'animate-bounce text-rose-600' : ''}`} />
              <span>{micListening ? t.micListening : t.micSearch}</span>
            </button>

            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow transition-all whitespace-nowrap"
            >
              {t.lookupBtn}
            </button>
          </div>
        </form>

        {/* Voice Transcription Feedback */}
        {voiceTranscribedText && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{voiceTranscribedText}</span>
          </div>
        )}

        {/* Active Audio Readout Banner */}
        {speechSynthesisPlaying && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-300 text-xs text-blue-950 flex items-start gap-2.5 animate-in fade-in">
            <Volume2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="font-bold text-blue-900">{t.audioPlaying}</p>
              <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed font-sans italic">
                "{t.audioSummaryText}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Award Breakdown on Left, PFMS Credit & Field Audit on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Transparent Statutory Compensation Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  ULPIN: {activeParcel.ulpin}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Survey No. {activeParcel.surveyNumber} ({activeParcel.village}, {activeParcel.taluk})
                </h3>
              </div>

              {/* Bhashini Voice Readout Button */}
              <button
                type="button"
                onClick={handlePlayVoiceSummary}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
                  speechSynthesisPlaying
                    ? 'bg-blue-100 text-blue-800 border-blue-400 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                }`}
              >
                <Volume2 className="w-4 h-4 text-blue-700" />
                <span>{speechSynthesisPlaying ? t.audioPlaying : t.audioPlay}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              {t.khatedar}: <b className="text-slate-800">{activeParcel.ownerName}</b> • {t.aadhaar}: <span className="font-mono">{activeParcel.aadhaarMasked}</span> • {t.extent}: <b className="font-mono">{activeParcel.areaHectares} {t.hectares}</b> ({activeParcel.landClassification})
            </p>

            {/* Compensation Ledger Table */}
            <div className="mt-5 space-y-2.5 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{t.baseRateTitle}</p>
                  <p className="text-[11px] text-slate-500">{t.baseRateSub}</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  ₹{activeParcel.baseMarketValue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <div>
                  <p className="font-bold text-emerald-900">{t.solatiumTitle}</p>
                  <p className="text-[11px] text-emerald-700">{t.solatiumSub}</p>
                </div>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  +₹{activeParcel.solatium100.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{t.interestTitle}</p>
                  <p className="text-[11px] text-slate-500">{t.interestSub}</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  +₹{activeParcel.interest12.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800">{t.assetsTitle}</p>
                  <p className="text-[11px] text-slate-500">{t.assetsSub}</p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  +₹{activeParcel.additionalAssetsValue.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
                <div>
                  <p className="font-bold text-sm">{t.totalAwardTitle}</p>
                  <p className="text-[11px] text-emerald-200">{t.totalAwardSub}</p>
                </div>
                <span className="font-mono font-black text-xl text-amber-300">
                  ₹{activeParcel.totalAwardCompensation.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): PFMS Direct Benefit Transfer & Ground Verification Audit */}
        <div className="lg:col-span-5 space-y-6">
          {/* PFMS Bank Credit Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.pfmsTitle}
                </h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                activeParcel.pfmsStatus === 'CREDITED' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {activeParcel.pfmsStatus}
              </span>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">{t.pfmsRef}</span>
                <span className="font-mono font-bold text-slate-900">{activeParcel.pfmsTransactionId || 'Awaiting Batch Batching'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.aadhaarAcc}</span>
                <span className="font-mono text-slate-800">State Bank of India (***4812)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t.possessionStatusTitle}</span>
                <span className={`font-semibold ${activeParcel.possessionIssued ? 'text-emerald-700' : 'text-slate-600'}`}>
                  {activeParcel.possessionIssued ? t.possessionAuthorized : t.possessionProtected}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              {t.pfmsHelp}
            </p>
          </div>

          {/* Revenue Inspector Field Verification with Photo Audit Simulation */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.fieldVerifyTitle}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              {t.fieldVerifySub}
            </p>

            <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <p className="font-semibold">{t.inspectorReportTitle}</p>
              <p className="text-[11px] leading-relaxed">
                "{t.inspectorReportNotes}"
              </p>
            </div>

            {/* Photo upload simulator */}
            <div className="mt-4">
              <div 
                onClick={() => setUploadedPhoto(true)}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                  uploadedPhoto 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900' 
                    : 'bg-slate-50 border-slate-300 hover:border-emerald-400 text-slate-600'
                }`}
              >
                <Camera className="w-6 h-6 mx-auto mb-1.5 text-slate-400" />
                {uploadedPhoto ? (
                  <div>
                    <p className="text-xs font-bold text-emerald-900">{t.photoUploaded}</p>
                    <p className="text-[10px] text-emerald-700 font-mono mt-0.5">Lat: 15.4589° N, Lng: 74.9823° E (Pomegranate Borewell)</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold">{t.photoUploadBtn}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.photoUploadSub}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
