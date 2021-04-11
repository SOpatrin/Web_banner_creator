import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { toPng } from 'dom-to-image';
import styles from './App.module.css';
import placeholder from '../../placeholder';
import BannerPreview from '../BannerPreview/';

function App() {
  const [bannerLabel, setBannerLabel] = useState('Сюда помещается только 3 строки');
  const [bannerLink, setBannerLink] = useState('');
  const [bannerColor, setBannerColor] = useState('#fe9a9a');
  const [bannerGradient, setBannerGradient] = useState('linear-gradient(to top left, #f69d3c, #3f87a6)');
  const [bannerBackgroundType, setBannerBackgroundType] = useState('image');
  const [bannerCircle, setBannerCircle] = useState(true);

  const [bannerImage, setBannerImage] = useState(placeholder);
  const [bannerScreenshot, setBannerScreenshot] = useState('');
  // Create screenshot of banner node on visual changes
  useEffect(() => {
    toPng(document.querySelector('#take-screenshot'))
      .then((data) => {
        setBannerScreenshot(data);
      });
  }, [bannerLabel, bannerImage, bannerColor, bannerGradient, bannerBackgroundType, bannerCircle]);

  const Banner = () => (
    <BannerPreview 
      bannerImage={bannerImage} 
      bannerLabel={bannerLabel} 
      bannerLink={bannerLink}
      bannerCircle={bannerCircle}
      bannerColor={bannerColor}
      bannerGradient={bannerGradient}
      bannerBackgroundType={bannerBackgroundType}
    />
  )

  // Use ReactDOMServer instead outerHTML because "empty" elements have no closing "/"
  const bannerHtml = ReactDOMServer.renderToString(<Banner />);
  const jsonConfig = JSON.stringify({
    bannerImage,
    bannerLabel,
    bannerLink,
    bannerCircle,
    bannerColor,
    bannerGradient,
    bannerBackgroundType,
  });

  // Handlers

  // Convert image to base64 data
  const handleImageInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBannerImage(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleCopyHtmlClick = () => {
    navigator.clipboard.writeText(bannerHtml);
  }

  const handleCopyJsonClick = () => {
    navigator.clipboard.writeText(jsonConfig);
  }

  const handleRadioChange = (event) => {
    setBannerBackgroundType(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }


  return (
    <div className={styles['app']}>
      <div id="take-screenshot" className={styles['take-screenshot']}>
        <Banner />
      </div>
      <form className={styles['controls']} onSubmit={handleFormSubmit} noValidate>
        <div className={styles['controls-row']}>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>Текст банера:</span>
            <input
              className={styles['controls-text-input']}
              type="text"
              name="banner-label"
              value={bannerLabel}
              onInput={(e) => setBannerLabel(e.target.value)}
            />
          </label>
        </div>
        <div className={styles['controls-row']}>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>Адрес ссылки:</span>
            <input
              className={styles['controls-text-input']}
              type="url"
              name="banner-link"
              placeholder="https://example.com"
              value={bannerLink}
              onInput={(e) => setBannerLink(e.target.value)}
            />
          </label>
        </div>
        <div className={styles['controls-row']}>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>С красным круглешком?</span>
            <input
              className={styles['controls-text-input']}
              type="checkbox"
              name="banner-circle"
              checked={bannerCircle}
              onChange={() => setBannerCircle(!bannerCircle)}
            />
          </label>
        </div>
        <div className={styles['controls-row']}>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>Картинка</span>
            <input 
              type="radio"
              name="banner-background-type"
              value="image"
              checked={bannerBackgroundType === 'image'}
              onChange={handleRadioChange}
            />
          </label>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>Заливка</span>
            <input 
              type="radio"
              name="banner-background-type"
              value="color"
              checked={bannerBackgroundType === 'color'}
              onChange={handleRadioChange}
            />
          </label>
          <label className={styles['controls-label']}>
            <span className={styles['controls-label-text']}>Градиент</span>
            <input 
              type="radio"
              name="banner-background-type"
              value="gradient"
              checked={bannerBackgroundType === 'gradient'}
              onChange={handleRadioChange}
            />
          </label>
        </div>
        {
          bannerBackgroundType !== 'image' ? '' :
          <div className={styles['controls-row']} >
            <label className={styles['controls-label']}>
              <span className={styles['controls-label-text']}>Фоновая картинка:</span>
              <input 
                type="file" 
                accept="image/*" 
                name="banner-image" 
                onChange={handleImageInput}
              />
            </label>
          </div>
        }
        {
          bannerBackgroundType !== 'color' ? '' :
          <div className={styles['controls-row']}>
            <label className={styles['controls-label']}>
              <span className={styles['controls-label-text']}>Фоновая заливка:</span>
              <input 
                type="color"
                name="banner-color"
                value={bannerColor}
                onChange={(e) => setBannerColor(e.target.value)}
              />
            </label>
          </div>
        }
        {
          bannerBackgroundType !== 'gradient' ? '' :
          <div className={styles['controls-row']}>
            <label className={styles['controls-label']}>
              <span className={styles['controls-label-text']}>Фоновый градиент:</span>
              <input 
                type="text"
                name="banner-gradient"
                value={bannerGradient}
                onChange={(e) => setBannerGradient(e.target.value)}
              />
            </label>
          </div>
        }
        <div className={styles['controls-row']}>
          <a className={styles['button']} href={bannerScreenshot} download="banner">Сохранить в png</a>
        </div>
        <div className={styles['controls-row']}>
          <button className={styles['button']} onClick={handleCopyHtmlClick}>Скопировать html</button>
        </div>
        <div className={styles['controls-row']}>
          <button className={styles['button']} onClick={handleCopyJsonClick}>Скопировать конфигурацию</button>
        </div>
      </form>
    </div>
  );
}

export default App;
