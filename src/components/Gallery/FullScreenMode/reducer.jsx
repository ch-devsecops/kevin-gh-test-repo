export const SHOW_CONTROLS = 'SHOW_CONTROLS';
export const SHOW_CONTENT = 'SHOW_CONTENT';
export const SHOW_THUMBNAILS = 'SHOW_THUMBNAILS';
export const RESET_STATE = 'SHOW_THUMBNAILS';
export const ENABLE_ANIMATIONS = 'ENABLE_ANIMATIONS';
export const ENABLE_EVENTS = 'ENABLE_EVENTS';

export const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_CONTROLS: {
      return {
        ...state,
        showControls: action.payload,
      };
    }
    case SHOW_CONTENT: {
      return {
        ...state,
        showContent: action.payload,
        showThumbnails: false,
        showControls: false,
        enableEvents: !action.payload,
      };
    }
    case SHOW_THUMBNAILS: {
      return {
        ...state,
        showThumbnails: action.payload,
        showContent: false,
        showControls: false,
        enableEvents: !action.payload,
      };
    }
    case RESET_STATE: {
      return {
        showContent: false,
        showControls: false,
        showThumbnails: false,
        shouldAnimate: false,
        enableEvents: false,
      };
    }
    case ENABLE_ANIMATIONS: {
      return {
        ...state,
        shouldAnimate: action.payload,
      };
    }
    case ENABLE_EVENTS: {
      return {
        ...state,
        enableEvents: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
