import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, Environment, OrbitControls, Float } from '@react-three/drei';
import { NeedleEngine } from './NeedleEngine';
import { Base, Depth, LayerMaterial, Noise } from 'lamina';
import * as THREE from 'three';

export default function App() {
	return (
		<Suspense fallback={<div>Loading MainContent...</div>}>
			<Canvas dpr={[1, 2]} camera={{ position: [0, 2, 7] }} shadows>
				<OrbitControls
					autoRotate
					autoRotateSpeed={0.3}
					minPolarAngle={Math.PI / 10}
					maxPolarAngle={Math.PI / 1.98}
				/>

				<Stage environment="city">
					<Striplight blur={0.8} position={[15, 4, 0]} scale={[1, 3, 10]} />
					<Striplight blur={0.8} position={[-15, 4, 0]} scale={[1, 3, 10]} />

					<Float position={[0, 4.2, 3]} speed={0.6} rotationIntensity={2} floatIntensity={2}>
						<group rotation={[0, -2, 0]}>
							<NeedleEngine src="/3dmeshes/compressed/car_retrod.glb" />
						</group>
					</Float>

					<Float position={[0, 4.2, -3]} speed={0.6} rotationIntensity={-2} floatIntensity={-2}>
						<group rotation={[0, -2, 0]}>
							<NeedleEngine src="/3dmeshes/compressed/car_truck.glb" />
						</group>
					</Float>

					{/* @ts-ignore */}
					<LayerMaterial side={THREE.BackSide}>
						{/* @ts-ignore */}
						<Base color="#468eb3" alpha={0.25} mode="normal" />
						{/* @ts-ignore */}
						<Depth
							colorA="#00ffff"
							colorB="#ff8f00"
							alpha={1.1}
							mode="normal"
							near={0}
							far={300}
							origin={[100, 100, 100]}
						/>
						{/* @ts-ignore */}
						<Noise mapping="local" type="cell" scale={0.3} mode="softlight" />
					</LayerMaterial>

					<Environment background preset="sunset" blur={0.65} />
				</Stage>
			</Canvas>
		</Suspense>
	);
}

function Striplight(props) {
	return (
		<mesh {...props} castShadow={false} receiveShadow={false} visible={false}>
			<boxGeometry />
			<meshBasicMaterial color="white" transparent={true} opacity={0} />
		</mesh>
	);
}
