<template>
  <div id="app">
    <nav-bar/>
    <aside-menu v-if="!this.$session.exists()" :menu="menu1"/>
    <aside-menu v-if="this.$session.exists()" :menu="menu2"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
export default {
  name: 'home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  /*  data () {
    return {
      menu1: [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Menu',
        [
          {
            to: '/tables',
            label: 'Tables',
            icon: 'table',
            updateMark: true
          },
          {
            to: '/forms',
            label: 'Inerstion',
            icon: 'square-edit-outline'
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                href: '#void',
                label: 'Sub-item One'
              },
              {
                href: '#void',
                label: 'Sub-item Two'
              }
            ]
          }
        ],
        'About',
        [
          {
            href: 'https://admin-null.justboil.me',
            label: 'Premium Demo',
            icon: 'credit-card'
          },
          {
            href: '/about',
            label: 'A propos',
            icon: 'help-circle'
          }
        ]
      ],
      menu2: [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Acceuil'
          },
          {
            to: '/login',
            icon: 'account-circle',
            label: "S'identifier"
          }
        ],
        'About',
        [
          {
            href: '/about',
            label: 'A propos',
            icon: 'help-circle'
          }
        ]
      ]
    }
  }, */
  computed: {
    menu1 () {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'home-analytics',
            label: 'Acceuil'
          },
          {
            to: '/login',
            icon: 'account-circle',
            label: "S'identifier"
          }
        ],
        'About',
        [
          {
            to: '/about',
            label: 'A propos',
            icon: 'help-circle'
          }
        ]
      ]
    },
    menu2 () {
      return [
        'General',
        [
          {
            to: '/dash',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Tables',
        [
          {
            label: 'Pédagogie',
            subLabel: 'Insertion des données',
            icon: 'view-list',
            menu: [
              {
                to: '/tables/departement',
                label: 'Départements'
              },
              {
                to: '/tables/formation',
                label: 'Formations'
              },
              {
                to: '/tables/partenaire',
                label: 'Partenaires'
              },
              {
                to: '/tables/clubs',
                label: 'Clubs scientifiques et culturels'
              },
              {
                to: '/tables/activites',
                label: 'Activités'
              }
            ]
          },
          {
            label: 'Personnel',
            subLabel: 'Insertion des données',
            icon: 'view-list',
            menu: [
              {
                to: '/tables/administratifs',
                label: 'Administratifs'
              },
              {
                to: '/tables/etudiants',
                label: 'Etudiants'
              },
              {
                to: '/tables/enseignants',
                label: 'Enseignants'
              },
              {
                to: '/tables/doctorants',
                label: 'Doctorants'
              }
            ]
          },
          {
            label: 'Logistiques',
            subLabel: 'Insertion des données',
            icon: 'view-list',
            menu: [
              {
                to: '/tables/salles',
                label: 'Salles'
              },
              {
                to: '/tables/outils',
                label: 'Outils'
              }
            ]
          }
        /*  {
            label: 'Insertion',
            subLabel: 'Insertion des données',
            icon: 'view-list',
            menu: [
              {
                to: '/insertion/departement',
                label: 'Departement'
              },
              {
                to: '/insertion/formation',
                label: 'Formation'
              },
              {
                to: '/insertion/partenaire',
                label: 'Partenaire'
              },
              {
                to: '/insertion/administratif',
                label: 'Administratif'
              },
              {
                to: '/insertion/etudiant',
                label: 'Etudiant'
              },
              {
                to: '/insertion/enseignant',
                label: 'Enseignant'
              },
              {
                to: '/insertion/',
                label: 'Etudiant'
              }
            ]
          },
          {
            label: 'Tables',
            subLabel: 'Tables des données',
            icon: 'table',
            menu: [
              {
                to: '/tables/departement',
                label: 'Départements'
              },
              {
                to: '/tables/formation',
                label: 'Formations'
              },
              {
                to: '/tables/partenaire',
                label: 'Partenaires'
              },
              {
                to: '/tables/administratif',
                label: 'Administratif'
              }
            ]
          } */
        ],
        'Statistiques',
        [
          {
            to: '/stats',
            icon: 'chart-bar',
            label: 'Générale'
          },
          {
            to: '/charts',
            icon: 'chart-bar',
            label: 'Graphes'
          },
          {
            to: '/audit',
            icon: 'finance',
            label: 'Audit Social'
          },
          {
            to: '/query',
            icon: 'chart-bar',
            label: "Création d'une requete"
          }
        ],
        'A propos',
        [
          {
            to: '/about',
            label: 'A propos',
            icon: 'help-circle'
          }
        ]
      ]
    }
  },
  created () {
    if (this.$session.exists()) {
      this.$store.state.isLog = true
      this.$store.commit('user', {
        name: this.$session.get('username'),
        email: this.$session.get('email'),
        avatar: 'https://avatars.dicebear.com/api/avataaars/man-adm.svg?top[]=shortHair&hairColor[]=black&clothes[]=blazerAndSweater&clothesColor[]=black&eyes[]=default&eyebrow[]=default&mouth[]=default'
      })
    } else {
      this.$store.state.isLog = false
      this.$store.commit('user', {
        name: 'Guest',
        email: 'guest@auditdash.com',
        avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
      })
    }
  }
}
</script>
