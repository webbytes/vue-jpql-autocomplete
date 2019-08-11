import { mount } from '@vue/test-utils'
import VueJpqlAutocomplete from '@/components/VueJpqlAutocomplete.vue'

describe('VueJpqlAutocomplete.vue - placeholder', () => {
  require('./placeholder.spec.json').forEach(testData => {
    it('renders the placeholder as the props.placeholder when passed. test for - ' + testData.scenario, () => {
      const msg = 'new message'
      const wrapper = mount(VueJpqlAutocomplete, {
        propsData: { 
          placeholder: testData.placeholder
        }
      });
      expect(wrapper.find('input.autosuggest').attributes('placeholder')).toBe(testData.expectedPlaceholder)
    });
  });
})
