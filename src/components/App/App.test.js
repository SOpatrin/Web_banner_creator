import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './';

// getComputedStyles not implemented for pseudo elemends :(
jest.mock('dom-to-image', () => {
  const image = import('../../YouWasRickRolled.png') ;
  return {
    toPng: async () => image
  }
});

describe('<App />', () => {
  const setup = async () => {
    return await waitFor(() => {
      return render(<App />);
    });
  }

  test('Render', async () => {
    const {component} = await setup();

    expect(component).not.toBeNull();
  });

  describe('Check inputs', () => {
    test('Inputs amount', async () => {
      const {getAllByText} = await setup();
      const inputs = getAllByText((content, element) => {
        return element.tagName.toLowerCase() === 'input';
      });
  
      expect(inputs.length).toBe(7);
    });
  
    test('Label input', async () => {
      const {getByText} = await setup();
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-label';
      });
  
      fireEvent.input(input, {target: {value: 'some value'}});
  
      await waitFor(() => {
        expect(input.value).toBe('some value');
      });
    });
  
    test('Link input', async () => {
      const {getByText} = await setup();
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-link';
      });
  
      fireEvent.input(input, {target: {value: 'some value'}});
      expect(input.value).toBe('some value');
    });
  
    test('Circle checkbox', async () => {
      const {getByText} = await setup();
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-circle';
      });
  
      const oldValue = input.checked;
      fireEvent.click(input);
  
      await waitFor(() => {
        expect(input.checked).toBe(!oldValue);
      });
    });
  
    test('Background type radio', async () => {
      const {getAllByText} = await setup();
  
      const input = getAllByText((content, element) => {
        return element.getAttribute('name') === 'banner-background-type';
      });
  
      fireEvent.click(input[0]);
  
      await waitFor(() => {
        expect(input[0].value).toBe('image');
      });
  
      fireEvent.click(input[1]);
  
      await waitFor(() => {
        expect(input[1].value).toBe('color');
      });
  
      fireEvent.click(input[2]);
  
      await waitFor(() => {
        expect(input[2].value).toBe('gradient');
      });
    });

    test('Background color input', async () => {
      const {getByText, getAllByText} = await setup();
      const radios = getAllByText((content, element) => {
        return element.getAttribute('name') === 'banner-background-type';
      });
      
      fireEvent.click(radios[1]);
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-color';
      });
      fireEvent.input(input, {target: {value: '#000000'}});
  
      await waitFor(() => {
        expect(input.value).toBe('#000000');
      });
    });

    test('Background gradient input', async () => {
      const {getByText, getAllByText} = await setup();
      const radios = getAllByText((content, element) => {
        return element.getAttribute('name') === 'banner-background-type';
      });
      
      fireEvent.click(radios[2]);
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-gradient';
      });
      fireEvent.input(input, {target: {value: 'linear-gradient(to top, #fefcea, #f1da36)'}});
  
      await waitFor(() => {
        expect(input.value).toBe('linear-gradient(to top, #fefcea, #f1da36)');
      });
    });
  });

  describe('Check input impact on banner', () => {
    test('Label in banner', async () => {
      const {container, getByText} = await setup();
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-label';
      });
  
      fireEvent.input(input, {target: {value: 'some value'}});
  
      await waitFor(() => {
        expect(container.querySelector('.story-previewer-title').textContent).toBe('some value');
      });
    });

    test('Link in banner', async () => {
      const {container, getByText} = await setup();
      const input = getByText((content, element) => {
        return element.getAttribute('name') === 'banner-link';
      });
  
      fireEvent.input(input, {target: {value: 'some value'}});
      expect(container.querySelector('.story-previewer-link').getAttribute('href')).toBe('some value');
    });

    test('Background type in banner', async () => {
      const {container, getAllByText} = await setup();
  
      const inputs = getAllByText((content, element) => {
        return element.getAttribute('name') === 'banner-background-type';
      });
  
      fireEvent.click(inputs[0]);
  
      await waitFor(() => {
        expect(container.querySelector('.story-previewer-preview img')).toBeInTheDocument();
      });
  
      fireEvent.click(inputs[1]);
  
      await waitFor(() => {
        expect(
          getComputedStyle(container.querySelector('.story-previewer-preview'))
            .getPropertyValue('background-color'))
            .toMatch(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/);
      });
  
      fireEvent.click(inputs[2]);
  
      await waitFor(() => {
        expect(
          getComputedStyle(container.querySelector('.story-previewer-preview'))
            .getPropertyValue('background-color'))
            .toBe('');
      });
    });
  });
});
