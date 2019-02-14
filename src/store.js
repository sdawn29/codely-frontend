import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    question: '',
  },

  getters: {
    USER : state => {
      return state.user;
    },

    QUESTION: state => {
      return state.question
    }
    
  },

  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload
    },
    SET_QUESTION: (state,payload) => {
      state.question = payload
    }
  },
  actions: {
    GET_USER: async (context) => {
      const uri = 'http://localhost:4000/api/users/me';
      let h = new Headers();
      h.append('Content-Type', 'application/json');
      h.append('x-auth-token', localStorage.getItem("token"));

      let req = new Request(uri, {
          method: 'GET',
          headers: h,
      });
      fetch(req)
          .then(res => res.json())
          .then(res => {
              if(res.status === 'success') {
                  context.commit('SET_USER',res.data);
                  localStorage.setItem("qid", res.data.solved[0])
              }
          });
    },

    GET_QUESTION: async(context) => {
      console.log("store question")
      const uri = 'http://localhost:4000/api/questions/'+localStorage.getItem("qid");
      let h = new Headers();
      h.append('Content-Type', 'application/json');
      h.append('x-auth-token', localStorage.getItem("token"));

      let req = new Request(uri, {
          method: 'GET',
          headers: h,
      });
      fetch(req)
          .then(res => res.json())
          .then(res => {
              if(res.status === 'success') {
                  // console.log(res);
                  context.commit('SET_QUESTION',res.data); 
              }
          })
    }
  }
})
