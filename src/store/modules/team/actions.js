import Team from "@/api/Team";

export const getTeams = ({ commit }) => {
  Team.all()
    .then((response) => {
      commit("SET_TEAMS", response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
