<template>
  <panel title="Youtube Video">
    <youtube
      :video-id="youtubeId"
      :player-width="plWdh || 600"
      :player-height="plHgh || 300"
      :player-vars="autoplay || {autoplay: 0}">
    </youtube>
  </panel>
</template>

<script>
import VueYouTubeEmbed from 'vue-youtube-embed'

export default {
  props: [
    'youtubeId',
    'plWdh',
    'plHgh',
    'autoplay'
  ],
  components: {
    VueYouTubeEmbed
  }
}
</script>

<style scoped>

</style>
