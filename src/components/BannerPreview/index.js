// This is the only way export styles with component
// We can't even use inline styles, because we need ::after pseudo-element
const scopedStyles = `
.story-previewer-link {
  display: block;
  width: 141px;
  height: 188px;
}

.story-previewer-preview {
  font: 13px/1.5 Arial,'Helvetica Neue',Helvetica,sans-serif;
  position: relative;
  width: 141px;
  height: 188px;
  cursor: pointer;
  border-radius: 8px;
}

.story-previewer-preview:hover {
  opacity: .9;
}

.story-previewer-preview-circle::after {
  position: absolute;
  top: -3px;
  right: -5px;
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f71b47;
  border: 3px solid #fff;
}

.story-previewer-image {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  width: 141px;
  height: 188px;
  background-color: #d8d8d8;
  object-fit: cover;
}

.story-previewer-title {
  position: absolute;
  left: 0;
  bottom: 16px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 11px 0 14px;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #fff;
  text-align: left;
  white-space: pre-line;
  word-wrap: break-word;
}

.story-previewer-text {
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  /* (Number of lines you want visible) * (line-height) */
  max-height: 3.6em;
  line-height: 1.2em;
  /* Can display ... in newer browsers */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
`;

export default function BannerPreview({
    bannerImage,
    bannerLabel,
    bannerLink,
    bannerCircle,
    bannerColor,
    bannerGradient,
    bannerBackgroundType
}) {
  const style = {}
  if (bannerBackgroundType === 'color') {
    style.backgroundColor = bannerColor;
  }
  if (bannerBackgroundType === 'gradient') {
    style.backgroundImage = bannerGradient;
  }

  return (
    <>
    <style scoped dangerouslySetInnerHTML={{__html: scopedStyles}} ></style>
      <a className="story-previewer-link" href={bannerLink} target="_blank" rel="noreferrer">
        <div className={'story-previewer-preview' + (bannerCircle ? ' story-previewer-preview-circle' : '')} style={style}>
          {bannerBackgroundType === 'image' ? <img className="story-previewer-image" src={bannerImage} alt="banner" /> : '' }
          <div className="story-previewer-title">
            <span className="story-previewer-text">{bannerLabel}</span>
          </div>
        </div>
      </a>
    </>
  )
}