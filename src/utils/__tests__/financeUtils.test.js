import { getShowPriceFlags } from '../financeUtils';

describe('getShowPriceFlags', () => {
  describe('not available payment options', () => {
    const paymentOptions = undefined;
    const provinceCode = 'ON';
    it('matches truth table output {showMsrpPrice: false, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeFalsy();
    });

    it('matches truth table output {showMsrpPrice: false, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeFalsy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });
  });

  describe('no selection payment options', () => {
    const paymentOptions = {
      paymentMethod: undefined,
      paymentFrequency: 'weekly',
    };
    const provinceCode = 'ON';
    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });

    it('matches truth table output {showMsrpPrice: false, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeFalsy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });
  });

  describe('selected payment options', () => {
    const paymentOptions = {
      paymentMethod: 'lease',
      paymentFrequency: 'weekly',
    };
    const provinceCode = 'ON';
    it('matches truth table output {showMsrpPrice: false, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeFalsy();
    });

    it('matches truth table output {showMsrpPrice: false, showSellingPrice: true}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: true,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeTruthy();
      expect(ret.showMsrpPrice).toBeFalsy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: true,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });

    it('matches truth table output {showMsrpPrice: true, showSellingPrice: false}', () => {
      const provinces = [
        {
          name: 'ON',
          displayName: 'Ontario',
          showMsrpPrice: false,
          showSellingPrice: false,
        },
      ];
      const ret = getShowPriceFlags(provinceCode, provinces, paymentOptions);
      expect(ret.showSellingPrice).toBeFalsy();
      expect(ret.showMsrpPrice).toBeTruthy();
    });
  });
});
