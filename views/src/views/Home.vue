<template>
  <div class="home">
    <sui-grid>
      <sui-grid-row>
        <sui-grid-column :computer="2" :tablet="1" class=""></sui-grid-column>
        <sui-grid-column centered :computer="12" :tablet="14" :mobile="16">
          <div
            v-if="shorted"
            class="ui one column stackable center aligned page grid shortened-res"
          >
            <div class="column twelve wide">
              <!-- TODO: Fix styles of this -->
              <h1>{{ shorted }}</h1>
            </div>
          </div>
          <div class="ui action left icon input full-width">
            <input
              type="text"
              placeholder="Paste your URL and GoShort"
              class="main-input"
              v-model="url"
              @keyup.enter="saveURL"
            />
            <div class="ui teal button" @click.prevent="saveURL">
              <i class="paper plane icon"></i>
            </div>
          </div>
          <sui-message
            v-if="error"
            icon="times circle"
            error
            header="Your URL is invalid"
            content="Please provide a valid URL."
          />
        </sui-grid-column>
        <sui-grid-column :computer="2" :tablet="1" class=""></sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  components: {},
  data: () => ({
    url: null,
    error: null,
    shorted: null
  }),
  methods: {
    async saveURL() {
      await axios
        .post("http://localhost:8080/api/v1/shorten", {
          original_url: this.url
        })
        .then(
          response => {
            // TODO: Implement env with domain name
            this.shorted = "http://localhost:8080/" + response.data.url.code;
          },
          () => {
            this.error = true;
            setTimeout(() => (this.error = false), 5000);
          }
        );
      this.url = "";
    }
  }
};
</script>