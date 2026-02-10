export const MEDIA_TUNING = {
  '/web_images/campania_101_asset_179.jpg': {
    bgSize: 'cover',
    bgPos: '50% 35%',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/campania_106_asset_302.jpg': {
    bgSize: 'cover',
    bgPos: '50% 35%',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/campania_106_asset_310.mp4': {
    fit: 'cover',
    pos: '50% -200px',
  },
  '/web_images/campania_107_asset_192.jpg': {
    fit: 'cover',
    pos: '50% 40%',
  },
  '/web_images/campania_111_asset_208.jpg': {
    bgSize: 'cover',
    bgPos: '50% -200px',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/campania_111_asset_225.jpg': {
    fit: 'cover',
    pos: '50% 40%',
  },
  '/web_images/campania_138_asset_308 (1).jpg': {
    bgSize: 'cover',
    bgPos: '50% 35%',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/campania_85_asset_146.jpg': {
    bgSize: 'cover',
    bgPos: '50% 35%',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/campania_85_asset_148.mp4': {
    fit: 'cover',
    pos: '590% -1000px',
  },
  '/web_images/editorial_campania_96_asset_174.jpg': {
    bgSize: 'cover',
    bgPos: '50% 35%',
    fit: 'cover',
    pos: '50% 35%',
  },
  '/web_images/garment_bottom.jpg': {
    bgSize: 'contain',
    bgPos: '50% 50%',
    bgColor: 'rgba(255, 255, 255, 0.78)',
    fit: 'contain',
    pos: '50% 50%',
  },
  '/web_images/garment_top.jpg': {
    bgSize: 'contain',
    bgPos: '50% 50%',
    bgColor: 'rgba(255, 255, 255, 0.78)',
    fit: 'contain',
    pos: '50% 50%',
  },
}

const fallbackMedia = {
  fit: 'cover',
  pos: '50% 50%',
}

const fallbackBg = {
  bgSize: 'cover',
  bgPos: '50% 50%',
  bgColor: 'rgba(0, 0, 0, 0.35)',
}

export function mediaVars(src, overrides = {}) {
  const tuned = MEDIA_TUNING[src] || {}
  const fit = overrides.fit ?? tuned.fit ?? fallbackMedia.fit
  const pos = overrides.pos ?? tuned.pos ?? fallbackMedia.pos

  return {
    '--vs-media-fit': fit,
    '--vs-media-pos': pos,
  }
}

export function bgVars(src, overrides = {}) {
  const tuned = MEDIA_TUNING[src] || {}
  const bgSize = overrides.bgSize ?? tuned.bgSize ?? tuned.fit ?? fallbackBg.bgSize
  const bgPos = overrides.bgPos ?? tuned.bgPos ?? tuned.pos ?? fallbackBg.bgPos
  const bgColor = overrides.bgColor ?? tuned.bgColor ?? fallbackBg.bgColor

  return {
    '--vs-bg-size': bgSize,
    '--vs-bg-pos': bgPos,
    '--vs-bg-color': bgColor,
  }
}
