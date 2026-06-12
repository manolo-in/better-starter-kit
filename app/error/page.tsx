"use client";

import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function() {
	const params = useSearchParams();
	const error = params.get("error");
	const errorDescription = params.get("error_description");

	return (
		<Container>
			<Card>
				<CardHeader>
					<CardTitle>Something went wrong</CardTitle>
					<CardDescription>
						We encountered an unexpected error. Please try again or return to
						the home page.
					</CardDescription>
				</CardHeader>
				{(error || errorDescription) && (
					<CardContent>
						<Alert variant="destructive">
							<AlertCircleIcon />
							<AlertTitle>Error Reason</AlertTitle>
							{error && (
								<AlertDescription>
									{error.replaceAll("_", " ")}
								</AlertDescription>
							)}
							{errorDescription && (
								<AlertDescription>
									{errorDescription.replaceAll("_", " ")}
								</AlertDescription>
							)}
						</Alert>
					</CardContent>
				)}
				<CardFooter className="flex-wrap gap-2">
					<Button className="grow" asChild>
						<Link href={"/"}>Go to Homepage</Link>
					</Button>
					<Button className="grow" asChild variant={"secondary"}>
						<Link href={`mailto:${""}`}>Contact Support</Link>
					</Button>
				</CardFooter>
			</Card>
		</Container>
	);
}
