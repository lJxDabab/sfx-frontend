<template>
    <v-form class="fill-height d-flex align-center">
        <v-container>
            <v-col cols="12">

                <v-text-field v-model="selected" label="查询公司" type="text" variant="outlined" class="h.50">
                    <template v-slot:prepend>
                        <v-select label="搜索方式" v-model="selected" :items="['关键词', '股票代码']" variant="underlined"></v-select>
                    </template>

                    <template v-slot:append>
                        <v-btn prepend-icon="mdi-map-search" variant="text" v-on:click="search">
                            搜索
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>

        </v-container>
    </v-form>
</template>

<script setup>

// function clickMe() {
//     loading.value = true
//     message.value = 'Wait for it...'
//     setTimeout(() => {
//         loading.value = false
//         message.value = `You've clicked me!`
//     }, 2000)
// }
</script>

<script>
export default {
    props: {
        msg: String,
        way: String
    },

    data: () => ({
        loading: false,
    }),

    methods: {
        clickMe() {
            this.loading = true
            this.message = 'Wait for it...'
            setTimeout(() => {
                this.loading = false
                this.message = `You've clicked me!`
            }, 2000)
        },
        search() {
            this.$emit('search', this.way, this.msg);
        }
    }
}
</script>
