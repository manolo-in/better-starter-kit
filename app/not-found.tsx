import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function() {
	return (
		<Container>
			<NotFound />
		</Container>
	);
}

export const NotFound = () => (
	<Card>
		<CardHeader>
			<CardTitle>404</CardTitle>
			<CardDescription>
				The page you are looking for does not exist.
			</CardDescription>
		</CardHeader>
		<CardFooter className="flex-wrap gap-2">
			<Button className="grow" asChild>
				<Link href={"/"}>Go to Homepage</Link>
			</Button>
			<Button className="grow" asChild variant={"secondary"}>
				<Link href={"/"}>Contact Support</Link>
			</Button>
		</CardFooter>
	</Card>
);
