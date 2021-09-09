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
                                <h4>Une plateforme qui s'adapte à toutes les universités </h4>
                                <p>AuditDash est une plateforme qui permet aux universités de travailler efficacement et d'exploiter toutes leurs données. La conception du système est flexible et prendra de nombreuses formes en fonction des besoins de l'université. La plate-forme peut également inclure une grande variété d'informations sans aucun problème ni développement ultérieur de la part de l'institution.</p>
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
                                <h4>Diverses statistiques et graphiques donnent une compréhension plus large de l'établissement</h4>
                                <p>Vous voulez jeter un œil aux performances de votre école ? ESIAudit est la plateforme qu'il vous faut ! Avec ses statistiques et ses graphiques, vous pourrez voir les performances de votre école. Non seulement il affiche les données, mais il contient également des conseils et des astuces utiles qui vous aideront à progresser dans vos études.</p>
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
                                <h4>Plateforme très utile pour obtenir un audit social pour une institution universitaire </h4>
                                <p>AuditDash est un service d'audit social pour les établissements universitaires. Prouver que votre établissement est sûr et sécurisé est essentiel pour attirer les étudiants et les professeurs. ESIAudit offre un avantage concurrentiel en offrant un délai d'exécution rapide, un contenu complet et une consultation gratuite avec le personnel des affaires étudiantes pour discuter des résultats.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="intro column is-12 has-text-centered">
                <h2 class="title is-3">Le meilleur pour les établissements d'enseignement supérieur</h2>
                <p class="subtitle">Vel fringilla est ullamcorper eget nulla facilisi. Nulla facilisi nullam vehicula ipsum a. Neque egestas congue quisque egestas diam in arcu cursus.</p>
            </div>-->
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
