const Groups = require('./groups');
const firebase = require('firebase');
const db = firebase.database();

const ref = firebase.database().ref('NewFaculty');

module.exports = (function() {
    function addFacultyMember(member) {
        return new Promise(function(resolve, reject) {
            let memberType = member.Type;
            delete member.Type;
            let editedMember = {
                DisplayableCredentials: member,
                InternalCredentials: { Type: memberType }
            }
            let memberID = ref.push(editedMember).key;
            if (memberType == "Miscelaneous") {
                Groups.insertMiscInto(memberID, member.Group)
                .then(resolve).catch(reject);
            } else {
                Groups.insertMemberInto(memberType, memberID)
                .then(resolve).catch(reject)
            }
        });
    }
    function removeFacultyMember(memberID) {
        return new Promise(function(resolve, reject) {
            ref.child(memberID).remove()
            .then(() => {
                Groups.removeMember(memberID);
            }).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    }
    function updateFacultyMember(memberID, newMember) {
        return new Promise(function(resolve, reject) {
            ref.child(memberID).once('value')
            .then(snapshot => {
                let member = snapshot.val();
                if (member) {
                    console.log(newMember);
                    ref.child(memberID).child('DisplayableCredentials').set(newMember);
                    resolve();
                } else {
                    reject("Member does not exist.");
                }
            });
        });
    }
    function getFacultyMember(memberID) {
        return new Promise(function(resolve, reject) {
            ref.child(memberID).once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    resolve({ key: snapshot.key, ...snapshot.val() });
                } else {
                    reject("Member does not exist.");
                }
            });
        });
    }
    return {
        create: (member) => addFacultyMember(member),
        read:   (memberID) => getFacultyMember(memberID),
        update: (memberID, newMember) => updateFacultyMember(memberID, newMember),
        delete: (memberID) => removeFacultyMember(memberID)
    }
})()