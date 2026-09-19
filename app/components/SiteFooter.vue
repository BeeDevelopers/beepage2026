<template>
  <footer class="site-footer">
    <UContainer class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <SiteLogo />
          <p>Comunidad estudiantil de innovación y desarrollo de software.</p>
        </div>
        <div>
          <h2>Qué hacemos</h2>
          <ul>
            <li><NuxtLink to="/#actividades">Desarrollo y aprendizaje</NuxtLink></li>
            <li><NuxtLink to="/#proyectos">Proyectos y actividades</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h2>Comunidad</h2>
          <ul>
            <li><NuxtLink to="/#nosotros">Sobre nosotros</NuxtLink></li>
            <li><NuxtLink to="/#registro">Únete a nosotros</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h2>Conecta</h2>
          <a href="https://github.com/BeeDevelopers">GitHub de BeeDevelopers</a>
          <p>DICIS · Universidad de Guanajuato</p>
        </div>
      </div>
      <p class="footer-copyright">© {{ new Date().getFullYear() }} BeeDevelopers. Todos los derechos reservados.</p>
    </UContainer>
  </footer>
</template>
