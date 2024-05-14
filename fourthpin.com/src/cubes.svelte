<script>
  import { onMount } from 'svelte';
  import { useActions } from 'svelte-cubed';

  let cube;

  onMount(() => {
    const { setRotation } = useActions(cube);
    setInterval(() => {
      setRotation([Math.random() * 360, Math.random() * 360, Math.random() * 360]);
    }, 1000);
  });
</script>

<scene>
  <perspectiveCamera />
  <pointLight />
  <mesh ref={cube} geometry={cube} scale={5} />
</scene>