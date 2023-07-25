import { db } from '@/lib/firebase'
import { User } from 'firebase/auth'
import {
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc
} from 'firebase/firestore'

export const createUser = async (user: User) => {
	const userDoc = doc(db, 'users', user?.uid)

	const userData = await getDoc(userDoc)

	if (!userData.exists()) {
		await setDoc(userDoc, {
			photoURL: user?.photoURL,
			uid: user?.uid,
			createdAt: serverTimestamp()
		})
	}
}

export const incrementGenerateCount = async () => {
	try {
		const countDoc = doc(db, 'generationCount', 'count')
		await updateDoc(countDoc, {
			count: increment(1)
		})
	} catch (error) {
		console.log('Error in incremeting generation count', error)
	}
}

export const getGenerationCount = async (): Promise<number> => {
	try {
		const countDoc = doc(db, 'generationCount', 'count')
		const snapshot = await getDoc(countDoc)

		if (!snapshot.exists()) {
			return 0
		}
		return snapshot.data()?.count
	} catch (error) {
		console.log('Error in getting generation count', error)
		return 0
	}
}

export const getUsersLists = async () => {
	try {
		const usersCol = query(
			collection(db, 'users'),
			orderBy('createdAt'),
			limit(7)
		)
		const snapshot = await getDocs(usersCol)

		if (snapshot.empty) {
			return []
		}
		return snapshot.docs.map((item) => item.data())
	} catch (error) {
		console.log('Error in getting User lists', error)
		return []
	}
}
