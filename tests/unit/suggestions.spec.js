import { mount } from '@vue/test-utils'
import VueJpqlAutocomplete from '@/components/VueJpqlAutocomplete.vue'


describe('VueJpqlAutocomplete.vue - operators', () => {
  require('./suggestions.spec.json').forEach(testData => {
    it('renders the suggestions options as per the entered text. test for - ' + testData.scenario, async () => {
      const wrapper = mount(VueJpqlAutocomplete, { attachToDocument: true });
      var input = wrapper.find('input.autosuggest');
      input.setValue(testData.query);
      expect(wrapper.emitted().input).toBeTruthy();
      input.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('li.autosuggest__results-item').length).toBe(testData.expectedSuggestions.length);
      for(var i=0; i<testData.expectedSuggestions.length; i++) {
        expect(wrapper.findAll('li.autosuggest__results-item').at(i).text()).toBe(testData.expectedSuggestions[i]);
      }

      if(testData.suggestionIndex == 0 || testData.suggestionIndex) {
        if(testData.useMouse) {
          wrapper.findAll('li.autosuggest__results-item').at(testData.suggestionIndex).trigger('mouseenter');
          wrapper.findAll('li.autosuggest__results-item').at(testData.suggestionIndex).trigger('mouseover');
          wrapper.findAll('li.autosuggest__results-item').at(testData.suggestionIndex).trigger('mousedown', { clientX: 100});
          wrapper.findAll('li.autosuggest__results-item').at(testData.suggestionIndex).trigger('mouseup');
        } else {
          for(var i=0; i<=testData.suggestionIndex; i++) {
            input.trigger('keydown.down');
          };
          input.trigger('keydown.enter');
        }
        await wrapper.vm.$nextTick(()=>{});
        expect(wrapper.vm.query).toEqual(testData.expectedQuery);
        expect(wrapper.vm.isValid).toBe(!!testData.isValid);
      }
      wrapper.destroy();
    });
  });
})
