import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";

@Component({
    selector: "first",
    styleUrls: ["examples/router/styles.css"],
    template: `
    <StackLayout>
        <Label text="First component" class="title"></Label>
    </StackLayout>`
})
class FirstComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log("FirstComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("FirstComponent - ngOnDestroy()");
    }
}

@Component({
    selector: "second",
    styleUrls: ["examples/router/styles.css"],
    template: `
    <StackLayout>
        <Label [text]="'Second component: ' + (id | async)" class="title"></Label>
    </StackLayout>`
})
class SecondComponent implements OnInit, OnDestroy {
    id;
    constructor(route: ActivatedRoute) {
        this.id = route.params.map(r => r["id"]);
    }

    ngOnInit() {
        console.log("SecondComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("SecondComponent - ngOnDestroy()");
    }
}

@Component({
    selector: "navigation-test",
    styleUrls: ["examples/router/styles.css"],
    template: `
        <StackLayout>
            <StackLayout class="nav">
                <Button text="First" nsRouterLinkActive="active" nsRouterLink="/first"></Button>
                <Button text="Second(1)" nsRouterLinkActive="active" nsRouterLink="/second/1"></Button>           
                <Button text="Second(2)"
                    nsRouterLinkActive="active"
                    [nsRouterLink]="['/second', '2' ]">
                </Button>
            </StackLayout>
            
            <router-outlet></router-outlet>
        </StackLayout>
    `
})
export class RouterOutletAppComponent {
    static routes = [
        { path: "", redirectTo: "/first", terminal: true, pathMatch: "full" },
        { path: "first", component: FirstComponent },
        { path: "second/:id", component: SecondComponent },
    ];

    static entries = [
        FirstComponent,
        SecondComponent,
    ];
}

