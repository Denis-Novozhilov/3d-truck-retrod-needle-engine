import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, Stage, Environment, OrbitControls, Float } from '@react-three/drei';
import { NeedleEngine } from './NeedleEngine';

export default function App() {
	return (
		<Suspense fallback={<div>Loading MainContent...</div>}>
			<Canvas dpr={[1, 2]} camera={{ position: [0, 0, -1], fov: 70 }} shadows>
				<OrbitControls
					autoRotate
					autoRotateSpeed={0.3}
					minPolarAngle={Math.PI / 10}
					maxPolarAngle={Math.PI / 1.94}
				/>

				<Stage environment="city">
					<Striplight blur={0.8} position={[15, 3.05, 0]} scale={[0.2, 3, 10]} />
					<Striplight blur={0.8} position={[-15, 3.05, 0]} scale={[0.2, 3, 10]} />

					<Float position={[0, 3.1, 3]} speed={0.6} rotationIntensity={2} floatIntensity={2}>
						<group rotation={[0, -2, 0]}>
							<NeedleEngine src="/3dmeshes/compressed/car_retrod.glb" />
						</group>
					</Float>

					<Float position={[0, 3.1, -3]} speed={0.6} rotationIntensity={-2} floatIntensity={-2}>
						<group rotation={[0, -2, 0]}>
							<NeedleEngine src="/3dmeshes/compressed/car_truck.glb" />
						</group>
					</Float>

					<pointLight position={[10, 10, 5]} />
					<pointLight position={[-10, -10, -5]} />

					<Environment background preset="sunset" blur={0.7} />
				</Stage>
			</Canvas>
		</Suspense>
	);
}

function Striplight(props) {
	return (
		<mesh {...props}>
			<boxGeometry />
			<meshBasicMaterial color="white" />
		</mesh>
	);
}
