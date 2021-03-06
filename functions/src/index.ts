import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


export const updateStatistics = functions.region('europe-west1')
    .firestore.document('Matches/{matchID}').onCreate(snapshot => {
        const createdMatch: any = snapshot.data();
        return admin.firestore().runTransaction(async transaction => {
            try {

                const team1Query = admin.firestore().collection('Statistics')
                    .where('teamName', '==', createdMatch.team1);

                const team2Query = admin.firestore().collection('Statistics')
                    .where('teamName', '==', createdMatch.team2);

                const roundsMatchQuery = admin.firestore().collectionGroup('RoundMatches')
                    .where('team1', '==', createdMatch.team1)
                    .where('team2', '==', createdMatch.team2);

                const promises: Promise<any>[] = [
                    transaction.get(team1Query),
                    transaction.get(team2Query),
                    transaction.get(roundsMatchQuery)
                ];

                const docSnaps = await Promise.all(promises);
                const team1StatisticDoc = docSnaps[0].docs[0];
                const team2StatisticDoc = docSnaps[1].docs[0];
                const roundMatch = docSnaps[2].docs[0];

                const updateTeam1 = {
                    goalDifference:
                        team1StatisticDoc.data().goalDifference + createdMatch.team1Score - createdMatch.team2Score,
                    goals: team1StatisticDoc.data().goals + createdMatch.team1Score,
                    goalsAgainst: team1StatisticDoc.data().goalsAgainst + createdMatch.team2Score,
                    losses: createdMatch.team1Score !== 10 ?
                        team1StatisticDoc.data().losses + 1 : team1StatisticDoc.data().losses,
                    wins: createdMatch.team1Score === 10 ?
                        team1StatisticDoc.data().wins + 1 : team1StatisticDoc.data().wins
                };

                const updateTeam2 = {
                    goalDifference:
                        team2StatisticDoc.data().goalDifference + createdMatch.team2Score - createdMatch.team1Score,
                    goals: team2StatisticDoc.data().goals + createdMatch.team2Score,
                    goalsAgainst: team2StatisticDoc.data().goalsAgainst + createdMatch.team1Score,
                    losses: createdMatch.team2Score !== 10 ?
                        team2StatisticDoc.data().losses + 1 : team2StatisticDoc.data().losses,
                    wins: createdMatch.team2Score === 10 ?
                        team2StatisticDoc.data().wins + 1 : team2StatisticDoc.data().wins
                };

                const updateRoundMatch = {
                    team1Score: createdMatch.team1Score,
                    team2Score: createdMatch.team2Score,
                    played: true,
                    timestamp: createdMatch.timestamp
                };

                transaction.update(team1StatisticDoc.ref, updateTeam1);
                transaction.update(team2StatisticDoc.ref, updateTeam2);
                transaction.update(roundMatch.ref, updateRoundMatch);

            } catch (error) {
                return error;
            }
        });
    });
