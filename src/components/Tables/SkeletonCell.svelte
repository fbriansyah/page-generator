

<span class="skeleton-box h-5 w-full inline-block" />

<style lang="postcss">
  .skeleton-box {
    @apply relative overflow-hidden;
    background-color: #e2e8f0;
  }

  .skeleton-box::after {
    @apply absolute top-0 right-0 bottom-0 left-0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 1.5s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  /* .skeleton-title {
    @apply h-7;
    max-width: 16rem;
  }
  .skeleton-subtitle {
    @apply h-6 max-w-xs;
  }
  .skeleton-field-1 {
    @apply h-6;
    max-width: 6rem;
  }
  .skeleton-field-2 {
    @apply h-6;
    max-width: 8rem;
  }
  .skeleton-field-3 {
    @apply h-6;
    max-width: 10rem;
  } */
</style>
