export const setUser = ({commit},userInfo) => {
	commit('userStatus',userInfo)
}
export const setgTicket = ({commit},gTicket) => {
	commit('gTicketStatus',gTicket)
}

