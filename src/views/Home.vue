<template>
  <div>
    <section class="hero is-info is-small is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                    Audit Dash
                    </h1>
                    <h2 class="subtitle">
                    Le meilleur pour les établissements d'enseignement supérieur
                    </h2>
                </div>
            </div>
        </section>
        <div class="box cta">
            <p class="has-text-centered">
                <span class="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
        <section class="container is-fluid">
            <div class="columns features">
                <div class="column is-4">
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-university"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4>Tristique senectus et netus et. </h4>
                                <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-chart-line"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4>Tempor orci dapibus ultrices in.</h4>
                                <p>Ut venenatis tellus in metus vulputate. Amet consectetur adipiscing elit pellentesque. Sed arcu non odio euismod lacinia at quis risus. Faucibus turpis in eu mi bibendum neque egestas cmonsu songue. Phasellus vestibulum lorem
                                sed risus.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-4">
                    <div class="card is-shady">
                        <div class="card-image has-text-centered">
                            <i class="fa fa-tasks"></i>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <h4> Leo integer malesuada nunc vel risus. </h4>
                                <p>Imperdiet dui accumsan sit amet nulla facilisi morbi. Fusce ut placerat orci nulla pellentesque dignissim enim. Libero id faucibus nisl tincidunt eget nullam. Commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="intro column is-12 has-text-centered">
                <h2 class="title is-3">Le meilleur pour les établissements d'enseignement supérieur</h2>
                <p class="subtitle">Vel fringilla est ullamcorper eget nulla facilisi. Nulla facilisi nullam vehicula ipsum a. Neque egestas congue quisque egestas diam in arcu cursus.</p>
            </div>
        </section>
  </div>
</template>

<script>

export default {
  name: 'home',
  created () {
    this.$store.state.isFooterBarVisible = true
  }
}
</script>
