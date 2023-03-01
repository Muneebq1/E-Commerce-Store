import admin from 'firebase-admin'

var serviceAccount = {
    "type": "service_account",
    "project_id": "hackaton-task-bd223",
    "private_key_id": "155d71b4242df68a965c20e9ad376565a1965b1b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7kXgSFTfeErsC\nYvx3w4v5bGiNlP/p1sJRcB4J9g+7ddRWBfyy0Bmbo1UeNlMUJteuIM6eC9P3LChs\njOzDYUj2Itg19zuLu5SZ5VBOdW7NS/t6R4NvNoWgswtZ2UEjl4KJBIihDNdZLxCc\nZDIE5nHaA0t+KpIu9JltkRllivBIJ5DfH+tLBKVe6IC4jTZODxCU1OD1oiN0MxML\nC0rpNtOwFQSa0kETEkHgdWXaSNESuBvj5ExTBQ/zXvCP7ZKSqnxhyiILqhUTCwks\nHIfa/NsNY09pi764tVpm5AIiz3Gv1NnEY7v3f/M+MiASbzbYZr+TJI44yQq3HfIM\neymHL8a7AgMBAAECggEACBdHUahep5KxRHIWp+fkgtbdT7Ysr96WtUKb2RwnI5P6\nm9dYRjJZ2G/cPRhkzwq55QX/Q6wI8bGS8NPHZsoshomMQA+xHt7xkw3kP+4q4Go1\np9mr3sFAVGVEyRRpDer8M4Lhjejq5Sr1kXl0+uch5CCeQgv+EE52y9YlfU7X/JS9\nRnoBCj5tkNKghOCvZiEFFGu/52TUJSuwx8GEQqgfc2Pvme+Ty2OtFxuTkiVnGxHM\ntLQLt52swXMpm31vIkLXoR8jMUNgLoBXwEM2Lzbw9gbhW3SkSjI688748uLCOi69\nocyQIqfcCxVkz2KBWeWIS2v5gsXpTZUCvFd9qGcxUQKBgQD57zxhVjfzXCtUWhaY\n1iw3hFXgNHMUrchYbuA6eO68ryhlVF9Jsl7cXrwilV+bCW6W59CjKkilY2FW0ZLi\nJPbPlBJmOwOmZEelrZLdBCBAIXHvsUjd8KZiV0hT5n13jmOP66Qq/npFyIRKOg9Q\nQ4eQqsIvbUS1XRZG76D0AwWRkwKBgQDAHsVtf9mpec1C3x+/WlPAZLpguvWv9rKi\nZC2ZKVeQqd2XOjU7Y0jE+L5c6+W/RoLcgZPwjCFaEfHp6qHPJ4YLhxsLYH27k0cI\nhZq96GsIZ+1x+0W1VF9HM+15XTfjC1mUalf6FnQAUq9iaD0PkRQ7OjjPvYh992MC\njqjybKJPOQKBgFMD64JJKPxkOOAjrC3HtZgbFIsL4M2Vi14UNdY2JNX3N+uwQpYv\n8OIxdTvncYIFd/4XsW0AtnB4ufQkWC1VKcV44UOjhmrWFBYruQRAQpYKhdWfhRxy\nulEfvJ5hiHsViGxdUIIXVHWpTId7EWsPgw/CKA2otZGoAaY+Ia/q8QaRAoGAPfKu\nHly3RpprwUBI8F6j2smf/0jJp++YMhyzR0u5XIApX3X5bCjbcgfy+etmrYKC968g\nkNPefTiEFLT/b9iCtHzgD48Re8ZFhU3vU4T53kAEpFgtZgbKoh7wV83jE2a5f826\niH1s8h23R7fs2HQjXeWsI/AtbtCyMETn3SOCQqECgYAqhz5oiyC8AFi2Ckhw270F\nscXXDqS28azspJN9aIhxJtgEdZezpWTZPXsslBeBW6j3OrpruFG9bvh9LVEvNqNu\nEss6PlZd1JLd/gz7gRJPRgjXwC+f/kb/8PbpudVqCYUYeFIDcSXge5cdp+QrZg5i\nK37Gm0h2VuVscCAgMG4EVg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-spcjp@hackaton-task-bd223.iam.gserviceaccount.com",
    "client_id": "107726472247192006448",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-spcjp%40hackaton-task-bd223.iam.gserviceaccount.com"
  }
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackaton-task-bd223.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://hackaton-task-bd223.appspot.com");

export default bucket;