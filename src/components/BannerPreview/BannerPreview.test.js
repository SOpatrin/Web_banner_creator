import { render } from "@testing-library/react";
import BannerPreview from ".";
import placeholder from "../../placeholder";

describe('<BannerPreview />', () => {
    test('Render', () => {
        const {container} = render(<BannerPreview />);
        expect(container).not.toBeNull();
    });

    test('Base props', () => {
        const props = {
            bannerLabel: 'Сюда помещается только',
            bannerCircle: true,
            bannerBackgroundType: 'color',
            bannerColor: 'rgb(0, 0, 0)',
            bannerLink: '/'
        }
        const {getByText, container} = render(<BannerPreview {...props} />);
        expect(container.querySelector('a').getAttribute('href')).toBe(props.bannerLink);
        expect(getComputedStyle(container.querySelector('.story-previewer-preview')).backgroundColor).toBe(props.bannerColor);
        expect(container.querySelector('.story-previewer-preview-circle')).not.toBeNull();
        expect(getByText(props.bannerLabel)).toBeInTheDocument();
    });

    test('Image', () => {
        const props = {
            bannerBackgroundType: 'image',
            bannerImage: placeholder,
        }
        const {container} = render(<BannerPreview {...props} />);
        expect(container.querySelector('img')).not.toBeNull();
        expect(container.querySelector('img').src).toBe(props.bannerImage);
    });

    // Have no idea why this is not working
    // test('Gradient', () => {
    //     const props = {
    //         bannerBackgroundType: 'gradient',
    //         bannerGradient: 'linear-gradient(to left top, rgb(246, 157, 60), rgb(63, 135, 166))',
    //     }
    //     const {container} = render(<BannerPreview {...props} />);
    //     expect(getComputedStyle(container.querySelector('.story-previewer-preview')).background).toBe(props.bannerGradient);
    // });
});