
import { decode, decodeAudioData } from "../utils/audio";

// Pre-matched outfit combinations for better styling
interface CompleteOutfit {
  occasion: string;
  gender: 'men' | 'women' | 'unisex';
  description: string;
  items: {
    top: string;
    bottom: string;
    shoes: string;
    accessory: string;
  };
  colors: string;
}

const outfitCombinations: CompleteOutfit[] = [
  // MEN'S FORMAL/WORK OUTFITS
  {
    occasion: 'work',
    gender: 'men',
    description: 'Professional and sharp',
    items: {
      top: 'White dress shirt with navy blazer',
      bottom: 'Dark grey dress pants',
      shoes: 'Black leather oxfords',
      accessory: 'Tie and leather belt'
    },
    colors: 'Navy, white, grey, black'
  },
  {
    occasion: 'work',
    gender: 'men',
    description: 'Classic and polished',
    items: {
      top: 'Light blue dress shirt',
      bottom: 'Navy tailored trousers',
      shoes: 'Brown leather shoes',
      accessory: 'Brown leather belt with watch'
    },
    colors: 'Light blue, navy, brown'
  },
  {
    occasion: 'party',
    gender: 'men',
    description: 'Elegant and sophisticated',
    items: {
      top: 'Black tuxedo shirt',
      bottom: 'Black tailored trousers',
      shoes: 'Black leather dress shoes',
      accessory: 'Bow tie and cufflinks'
    },
    colors: 'Black and white'
  },
  {
    occasion: 'party',
    gender: 'men',
    description: 'Dapper and stylish',
    items: {
      top: 'Dark charcoal blazer with white shirt',
      bottom: 'Black dress pants',
      shoes: 'Black or burgundy loafers',
      accessory: 'Pocket watch or gold cufflinks'
    },
    colors: 'Charcoal, white, black'
  },
  {
    occasion: 'casual',
    gender: 'men',
    description: 'Relaxed and trendy',
    items: {
      top: 'Casual button-up shirt or polo',
      bottom: 'Dark jeans or chinos',
      shoes: 'Casual sneakers or loafers',
      accessory: 'Watch or simple necklace'
    },
    colors: 'Navy, white, khaki, grey'
  },
  {
    occasion: 'casual',
    gender: 'men',
    description: 'Cool and laid-back',
    items: {
      top: 'T-shirt with casual jacket',
      bottom: 'Light wash jeans',
      shoes: 'White sneakers',
      accessory: 'Baseball cap and watch'
    },
    colors: 'White, light blue, neutral'
  },
  {
    occasion: 'summer',
    gender: 'men',
    description: 'Light and breezy',
    items: {
      top: 'Linen short-sleeve shirt',
      bottom: 'Khaki or cream shorts',
      shoes: 'Sandals or boat shoes',
      accessory: 'Sunglasses and sunhat'
    },
    colors: 'Cream, khaki, white'
  },
  {
    occasion: 'winter',
    gender: 'men',
    description: 'Warm and stylish',
    items: {
      top: 'Wool sweater with overcoat',
      bottom: 'Dark dress pants',
      shoes: 'Brown or black boots',
      accessory: 'Wool scarf and gloves'
    },
    colors: 'Navy, grey, brown, black'
  },
  // WOMEN'S FORMAL/WORK OUTFITS
  {
    occasion: 'work',
    gender: 'women',
    description: 'Professional and elegant',
    items: {
      top: 'Navy silk blouse',
      bottom: 'White tailored pants',
      shoes: 'Black pointed-toe heels',
      accessory: 'Pearl necklace with structured handbag'
    },
    colors: 'Navy, white, black'
  },
  {
    occasion: 'work',
    gender: 'women',
    description: 'Sophisticated and modern',
    items: {
      top: 'Charcoal blazer with cream camisole',
      bottom: 'Grey tailored trousers',
      shoes: 'Black leather loafers',
      accessory: 'Silver watch and minimalist belt'
    },
    colors: 'Charcoal, cream, grey'
  },
  {
    occasion: 'work',
    gender: 'women',
    description: 'Polished and confident',
    items: {
      top: 'White button-up shirt',
      bottom: 'Black pencil skirt',
      shoes: 'Black ankle boots',
      accessory: 'Gold layered necklace'
    },
    colors: 'White, black, gold'
  },
  // WOMEN'S CASUAL OUTFITS
  {
    occasion: 'casual',
    gender: 'women',
    description: 'Effortless and comfortable',
    items: {
      top: 'Cream cashmere sweater',
      bottom: 'Light wash denim jeans',
      shoes: 'White leather sneakers',
      accessory: 'Tan crossbody bag and simple gold necklace'
    },
    colors: 'Cream, light blue, white'
  },
  {
    occasion: 'casual',
    gender: 'women',
    description: 'Relaxed and stylish',
    items: {
      top: 'Oversized grey cardigan',
      bottom: 'Dark wash boyfriend jeans',
      shoes: 'Beige canvas sneakers',
      accessory: 'Brown leather backpack'
    },
    colors: 'Grey, dark blue, beige'
  },
  {
    occasion: 'casual',
    gender: 'women',
    description: 'Cool and laid-back',
    items: {
      top: 'White cotton tee',
      bottom: 'Khaki chinos',
      shoes: 'Brown loafers',
      accessory: 'Leather belt and simple watch'
    },
    colors: 'White, khaki, brown'
  },
  // WOMEN'S PARTY/EVENING OUTFITS
  {
    occasion: 'party',
    gender: 'women',
    description: 'Glamorous and stunning',
    items: {
      top: 'Emerald green velvet top',
      bottom: 'Black satin pants',
      shoes: 'Gold strappy heels',
      accessory: 'Statement gold earrings with metallic clutch'
    },
    colors: 'Emerald, black, gold'
  },
  {
    occasion: 'party',
    gender: 'women',
    description: 'Elegant and sophisticated',
    items: {
      top: 'Burgundy silk camisole',
      bottom: 'Black midi skirt',
      shoes: 'Black heels',
      accessory: 'Gold bracelet with metallic clutch'
    },
    colors: 'Burgundy, black, gold'
  },
  {
    occasion: 'party',
    gender: 'women',
    description: 'Bold and beautiful',
    items: {
      top: 'Sapphire blue beaded dress',
      bottom: 'N/A (dress)',
      shoes: 'Silver metallic heels',
      accessory: 'Silver statement earrings'
    },
    colors: 'Sapphire, silver'
  },
  // WOMEN'S SUMMER OUTFITS
  {
    occasion: 'summer',
    gender: 'women',
    description: 'Light and breezy',
    items: {
      top: 'White linen blouse',
      bottom: 'Cream linen shorts',
      shoes: 'Tan sandals',
      accessory: 'Wide-brimmed sun hat with sunglasses'
    },
    colors: 'White, cream, tan'
  },
  {
    occasion: 'summer',
    gender: 'women',
    description: 'Cool and tropical',
    items: {
      top: 'Light blue cotton camisole',
      bottom: 'White maxi skirt',
      shoes: 'Beige espadrilles',
      accessory: 'Straw tote bag and light scarf'
    },
    colors: 'Light blue, white, beige'
  },
  {
    occasion: 'summer',
    gender: 'women',
    description: 'Fresh and vibrant',
    items: {
      top: 'Pastel yellow tank top',
      bottom: 'White linen shorts',
      shoes: 'White sneakers',
      accessory: 'Sunglasses and canvas backpack'
    },
    colors: 'Pale yellow, white, neutral'
  },
  // WOMEN'S WINTER OUTFITS
  {
    occasion: 'winter',
    gender: 'women',
    description: 'Cozy and chic',
    items: {
      top: 'Camel wool coat over burgundy sweater',
      bottom: 'Dark grey tailored pants',
      shoes: 'Brown ankle boots',
      accessory: 'Cashmere scarf in camel'
    },
    colors: 'Camel, burgundy, grey'
  },
  {
    occasion: 'winter',
    gender: 'women',
    description: 'Warm and stylish',
    items: {
      top: 'Forest green wool sweater',
      bottom: 'Cream wool trousers',
      shoes: 'Black leather boots',
      accessory: 'Cream wool scarf and leather gloves'
    },
    colors: 'Forest green, cream, black'
  },
  {
    occasion: 'winter',
    gender: 'women',
    description: 'Rich and sophisticated',
    items: {
      top: 'Charcoal wool coat over rust-colored turtleneck',
      bottom: 'Black tailored trousers',
      shoes: 'Black leather boots',
      accessory: 'Mustard wool scarf'
    },
    colors: 'Charcoal, rust, black'
  }
];

function detectGender(message: string): 'men' | 'women' | null {
  const lowerMessage = message.toLowerCase();
  
  // Check for "i am men" or similar patterns first
  if (lowerMessage.includes('i am men') || lowerMessage.includes('i am male') || 
      lowerMessage.includes('i am a man') || lowerMessage.includes('i am boy')) {
    console.log('Detected: MEN');
    return 'men';
  }
  
  if (lowerMessage.includes('i am women') || lowerMessage.includes('i am female') || 
      lowerMessage.includes('i am a woman') || lowerMessage.includes('i am girl')) {
    console.log('Detected: WOMEN');
    return 'women';
  }
  
  // General keyword search
  if (lowerMessage.includes('men') || lowerMessage.includes('male') || 
      lowerMessage.includes('boy') || lowerMessage.includes('guy') || lowerMessage.includes('man')) {
    console.log('Detected: MEN (keyword)');
    return 'men';
  }
  
  if (lowerMessage.includes('women') || lowerMessage.includes('female') || 
      lowerMessage.includes('girl') || lowerMessage.includes('lady') || lowerMessage.includes('woman')) {
    console.log('Detected: WOMEN (keyword)');
    return 'women';
  }
  
  console.log('No gender detected');
  return null;
}

function generateOutfitRecommendation(occasion: string, userGender: 'men' | 'women' | null): string {
  console.log(`Generating outfit for: ${occasion}, Gender: ${userGender}`);
  
  // Filter by occasion first
  let matchingOutfits = outfitCombinations.filter(o => 
    o.occasion.toLowerCase() === occasion.toLowerCase()
  );
  
  console.log(`Found ${matchingOutfits.length} outfits for ${occasion}`);
  
  // If user specified a gender, STRICTLY use only that gender's outfits
  if (userGender === 'men') {
    matchingOutfits = matchingOutfits.filter(o => o.gender === 'men');
    console.log(`Filtered to ${matchingOutfits.length} men's outfits`);
  } else if (userGender === 'women') {
    matchingOutfits = matchingOutfits.filter(o => o.gender === 'women');
    console.log(`Filtered to ${matchingOutfits.length} women's outfits`);
  } else {
    // Default: prefer women's outfits if no gender specified
    const womenOutfits = matchingOutfits.filter(o => o.gender === 'women');
    if (womenOutfits.length > 0) {
      matchingOutfits = womenOutfits;
    }
  }
  
  if (matchingOutfits.length === 0) {
    return "Try asking about work, casual, party, or seasonal outfits!";
  }

  const outfit = getRandomElement(matchingOutfits);
  console.log(`Selected outfit: ${outfit.description} for ${outfit.gender}`);
  
  return `${outfit.description.charAt(0).toUpperCase() + outfit.description.slice(1)}: ${outfit.items.top} with ${outfit.items.bottom}, ${outfit.items.shoes}, and ${outfit.items.accessory}.`;
}

// Persistent AudioContext to avoid initialization issues in browsers
let sharedAudioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume();
  }
  return sharedAudioContext;
};

// Enhanced fashion advice generator with gender-aware outfit suggestions
export const getFashionAdvice = async (history: { role: string; message: string }[]) => {
  const lastUserMessage = history[history.length - 1]?.message.toLowerCase() || '';
  const userGender = detectGender(history[history.length - 1]?.message || '');
  
  // Pattern-based responses - kept SHORT to reduce TTS costs
  let response = '';
  
  if (lastUserMessage.includes('color') || lastUserMessage.includes('colour')) {
    response = "Navy with cream, burgundy with forest green, or black with white. What occasion?";
  } else if (lastUserMessage.includes('formal') || lastUserMessage.includes('office') || lastUserMessage.includes('work') || lastUserMessage.includes('meeting') || lastUserMessage.includes('interview')) {
    response = generateOutfitRecommendation('work', userGender);
  } else if (lastUserMessage.includes('casual') || lastUserMessage.includes('weekend') || lastUserMessage.includes('friends') || lastUserMessage.includes('hangout')) {
    response = generateOutfitRecommendation('casual', userGender);
  } else if (lastUserMessage.includes('party') || lastUserMessage.includes('evening') || lastUserMessage.includes('night out') || lastUserMessage.includes('date') || lastUserMessage.includes('wedding') || lastUserMessage.includes('celebration')) {
    response = generateOutfitRecommendation('party', userGender);
  } else if (lastUserMessage.includes('summer') || lastUserMessage.includes('hot') || lastUserMessage.includes('warm') || lastUserMessage.includes('beach') || lastUserMessage.includes('vacation')) {
    response = generateOutfitRecommendation('summer', userGender);
  } else if (lastUserMessage.includes('winter') || lastUserMessage.includes('cold') || lastUserMessage.includes('snow') || lastUserMessage.includes('freezing')) {
    response = generateOutfitRecommendation('winter', userGender);
  } else if (lastUserMessage.includes('outfit') || lastUserMessage.includes('wear') || lastUserMessage.includes('dress') || lastUserMessage.includes('clothes') || lastUserMessage.includes('style') || lastUserMessage.includes('suit') || lastUserMessage.includes('pants') || lastUserMessage.includes('shirt') || lastUserMessage.includes('top')) {
    response = "Tell me the occasion: work, casual, party, or something else?";
  } else if (lastUserMessage.includes('help') || lastUserMessage.includes('suggest') || lastUserMessage.includes('advice') || lastUserMessage.includes('recommend') || lastUserMessage.includes('choose') || lastUserMessage.includes('what')) {
    response = "What's the occasion? Work, casual, party, summer, or winter? I'll suggest an outfit.";
  } else {
    response = "Hi! Tell me the occasion and I'll suggest an outfit for you.";
  }
  
  return response;
};

const cleanTextForSpeech = (text: string) => {
  // Remove markdown formatting like stars, hashtags, etc. for better TTS
  return text.replace(/[*#_~]/g, '').replace(/\[.*?\]/g, '').trim();
};

// Use Eleven Labs API for Text-to-Speech
export const getSpeech = async (text: string) => {
  const cleanedText = cleanTextForSpeech(text);
  if (!cleanedText) return null;

  try {
    const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
    
    console.log('=== TTS Debug ===');
    console.log('API Key present:', !!ELEVENLABS_API_KEY);
    console.log('Text to speak:', cleanedText.substring(0, 50) + '...');
    
    if (!ELEVENLABS_API_KEY) {
      console.error('VITE_ELEVENLABS_API_KEY is not set');
      return null;
    }
    
    const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Sarah voice (female, warm)
    
    console.log('Calling Eleven Labs API...');
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY || '',
      },
      body: JSON.stringify({
        text: cleanedText,
        model_id: 'eleven_turbo_v2_5', // Updated model - works on free tier
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Eleven Labs API error:', response.status, errorText);
      throw new Error(`Eleven Labs API error: ${response.status} - ${errorText}`);
    }

    const audioBlob = await response.blob();
    console.log('Audio blob size:', audioBlob.size);
    
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    
    console.log('TTS Success! Base64 length:', base64Audio.length);
    return base64Audio;
  } catch (error) {
    console.error("TTS Generation Error:", error);
    return null;
  }
};

export const playAudio = async (base64Audio: string, onEnded?: () => void) => {
  try {
    const ctx = getAudioContext();
    
    // Decode MP3 audio from Eleven Labs
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }
    
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.onended = () => {
      if (onEnded) onEnded();
    };
    source.start();
    return source;
  } catch (error) {
    console.error("Audio Playback Error:", error);
    if (onEnded) onEnded();
    return null;
  }
};
