<template lang="pug">
  <ComponentExample title="Free mode" id="free-mode" :tabs="exampleTabs" padding="-p--3 -p-lg--6" additionalClasses="-bg--grey-10">
    p.-text(slot="example-description")
      | In this mode there is no automated action triggered when an element activates,
      | so you will need to manage all custom behavior.
    .-mw--720.-mx--auto(slot="example")
      .chi-epanel.-no-step(data-chi-epanel-group='example__free-mode' v-for="(panel, index) in panels" :class="panel.isActive ? '-active' : ''")
          .chi-epanel__header
            .chi-epanel__title(data-chi-epanel-action='toggle') {{ panel.title }}
            .chi-epanel__action.-done--only
              button.chi-button.-primary.-flat(data-chi-epanel-action='active') Change
          .chi-epanel__collapse
            .-active--only
              .chi-epanel__body
                .chi-epanel__content
                  .chi-epanel__subtitle Optional subtitle
                  p.chi-epanel__text Content goes here
                .chi-epanel__footer.-justify-content--end
                  button.chi-button(data-chi-epanel-action='previous' v-if="index !== 0") Previous
                  button.chi-button(data-chi-epanel-action='next' v-if="index !== 3").-primary Continue
    <Wrapper slot="code-htmlblueprint">
      <JSNeeded />
      <pre class="language-html">
        <code v-highlight="$data.codeSnippets.htmlblueprint" class="html"></code>
      </pre>
    </Wrapper>
  </ComponentExample>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

declare const chi: any;

@Component({
  data: () => {
    return {
      exampleTabs: [
        {
          active: false,
          id: 'webcomponent',
          label: 'Web Component',
          disabled: true
        },
        {
          id: 'vue',
          label: 'Vue',
          disabled: true
        },
        {
          active: true,
          id: 'htmlblueprint',
          label: 'HTML Blueprint',
        }
      ],
      panels: [{ title: 'Panel 1', isActive: true }, { title: 'Panel 2', isActive: false }, { title: 'Panel 3', isActive: false }, { title: 'Panel 4', isActive: false }],
      codeSnippets: {
        htmlblueprint: `<div class="chi-epanel -no-step -active" data-chi-epanel-group="example__free-mode">
  <div class="chi-epanel__header">
    <div class="chi-epanel__title" data-chi-epanel-action="toggle">Panel 1</div>
  </div>
  <div class="chi-epanel__collapse">
    <div class="-active--only">
      <div class="chi-epanel__body">
        <div class="chi-epanel__content">
          <div class="chi-epanel__subtitle">Optional subtitle</div>
          <p class="chi-epanel__text">Content goes here</p>
        </div>
        <div class="chi-epanel__footer -justify-content--end">
          <button class="chi-button -primary" data-chi-epanel-action="next">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="chi-epanel -no-step" data-chi-epanel-group="example__free-mode">
  <div class="chi-epanel__header">
    <div class="chi-epanel__title" data-chi-epanel-action="toggle">Panel 2</div>
  </div>
  <div class="chi-epanel__collapse">
    <div class="-active--only">
      <div class="chi-epanel__body">
        <div class="chi-epanel__content">
          <div class="chi-epanel__subtitle">Optional subtitle</div>
          <p class="chi-epanel__text">Content goes here</p>
        </div>
        <div class="chi-epanel__footer -justify-content--end">
          <button class="chi-button" data-chi-epanel-action="previous">Previous</button>
          <button class="chi-button -primary" data-chi-epanel-action="next">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="chi-epanel -no-step" data-chi-epanel-group="example__free-mode">
  <div class="chi-epanel__header">
    <div class="chi-epanel__title" data-chi-epanel-action="toggle">Panel 3</div>
  </div>
  <div class="chi-epanel__collapse">
    <div class="-active--only">
      <div class="chi-epanel__body">
        <div class="chi-epanel__content">
          <div class="chi-epanel__subtitle">Optional subtitle</div>
          <p class="chi-epanel__text">Content goes here</p>
        </div>
        <div class="chi-epanel__footer -justify-content--end">
          <button class="chi-button" data-chi-epanel-action="previous">Previous</button>
          <button class="chi-button -primary" data-chi-epanel-action="next">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="chi-epanel -no-step" data-chi-epanel-group="example__free-mode">
  <div class="chi-epanel__header">
    <div class="chi-epanel__title" data-chi-epanel-action="toggle">Panel 4</div>
  </div>
  <div class="chi-epanel__collapse">
    <div class="-active--only">
      <div class="chi-epanel__body">
        <div class="chi-epanel__content">
          <div class="chi-epanel__subtitle">Optional subtitle</div>
          <p class="chi-epanel__text">Content goes here</p>
        </div>
        <div class="chi-epanel__footer -justify-content--end">
          <button class="chi-button" data-chi-epanel-action="previous">Previous</button>
          <button class="chi-button -primary" data-chi-epanel-action="next">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- JavaScript -->
<script>
  chi.expansionPanel(
    document.querySelectorAll('[data-chi-epanel-group="example__free-mode"]'),
    {mode: 'free'}
  );
<\/script>`
      }
    };
  }
})
export default class FreeMode extends Vue {
  mounted() {
    const panel = document.querySelectorAll('[data-chi-epanel-group="example__free-mode"]');
    chi.expansionPanel(panel, {mode: 'free'});
  }
}
</script>
