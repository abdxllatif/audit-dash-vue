<template>
    <div>
        <card-component title="Edit Profile" icon="account-circle">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>Audit Dashboard</strong> <small>@johnsmith</small> <small>31m</small>
                            <br>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                        </p>
                    </div>
                </div>
            </article>
        </card-component>
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
    export default {
        name: 'AboutComponent',
        components: {
            CardComponent
            }
        }
</script>
