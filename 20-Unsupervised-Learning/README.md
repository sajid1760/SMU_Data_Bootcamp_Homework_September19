# Unit 20 Homework: Predicting Myopia

This project is about using unsupervised learning to help predict whether patients have myopia. I used two algorithms, the KMeans and the
Agglomerative Clustering algoritms from Sci-kit learn to see if the sample patient data could be clustered. The PCA plot showed some nice
separation into two clusters, and the Dendogram also showed a two-cluster split. The PCA elbow plot showed that splitting at two clusters
would not be a bad decision, which is good for me because I really wanted the data to be split into two clusters, one of which was more likely
to be myopic than the other.

Both models did a terrible job predicting the incidence of myopia, which means that supervised learning would be a much better fit for problems
such as these, and that the population is not easily split into clusters of people who are more likely to be myopic.
---

© 2022 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
