import { renderHook, act } from '@testing-library/react-hooks';
import useScript from '../hooks/useScript';
import * as isSSRModule from '../isSSR';

describe('useScript', () => {
    const url = 'https://example.com/script';
    const id = 'scriptId';

    beforeEach(() => {
        // Clear any existing scripts
        document.body.innerHTML = '';
    });

    test('should add a script element to the document head', () => {
        renderHook(() => useScript(url, id));

        expect(document.body.children.length).toBe(1);
        expect(document.body.children[0].tagName).toBe('SCRIPT');
        expect(document.body.children[0].src).toBe(url);
        expect(document.body.children[0].id).toBe(id);
    });

    test('should remove the script element from the document head on unmount', () => {
        const { unmount } = renderHook(() => useScript(url, id));

        expect(document.body.children.length).toBe(1);

        act(() => {
            unmount();
        });

        expect(document.body.children.length).toBe(0);
    });

    test('should not add a script element during server-side rendering', () => {
        isSSRModule.default = jest.fn().mockReturnValue(true);

        renderHook(() => useScript(url, id));

        expect(document.body.children.length).toBe(0);
    });
});
