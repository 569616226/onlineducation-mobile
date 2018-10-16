import api from '@/utils/api'
export default {
    state : {
        GenreListsData: [],
        FillInfo: {
        	index: true,
        	success: false
        },
        GuestProfileData: [],
        MessageListData: [],
        MessageScroll: {
        	scroll: 0
        },
        CollectClass: {
        	activeName: 'first'
        },
        VipPay: {
        	BindMobile: false
        }
    },
    mutations :{
        GenreListsData (state, data) {
            state.GenreListsData = data
        },
        GuestProfileData (state, data) {
            state.GuestProfileData = data
        },
        MessageListData (state, data) {
            state.MessageListData = data
        },
        MessageListDatas (state, data) {
            state.MessageListData.data = [...state.MessageListData.data, ...data.data]
            state.MessageListData.links.next = data.links.next
        }
    },
    actions : {
        async getGenreLists({state, commit}) {
            const data = await api.getGenreLists()
            commit('GenreListsData', data)
        },
        async getGuestProfile({state, commit}) {
            const data = await api.getGuestProfile()
            commit('GuestProfileData', data)
        },
        async getMessageList({state, commit}) {
            const data = await api.getMessageList()
            commit('MessageListData', data)
        },
        async getMessageLists({state, commit}, url) {
            const data = await api.getMessageLists(url)
            commit('MessageListDatas', data)
        }
    }
}
