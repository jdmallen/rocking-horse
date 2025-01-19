<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style lang="css">
  /* 
    Setting a bunch of baseline defaults so we can have a consistent starting
    point for our styles.
    
    Credit to @slayingthedragon on YouTube for inspiring much of this!
  */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  :root {
    /* https://coolors.co/7e0112-440812-090f11-6587d7-fff9fb-ed9b40 */

    --clr-falu-red: hsl(4, 98%, 25%); /* original Rocking Horse site red */
    --clr-chocolate-cosmos: hsl(350, 79%, 15%);
    --clr-night: hsl(190, 31%, 5%);
    --clr-glaucous: hsl(222, 60%, 62%);
    --clr-snow: hsl(340, 100%, 99%);
    --clr-slate-gray: hsl(199, 15%, 51%);
    --clr-butterscotch: hsl(32, 83%, 59%);

    --clr-dark: var(--clr-chocolate-cosmos);
    --clr-light: var(--clr-snow);
  }

  * {
    margin: 0;
    line-height: calc(1em + 0.5rem);
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: "Poppins", system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    font-weight: 400;
    font-style: normal;
    background-color: var(--clr-dark);
    color: var(--clr-light);
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    user-select: none;
  }

  button {
    display: inline-block;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
  }

  a {
    color: var(--clr-glaucous)
  }

  strong {
    color: var(--clr-butterscotch)
  }

</style>
