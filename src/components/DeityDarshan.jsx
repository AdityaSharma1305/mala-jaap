import React from 'react';
import ramImg from '../assets/images/ram.jpg';
import shivaImg from '../assets/images/shiva.jpg';
import radhakrishnaImg from '../assets/images/radhakrishna.jpg';
import hanumanImg from '../assets/images/hanuman.jpg';
import gayatriImg from '../assets/images/gayatri.jpg';

// Maps active mantra to corresponding sacred deity darshan with bundled assets
export const DEITY_MAP = {
  'श्री राम': {
    name: 'प्रभु श्री राम',
    image: ramImg,
    tagline: 'रघुपति राघव राजा राम • पतित पावन सीताराम',
    accentColor: '#D97724',
    bgAura: 'from-amber-600/20 via-orange-500/10 to-transparent'
  },
  'ॐ नमः शिवाय': {
    name: 'देवाधिदेव महादेव शिव',
    image: shivaImg,
    tagline: 'कर्पूरगौरं करुणावतारं • संसारसारं भुजगेन्द्रहारम्',
    accentColor: '#3B82F6',
    bgAura: 'from-blue-600/20 via-indigo-500/10 to-transparent'
  },
  'राधे राधे': {
    name: 'श्री राधा रानी एवं श्री कृष्ण',
    image: radhakrishnaImg,
    tagline: 'राधे तू बड़भागिनी, कौन तपस्या कीन • तीन लोक तारन तरन, सो तेरे आधीन',
    accentColor: '#EC4899',
    bgAura: 'from-pink-600/20 via-rose-500/10 to-transparent'
  },
  'श्री कृष्ण': {
    name: 'भगवान श्री कृष्ण',
    image: radhakrishnaImg,
    tagline: 'कस्तूरीतिलकं ललाटपटले वक्षःस्थले कौस्तुभम्',
    accentColor: '#F59E0B',
    bgAura: 'from-yellow-600/20 via-amber-500/10 to-transparent'
  },
  'हरे कृष्ण': {
    name: 'महामंत्र श्री राधा-गोविंद',
    image: radhakrishnaImg,
    tagline: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे • हरे राम हरे राम राम राम हरे हरे',
    accentColor: '#10B981',
    bgAura: 'from-emerald-600/20 via-teal-500/10 to-transparent'
  },
  'ॐ हनुमते नमः': {
    name: 'संकटमोचन श्री हनुमान',
    image: hanumanImg,
    tagline: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्',
    accentColor: '#EA580C',
    bgAura: 'from-orange-600/20 via-amber-500/10 to-transparent'
  },
  'गायत्री मंत्र': {
    name: 'वेदमाता गायत्री देवी',
    image: gayatriImg,
    tagline: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    accentColor: '#F59E0B',
    bgAura: 'from-amber-600/20 via-yellow-500/10 to-transparent'
  }
};

export function getDeityInfo(mantra) {
  return DEITY_MAP[mantra] || {
    name: mantra,
    image: ramImg,
    tagline: 'जप में मन, मन में नाम',
    accentColor: '#D97724',
    bgAura: 'from-amber-600/20 via-orange-500/10 to-transparent'
  };
}
