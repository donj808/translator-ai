import React, { useState } from 'react';
import './App.css'; // Make sure this is still imported

function App() {
	const [textToTranslate, setTextToTranslate] = useState('');
	const [targetLanguage, setTargetLanguage] = useState('');
	const [translation, setTranslation] = useState('');
	const [error, setError] = useState('');

	const handleTranslate = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		setTranslation('');
		setError('');

		if (!textToTranslate || !targetLanguage) {
			setError('Please enter text to translate and the target language.');
			return;
		}

		try {
			const response = await fetch('/translate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text: textToTranslate, target: targetLanguage }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.error || 'Failed to get translation.');
				return;
			}

			const data = await response.json();
			setTranslation(data.translation);
		} catch (err) {
			setError('Failed to connect to the server.');
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4 text-gray-800">AI Language Translator</h1>
				<form onSubmit={handleTranslate} className="space-y-4">
					<div>
						<label htmlFor="text-to-translate" className="block text-sm font-medium text-gray-700">
							Text to Translate:
						</label><br />
						<textarea
							id="text-to-translate"
							value={textToTranslate}
							onChange={(e) => setTextToTranslate(e.target.value)}
							rows={4}
							cols={50}
							className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="target-language" className="block text-sm font-medium text-gray-700">
							Translate to:
						</label><br />
						<input
							type="text"
							id="target-language"
							value={targetLanguage}
							onChange={(e) => setTargetLanguage(e.target.value)}
							placeholder="e.g., Spanish, French, German"
							className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Translate
					</button>
				</form>

				{error && <div className="text-red-500 mt-4">{error}</div>}
				{translation && (
					<div className="mt-6">
						<h2 className="text-lg font-semibold text-gray-800">Translation:</h2>
						<p className="text-gray-900">{translation}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;